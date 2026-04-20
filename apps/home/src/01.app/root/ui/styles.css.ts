import { style } from "@vanilla-extract/css";

const body = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const main = style({
  flex: 1,
});

export const styles = { body, main };
