import { ChangeEvent } from "react";

export interface CheckboxCommonProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "ref" | "type"
  > {
  size?: number;
  timeout?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface UncontrolledCheckboxProps extends CheckboxCommonProps {
  checked?: never;
}

export interface ControlledCheckboxProps extends CheckboxCommonProps {
  checked: boolean;
}
