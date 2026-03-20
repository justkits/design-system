import { CSSProperties } from "react";

import { FloatingPlacement } from "@/_placement";
import { ZIndices } from "@/_zindex";

const wrapper: CSSProperties = {
  position: "relative",
};

function tooltip(
  placement: FloatingPlacement,
  shiftX: number,
  shiftY: number,
): CSSProperties {
  const commonStyles: CSSProperties = {
    position: "absolute",
    zIndex: ZIndices.tooltip,
    pointerEvents: "none",
  };

  if (placement === "top") {
    return {
      ...commonStyles,
      top: 0,
      left: "50%",
      transform: `translateX(calc(-50% + ${shiftX}px)) translateY(calc(-100% + ${shiftY}px))`,
    };
  } else if (placement === "bottom") {
    return {
      ...commonStyles,
      bottom: 0,
      left: "50%",
      transform: `translateX(calc(-50% + ${shiftX}px)) translateY(calc(100% + ${shiftY}px))`,
    };
  } else if (placement === "left") {
    return {
      ...commonStyles,
      left: 0,
      top: "50%",
      transform: `translateX(calc(-100% + ${shiftX}px)) translateY(calc(-50% + ${shiftY}px))`,
    };
  } else {
    return {
      ...commonStyles,
      right: 0,
      top: "50%",
      transform: `translateX(calc(100% + ${shiftX}px)) translateY(calc(-50% + ${shiftY}px))`,
    };
  }
}

function arrow(
  placement: FloatingPlacement,
  shiftX: number,
  shiftY: number,
): CSSProperties {
  const commonStyles: CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "inherit",
  };

  if (placement === "top") {
    return {
      ...commonStyles,
      bottom: 0,
      left: "50%",
      marginBottom: -4,
      clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
      transform: `translateX(calc(-50% - ${shiftX}px)) translateY(${shiftY}px) rotate(45deg)`,
    };
  } else if (placement === "bottom") {
    return {
      ...commonStyles,
      top: 0,
      left: "50%",
      marginTop: -4,
      clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
      transform: `translateX(calc(-50% - ${shiftX}px)) translateY(${shiftY}px) rotate(45deg)`,
    };
  } else if (placement === "left") {
    return {
      ...commonStyles,
      right: 0,
      top: "50%",
      marginRight: -8,
      clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
      transform: `translateX(${shiftX}px) translateY(calc(-50% - ${shiftY}px))`,
    };
  } else {
    return {
      ...commonStyles,
      left: 0,
      top: "50%",
      marginLeft: -8,
      clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
      transform: `translateX(${shiftX}px) translateY(calc(-50% - ${shiftY}px)) rotate(180deg)`,
    };
  }
}

export const styles = { wrapper, tooltip, arrow };
