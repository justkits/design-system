import type { IconProps } from "@justkits/svg2tsx";

import { iconMap, type IconName } from "./iconMap";

type Props = IconProps & { icon: IconName };

export function AppIcon({ icon, size, ...rest }: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.warn(`Icon not found: ${icon}`);
    return null;
  }

  return <IconComponent size={size} {...rest} />;
}
