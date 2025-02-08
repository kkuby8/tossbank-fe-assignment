import { Txt } from "components/Txt";
import { colors } from "constants/colors";
import { Button } from "../Button";
import { GlobalPortal } from "../GlobalPortal";

interface Props {
  open: boolean;
  title: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onDimmedClick?: () => void;
}

export function ConfirmModal({
  open,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  onDimmedClick,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <GlobalPortal.Consumer>
      <div
        onClick={onDimmedClick}
        css={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
          zIndex: 1000,
        }}
      />
      <div
        css={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "320px",
          margin: "auto",
          pointerEvents: "initial",
          zIndex: 9999,
        }}
      >
        <div
          css={{
            borderRadius: "16px",
            padding: "22px 16px 16px 22px",
            maxHeight: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: colors.floatBackground,

            "&__description": {
              marginTop: "8px",
            },

            "&__buttons": {
              flex: "none",
              margin: "12px -8px 0 -6px",
              display: "flex",
              flexWrap: "wrap",

              "> button": {
                minWidth: "calc(50% - 8px)",
                margin: "8px 8px 0 0",
                flexGrow: 1,
              },
            },
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <Txt size="large" fontWeight="bold" color={colors.grey800}>
              {title}
            </Txt>
          </div>
          <div
            css={{
              flex: "none",
              margin: "12px -8px 0 -6px",
              display: "flex",
              flexWrap: "wrap",
              "> button": {
                minWidth: "calc(50% - 8px)",
                margin: "8px 8px 0 0",
                WebkitBoxFlex: 1,
                flexGrow: 1,
              },
            }}
          >
            <Button
              fullWidth={false}
              onClick={onCancel}
              css={{
                backgroundColor: colors.grey200,
                color: colors.grey700,

                "&:active": {
                  backgroundColor: colors.grey400,
                },
              }}
            >
              {cancelButtonText}
            </Button>
            <Button fullWidth={false} onClick={onConfirm}>
              {confirmButtonText}
            </Button>
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}
