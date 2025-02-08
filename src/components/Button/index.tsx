import { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import { css } from "@emotion/react";
import { colors } from "constants/colors";
import { nanoid } from "nanoid";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "dark";
  fullWidth?: boolean;
}
export const Button = forwardRef(function Button(
  props: Props,
  forwardedRef: Ref<HTMLButtonElement>
) {
  const { fullWidth = false, children, ...rest } = props;
  const buttonId = nanoid();

  return (
    <button
      ref={forwardedRef}
      id={buttonId}
      css={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: fullWidth ? "100%" : "auto",
        height: "56px",
        border: "0 solid transparent",
        borderRadius: "16px",
        padding: "0 28px",
        backgroundColor:
          props.theme === "dark" ? colors.grey700 : colors.blue500,
        color: colors.white,
        fontSize: "17px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitFontSmoothing: "antialiased",
        transition: "color 0.1s ease-in-out, background-color 0.1s ease-in-out",
        "&:focus": {
          outline: "none",
        },
        "&:disabled": {
          opacity: 0.26,
          cursor: "not-allowed",
        },
        "&:active": {
          backgroundColor:
            props.theme === "dark" ? colors.whiteOpacity100 : colors.blue700,
        },
      }}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
});
