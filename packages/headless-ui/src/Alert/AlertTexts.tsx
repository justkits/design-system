import { type HTMLAttributes, useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useAlert } from "./internals/contexts";

type AlertTitleProps = {
  asChild?: boolean;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "id">;

export function AlertTitle({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<AlertTitleProps>) {
  const { setTitleId } = useAlert();
  const titleId = useId();

  const isInsideContent = useContext(ContentContext);

  useLayoutEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [titleId, setTitleId]);

  if (!isInsideContent) {
    throw new Error("Alert.Title must be used within Alert.Content");
  }

  if (asChild) {
    return (
      <AsChild className={className} style={style} {...rest} id={titleId}>
        {children}
      </AsChild>
    );
  }

  return (
    <h2 className={className} style={style} {...rest} id={titleId}>
      {children}
    </h2>
  );
}

type AlertMessageProps = {
  asChild?: boolean;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "id">;

export function AlertMessage({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<AlertMessageProps>) {
  const { setDescriptionId } = useAlert();
  const descriptionId = useId();

  const isInsideContent = useContext(ContentContext);

  useLayoutEffect(() => {
    setDescriptionId(descriptionId);
    return () => setDescriptionId(undefined);
  }, [descriptionId, setDescriptionId]);

  if (!isInsideContent) {
    throw new Error("Alert.Message must be used within Alert.Content");
  }

  if (asChild) {
    return (
      <AsChild className={className} style={style} {...rest} id={descriptionId}>
        {children}
      </AsChild>
    );
  }

  return (
    <p className={className} style={style} {...rest} id={descriptionId}>
      {children}
    </p>
  );
}
