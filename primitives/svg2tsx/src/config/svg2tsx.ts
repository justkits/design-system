// svg2tsx 관련 설정 타입 정의
export type Svg2tsxConfig = {
  /**
   * index.ts 파일 생성 모드
   * @default "barrel"
   */
  mode?: "barrel" | "facade" | "both";

  /**
   * Facade 컴포넌트에 붙는 접미사
   * Flat 구조에서는 이 접미사가 컴포넌트 이름 전체가 된다.
   * @default "Icon"
   */
  facadeSuffix?: string;

  /**
   * Suffix to append to the component name
   * @default ""
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
  facadeSuffix: "Icon",
  suffix: "",
  srcDir: "assets",
  outDir: "src",
};
