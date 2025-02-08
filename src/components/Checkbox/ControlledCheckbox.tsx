import { ChangeEvent, forwardRef, Ref, useCallback } from "react";
import { css } from "@emotion/react";
import { nanoid } from "nanoid";

import { CheckboxGraphic } from "./CheckboxGraphic";
import { ControlledCheckboxProps } from "./types";

export const ControlledCheckbox = forwardRef(
  (
    {
      size = 24,
      checked,
      onChange,
      children,
      disabled,
      style,
      className,
      ...props
    }: ControlledCheckboxProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const id = props.id ?? nanoid();

    const handleInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event, event.target.checked);
      },
      [onChange]
    );

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        css={{
          display: "inline-block",
          WebkitTapHighlightColor: "transparent",
          cursor: "pointer",
          userSelect: "none",
        }}
        role="checkbox"
        aria-checked={checked}
        onChange={handleInputChange}
      >
        <input
          aria-hidden="true"
          id={id}
          css={{
            position: "fixed",
            left: 0,
            top: 0,
            padding: 0,
            margin: "-1px",
            width: "1px",
            height: "1px",
            border: 0,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
            WebkitAppearance: "none",
          }}
          type="checkbox"
          {...props}
        />
        <CheckboxGraphic
          size={size}
          checked={checked}
          disabled={disabled}
          id={id}
        >
          {children}
        </CheckboxGraphic>
      </div>
    );
  }
);

ControlledCheckbox.displayName = "ControlledCheckbox";
