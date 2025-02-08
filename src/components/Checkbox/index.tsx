import { forwardRef, Ref } from "react";

import { ControlledCheckbox } from "./ControlledCheckbox";
import { CheckboxCommonProps } from "./types";
import { UncontrolledCheckbox } from "./UnControlledCheckbox";

export const CheckboxCircle = forwardRef(
  ({ checked, ...props }: CheckboxCommonProps, ref: Ref<HTMLInputElement>) => {
    if (checked === undefined) {
      return <UncontrolledCheckbox ref={ref} {...props} />;
    } else {
      return <ControlledCheckbox ref={ref} {...props} checked={checked} />;
    }
  },
);

CheckboxCircle.displayName = "CheckboxCircle";
