import { type RefObject, useCallback, useLayoutEffect, useState } from "react";

import { FloatingPlacement } from "@/_placement";

const OFFSET = 16; // 요소와 화면 가장자리 사이의 최소 간격

export function useFloatingPosition(
  ref: RefObject<HTMLDivElement | null>,
  defaultPlacement: FloatingPlacement,
  isOpen: boolean = false,
) {
  const [placement, setPlacement] =
    useState<FloatingPlacement>(defaultPlacement);
  const [shiftX, setShiftX] = useState<number>(0);
  const [shiftY, setShiftY] = useState<number>(0);

  const updatePosition = useCallback(() => {
    if (!ref.current) return;

    const wrapperRect = ref.current?.getBoundingClientRect();
    const elementRect =
      ref.current?.querySelector("[data-floating]")?.getBoundingClientRect() ??
      null;

    if (!wrapperRect || !elementRect) return;

    const flipIfNeeded = () => {
      if (defaultPlacement === "top") {
        const spaceAbove = wrapperRect.top;
        const spaceNeeded = elementRect.height + OFFSET;
        setPlacement(spaceAbove < spaceNeeded ? "bottom" : "top");
      } else if (defaultPlacement === "bottom") {
        const spaceBelow = window.innerHeight - wrapperRect.bottom;
        const spaceNeeded = elementRect.height + OFFSET;
        setPlacement(spaceBelow < spaceNeeded ? "top" : "bottom");
      } else if (defaultPlacement === "left") {
        const spaceLeft = wrapperRect.left;
        const spaceNeeded = elementRect.width + OFFSET;
        setPlacement(spaceLeft < spaceNeeded ? "right" : "left");
      } else {
        const spaceRight = window.innerWidth - wrapperRect.right;
        const spaceNeeded = elementRect.width + OFFSET;
        setPlacement(spaceRight < spaceNeeded ? "left" : "right");
      }
    };

    const shiftIfNeeded = () => {
      if (defaultPlacement === "top" || defaultPlacement === "bottom") {
        const center = wrapperRect.left + wrapperRect.width / 2;
        const halfWidth = elementRect.width / 2;
        let newShiftX = 0;
        if (center - halfWidth < OFFSET) {
          newShiftX = OFFSET - (center - halfWidth);
        } else if (center + halfWidth > window.innerWidth - OFFSET) {
          newShiftX = window.innerWidth - OFFSET - (center + halfWidth);
        }
        setShiftX(newShiftX);
      } else {
        const tooltipTop =
          wrapperRect.top + (wrapperRect.height - elementRect.height) / 2;
        const tooltipBottom = tooltipTop + elementRect.height;
        let newShiftY = 0;
        if (tooltipTop < OFFSET) {
          newShiftY = OFFSET - tooltipTop;
        } else if (tooltipBottom > window.innerHeight - OFFSET) {
          newShiftY = window.innerHeight - OFFSET - tooltipBottom;
        }
        setShiftY(newShiftY);
      }
    };

    flipIfNeeded();
    shiftIfNeeded();
  }, [defaultPlacement, ref]);

  useLayoutEffect(() => {
    if (!isOpen || !ref.current) return;

    const element = ref.current;
    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [isOpen, updatePosition]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  return { placement, shiftX, shiftY, updatePosition };
}
