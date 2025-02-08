import { ReactNode } from "react";
import { colors } from "constants/colors";

interface Props {
  id: string;
  checked: boolean;
  disabled?: boolean;
  size: number;
  children?: ReactNode;
}

export function CheckboxGraphic({
  checked,
  disabled,
  id,
  size,
  children,
}: Props) {
  return (
    <label
      htmlFor={id}
      css={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        margin: 0,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        css={{
          flex: "0 0 auto",
          width: `${size}px`,
          height: `${size}px`,
          marginRight: children != null ? "8px" : 0,
        }}
        fill={colors.background}
      >
        <g fill={colors.background}>
          <OuterCircle
            fill={
              disabled
                ? colors.disabledBlue500
                : checked
                  ? colors.blue500
                  : colors.grey200
            }
          />
          <InnerCircle
            fill={
              disabled
                ? colors.disabledBlue500
                : checked
                  ? colors.blue500
                  : colors.background
            }
          />
        </g>
        <Check />
      </svg>
      {children}
    </label>
  );
}

export function OuterCircle(props: { fill: string }) {
  return (
    <path
      d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1L12,1z"
      {...props}
    />
  );
}

export function InnerCircle(props: { fill: string }) {
  return <path d="M12,3c5,0,9,4,9,9s-4,9-9,9s-9-4-9-9S7,3,12,3" {...props} />;
}

export function Check() {
  return (
    <>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M7.5,11.7 10.9,15.1 16.5,9.5"
        stroke="rgba(229, 232, 235, 1)"
      ></path>
    </>
  );
}
