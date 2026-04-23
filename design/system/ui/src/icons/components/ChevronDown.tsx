import type { IconProps } from "@justkits/svg2tsx";
export function ChevronDown({ size = 16, ...props }: Readonly<IconProps>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={size}
      height={size}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="m4 6 4 4 4-4"
      />
    </svg>
  );
}
