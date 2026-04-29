import { style } from "@vanilla-extract/css";

const logo = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  color: "currentColor",
  whiteSpace: "nowrap",
});

export const styles = { logo };
