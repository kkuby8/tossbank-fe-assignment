import { ComponentPropsWithoutRef, forwardRef, ReactNode, Ref } from "react";
import { Button } from "components/Button";
import { GlobalPortal } from "components/GlobalPortal";
import { colors } from "constants/colors";

const FixedBottomCTATypeA = forwardRef(function FixedBottomCTA(
  {
    disabled,
    topAccessory,
    fullWidth = true,
    ...props
  }: ComponentPropsWithoutRef<typeof Button> & {
    topAccessory?: ReactNode;
    disabled?: boolean;
  },
  forwardedRef: Ref<HTMLButtonElement>
) {
  return (
    <GlobalPortal.Consumer>
      <div
        css={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <div
          css={{
            background:
              "linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0))",
            height: "34px",
          }}
        ></div>
        <div
          css={{
            backgroundColor: colors.white,
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "6px",
            }}
          >
            {topAccessory ? topAccessory : null}
          </div>
          <div
            css={{
              padding: "0 20px 18px",
            }}
          >
            <Button
              {...props}
              ref={forwardedRef}
              disabled={disabled}
              fullWidth={fullWidth}
            />
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
});

function FixedBottomCTATypeB({
  leftButton,
  rightButton,
  topAccessory,
}: {
  leftButton: ReactNode;
  rightButton: ReactNode;
  topAccessory?: ReactNode;
}) {
  return (
    <GlobalPortal.Consumer>
      <div
        css={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <div
          css={{
            background:
              "linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0))",
            height: "34px",
          }}
        ></div>
        <div
          css={{
            backgroundColor: colors.white,
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "6px",
            }}
          >
            {topAccessory ? topAccessory : null}
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
              padding: "0 20px 18px",
              "& > *": {
                width: "auto",
                minWidth: "calc(50% - 10px)",
                alignSelf: "center",
              },
            }}
          >
            {leftButton}
            {rightButton}
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}

export const FixedBottomCTA =
  FixedBottomCTATypeA as typeof FixedBottomCTATypeA & {
    TypeB: typeof FixedBottomCTATypeB;
  };

FixedBottomCTA.TypeB = FixedBottomCTATypeB;
