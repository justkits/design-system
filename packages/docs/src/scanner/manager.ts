import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";
import matter from "gray-matter";

import type { DocsBranch, DocsGroup, DocsLeaf, DocsNode } from "../types";
import type { ResolvedConfig } from "./config";

export class Scanner {
  // config
  protected readonly contentsDir: string;
  private readonly outputDir: string;
  protected readonly baseUrl: string;

  // manifest
  protected readonly manifest: Record<string, DocsNode[]>;

  constructor(config: ResolvedConfig) {
    const { contentsDir, outputDir, baseUrl } = this.validateConfig(config);

    this.contentsDir = contentsDir;
    this.outputDir = outputDir;
    this.baseUrl = baseUrl;
    this.manifest = {};
  }

  private validateConfig(config: ResolvedConfig) {
    const cwd = process.cwd();

    // contentsDir가 현재 작업 디렉토리의 하위에 있는지 확인
    const resolvedContentsDir = resolve(config.contentsDir);
    const relContentsDir = relative(cwd, resolvedContentsDir);
    if (!relContentsDir || relContentsDir.startsWith("..")) {
      throw new Error(
        `[Justkits Docs] Invalid contentsDir "${resolvedContentsDir}": ` +
          `contentsDir must be a subdirectory of the current working directory ("${cwd}").`,
      );
    }

    // outputDir가 현재 작업 디렉토리의 하위에 있는지 확인
    const resolvedOutputDir = resolve(config.outputDir);
    const relOutputDir = relative(cwd, resolvedOutputDir);
    if (!relOutputDir || relOutputDir.startsWith("..")) {
      throw new Error(
        `[Justkits Docs] Invalid outputDir "${resolvedOutputDir}": ` +
          `outputDir must be a subdirectory of the current working directory ("${cwd}").`,
      );
    }

    // contentsDir가 없으면 하나 만들어준다
    const contentsDir = join(cwd, relContentsDir);

    if (!existsSync(contentsDir)) {
      mkdirSync(contentsDir, { recursive: true });
    }

    return {
      contentsDir,
      outputDir: join(cwd, relOutputDir),
      baseUrl: config.baseUrl,
    };
  }

  public run() {
    // 최상위 폴더는 페이지 처리 (다중 사이드바 지원)
    const pages = readdirSync(this.contentsDir, {
      withFileTypes: true,
    }).filter((dirent) => dirent.isDirectory());

    for (const page of pages) {
      const pagePath = join(this.contentsDir, page.name);
      const route = join(this.baseUrl, page.name);

      this.manifest[page.name] = this.buildTree(pagePath, route);
    }

    this.saveManifestFile();

    console.log(
      `✅ [Justkits Docs] Manifest generated successfully at "${join(this.outputDir, "justkitsdocs-manifest.json")}"`,
    );
  }

  protected buildTree(dirPath: string, route: string) {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    const nodes: DocsNode[] = [];

    for (const entry of entries) {
      if (entry.name === "index.mdx") continue;

      if (!entry.name.endsWith(".mdx") && !entry.isDirectory()) {
        console.warn(
          `⚠️ [Justkits Docs] Skipping unsupported file "${entry.name}" in "${dirPath}". Only .mdx files and directories are allowed.`,
        );
        continue;
      }

      const fullPath = join(dirPath, entry.name);
      const { order, slug } = this.parseSlug(entry.name);

      if (entry.isDirectory()) {
        const indexPath = join(fullPath, "index.mdx");
        if (existsSync(indexPath)) {
          nodes.push(
            this.buildBranch(
              fullPath,
              route,
              slug,
              order,
              entry.name,
              indexPath,
            ),
          );
        } else {
          nodes.push(this.buildGroup(fullPath, route, slug, order, entry.name));
        }
      } else {
        nodes.push(this.buildLeaf(fullPath, route, slug, order));
      }
    }

    return nodes.sort((a, b) => a.order - b.order);
  }

  private buildBranch(
    fullPath: string,
    route: string,
    slug: string,
    order: number,
    name: string,
    indexPath: string,
  ): DocsBranch {
    const allChildren = this.buildTree(fullPath, `${route}/${slug}`);
    if (allChildren.length === 0) {
      console.warn(
        `⚠️ [Justkits Docs] Branch "${name}" only has index.mdx and no other children. Consider adding content or converting it to a leaf.`,
      );
    }
    const children = allChildren.filter((child): child is DocsLeaf => {
      if (child.type !== "leaf") {
        console.warn(
          `⚠️ [Justkits Docs] Branch "${name}" contains a non-leaf child "${child.label}". Only leaves are allowed inside branches. Skipping.`,
        );
        return false;
      }
      return true;
    });
    const { label, ...fields } = this.parseFrontmatter(indexPath);
    return {
      type: "branch",
      order,
      label: label || this.slugToLabel(slug),
      href: `${route}/${slug}`,
      children,
      fields,
    } as DocsBranch;
  }

  private buildGroup(
    fullPath: string,
    route: string,
    slug: string,
    order: number,
    name: string,
  ): DocsGroup {
    const allChildren = this.buildTree(fullPath, route);
    if (allChildren.length === 0) {
      console.warn(
        `⚠️ [Justkits Docs] Group "${name}" has no children. Consider adding content or converting it to a leaf.`,
      );
    }
    const children = allChildren.filter(
      (child): child is DocsBranch | DocsLeaf => {
        if (child.type === "group") {
          console.warn(
            `⚠️ [Justkits Docs] Group "${name}" contains a nested group "${child.label}". Nested groups are not allowed. Skipping.`,
          );
          return false;
        }
        return true;
      },
    );
    return {
      type: "group",
      order,
      label: this.slugToLabel(slug),
      children,
    } as DocsGroup;
  }

  private buildLeaf(
    fullPath: string,
    route: string,
    slug: string,
    order: number,
  ): DocsLeaf {
    const { label, ...fields } = this.parseFrontmatter(fullPath);
    return {
      type: "leaf",
      order,
      label: label || this.slugToLabel(slug),
      href: `${route}/${slug}`,
      fields,
    } as DocsLeaf;
  }

  private parseSlug(filePath: string) {
    // 파일/폴더 경로는 무조건 {order}-{slug} / {order}-{slug}.mdx 형태

    const name = basename(filePath, extname(filePath));
    const match = new RegExp(/^(\d+)-(.+)$/).exec(name);

    if (!match) {
      throw new Error(
        `[Justkits Docs] Invalid file/folder name "${name}": ` +
          `must be in the format "{order}-{slug}" (e.g. "01-introduction.mdx" or "02-getting-started").`,
      );
    }

    return {
      order: Number.parseInt(match[1], 10),
      slug: match[2],
    };
  }

  private parseFrontmatter(filePath: string) {
    const { data } = matter.read(filePath);
    return data;
  }

  private slugToLabel(str: string) {
    return str
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  protected saveManifestFile() {
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
    }

    writeFileSync(
      join(this.outputDir, "justkitsdocs-manifest.json"),
      JSON.stringify(this.manifest, null, 2),
      "utf-8",
    );
  }
}
