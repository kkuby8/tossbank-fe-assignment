import { colors } from "constants/colors";
import {
  HTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

interface SelectProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<SelectHTMLAttributes<HTMLSelectElement>, "value" | "name" | "id"> {
  children: React.ReactNode;
}

export function MultiSelect(props: SelectProps) {
  return (
    <div
      id="multi-select"
      tabIndex={0}
      role="listbox"
      aria-expanded={true}
      aria-labelledby="selectLabel"
      {...props}
      css={{ display: "flex", flexWrap: "wrap", gap: 8, width: "100%" }}
    />
  );
}

MultiSelect.Option = Option;

interface OptionProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<OptionHTMLAttributes<HTMLOptionElement>, "value"> {
  checked?: boolean;
}

function Option(props: OptionProps) {
  return (
    <div
      role="option"
      aria-selected={props.checked}
      tabIndex={0}
      {...props}
      css={{
        display: "inline-flex",
        minWidth: "40px",
        minHeight: "40px",
        borderRadius: "12px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props.checked ? colors.grey800 : colors.grey200,
        color: props.checked ? colors.white : colors.grey900,
      }}
    />
  );
}
