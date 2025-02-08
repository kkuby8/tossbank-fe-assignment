import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLImageElement> {
  name: string;
  size: number;
  className?: string;
}

export function Icon({ name, size, className, ...rest }: Props) {
  return (
    <img
      alt={name}
      src={`https://static.toss.im/icons/svg/${name}.svg`}
      width={size}
      height={size}
      className={className}
      {...rest}
    />
  );
}
