import { type InputHTMLAttributes } from "react";

import { AsChild } from "@/core/asChild";

export type TextInputProps = {
  asChild?: boolean;
  type?: "text" | "password" | "email" | "url" | "search";
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "aria-required" | "aria-disabled"
>;

export function TextInput({
  type = "text",
  asChild = false,
  children,
  required,
  disabled,
  id,
  ...rest
}: Readonly<TextInputProps>) {
  if (asChild) {
    return (
      <AsChild
        {...rest}
        id={id}
        type={type}
        aria-required={required}
        aria-disabled={disabled}
        required={required}
        disabled={disabled}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <input
      {...rest}
      id={id}
      type={type}
      aria-required={required}
      aria-disabled={disabled}
      required={required}
      disabled={disabled}
    />
  );
}
