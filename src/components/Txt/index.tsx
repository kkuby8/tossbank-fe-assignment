import { HTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import { colors } from "constants/colors";
import { css } from "@emotion/react";

export type SizeValue = "small" | "medium" | "large";
export type FontWeightValue = "regular" | "medium" | "bold";

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  size?: SizeValue;
  fontWeight?: FontWeightValue;
  color?: string;
}

type TextProps = BaseProps & HTMLAttributes<HTMLSpanElement>;

export function Txt(props: TextProps) {
  const {
    className,
    children,
    size = "small",
    fontWeight = "regular",
    color = colors.grey900,
    ...rest
  } = props as TextProps;

  return (
    <span
      style={{ color }}
      className={classnames(
        "text",
        {
          [`typography-${size}`]: size,
          [`text--font-weight-${fontWeight}`]: fontWeight,
        },
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
