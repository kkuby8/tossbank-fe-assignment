import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { css } from "@emotion/react";
import { colors } from "constants/colors";

interface ForwardRefInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  bottomText?: string;
  hasError?: boolean;
  className?: string;
}

const ForwardRefInput: ForwardRefRenderFunction<
  HTMLInputElement,
  ForwardRefInputProps
> = ({ label, bottomText, hasError = false, ...props }, ref) => {
  return (
    <div css={css({ width: "100%" })}>
      {label && (
        <label css={css({ display: "block", marginBottom: "5px" })}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        css={{
          width: "100%",
          padding: "0 0 8px",
          color: colors.grey900,
          height: "42px",
          fontWeight: 500,
          fontSize: "24px",
          borderRadius: "1px",
          caretColor: colors.blue400,
          outline: "none",
          border: "0 none",
          borderBottom: `2px solid ${hasError ? colors.red : colors.grey300}`,

          ":focus": {
            borderBottomColor: hasError ? colors.red : colors.blue400,
          },

          ":disabled": {
            backgroundColor: "transparent",
            borderColor: colors.grey200,
            color: colors.grey200,
            "::placeholder": {
              color: colors.grey200,
            },
          },
        }}
        {...props}
      />
      {bottomText && (
        <div
          css={{
            marginTop: "5px",
            color: hasError ? colors.red : colors.grey900,
          }}
        >
          {bottomText}
        </div>
      )}
    </div>
  );
};

export const Input = forwardRef(ForwardRefInput);
