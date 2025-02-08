import { forwardRef, Ref, useState } from "react";

import { ControlledCheckbox } from "./ControlledCheckbox";
import { UncontrolledCheckboxProps } from "./types";

export const UncontrolledCheckbox = forwardRef(
  (
    { defaultChecked = false, onChange, ...props }: UncontrolledCheckboxProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    return (
      <ControlledCheckbox
        ref={ref}
        checked={isChecked}
        onChange={(event, checked) => {
          setIsChecked(checked);
          onChange?.(event, checked);
        }}
        {...props}
      />
    );
  },
);

UncontrolledCheckbox.displayName = "UncontrolledCheckbox";
