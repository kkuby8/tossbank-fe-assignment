import { PropsWithChildren, ReactNode } from "react";
import { css } from "@emotion/react";
import { GlobalPortal } from "components/GlobalPortal";
import { colors } from "constants/colors";

import { Txt } from "../Txt";

interface Props {
  className?: string;
  open: boolean;
  close: () => void;
  header: string;
  children: ReactNode;
}

export function BottomSheet({
  open,
  header,
  children,
  className,
  close,
}: PropsWithChildren<Props>) {
  if (!open) {
    return null;
  }

  return (
    <GlobalPortal.Consumer>
      <div
        onClick={close}
        css={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      />
      <div
        className={className}
        css={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          minHeight: "48px",
          maxHeight: "70%",
          borderRadius: "28px",
          boxShadow: `0 0 0 1px rgba(2, 32, 71, 0.05), 0 6px 20px 0 rgba(0, 29, 54, 0.31), 0 1px 3px 0 rgba(0, 27, 55, 0.1)`,
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.background,
          margin: "10px",
        }}
      >
        <div
          css={css`
            padding-top: 21px;
            margin-top: 4px;
            padding-left: 24px;
            padding-right: 16px;
          `}
        >
          {typeof header === "string" ? (
            <Txt size="large" color={colors.black} fontWeight="bold">
              {header}
            </Txt>
          ) : (
            header
          )}
        </div>
        <div
          css={{
            padding: "12px 24px 24px",
          }}
        >
          {children}
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}
