import { style } from "@vanilla-extract/css";

const contents = style({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",

  transition: "all 0.3s ease-in-out",
});

const main = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  scrollbarGutter: "auto",
  scrollbarWidth: "thin",
});

export const styles = { contents, main };
