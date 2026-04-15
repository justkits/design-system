// svg2tsx 관련 설정 타입 정의
export type Svg2tsxConfig = {
  /**
   * index.ts 파일 생성 모드
   * @default "barrel"
   */
  mode?: "barrel" | "facade" | "both";

  /**
   * Suffix to append to the component name
   * @default "Icon"
   */
  suffix?: string;

  /**
   * Custom source directory path (relative to cwd)
   * @default "assets"
   */
  srcDir?: string;

  /**
   * Custom output directory path (relative to cwd)
   * @default "src"
   */
  outDir?: string;
};

export const defaultConfig: Required<Svg2tsxConfig> = {
  // svg2tsx
  mode: "barrel",
  suffix: "Icon",
  srcDir: "assets",
  outDir: "src",
};

// store
let config: Required<Svg2tsxConfig>;

export function setConfig(userConfig: Svg2tsxConfig): void {
  config = { ...defaultConfig, ...userConfig };
}

export function getConfig(): Required<Svg2tsxConfig> {
  if (!config) {
    throw new Error(
      "Configuration has not been set. Please call setConfig() first.",
    );
  }
  return config;
}
