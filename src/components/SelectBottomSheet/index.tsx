import { colors } from "constants/colors";

import { BottomSheet } from "components/BottomSheet";
import { Icon } from "components/Icon";
import { Txt } from "components/Txt";
import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from "react";

interface SelectBottomSheetProps<T> {
  title: string;
  children:
    | ReactElement<OptionProps<T>, typeof Option>[]
    | ReactElement<OptionProps<T>, typeof Option>;
  value?: T;
  onChange: (value: T) => void;
  className?: string;
}

type OptionProps<T> = {
  children: ReactNode;
  onSelect?: (value: T) => void;
  value: T;
  checked?: boolean;
};

type SelectContextType<T> = {
  value: T;
  handleChange: (value: T) => void;
} | null;

export function SelectBottomSheet<T>({
  className,
  title,
  children,
  value,
  onChange,
}: SelectBottomSheetProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(
    (value: T) => {
      onChange(value);
    },
    [onChange]
  );

  const handleSelect = (value: T) => {
    handleChange(value);
    setIsOpen(false);
  };

  const selectedValue = useMemo(() => {
    const selectedChild = Children.toArray(children).find(
      (child) => isValidElement(child) && child.props.value === value
    );
    return selectedChild != null && isValidElement(selectedChild)
      ? selectedChild.props.children
      : null;
  }, [children, value]);

  return (
    <>
      <button
        css={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "0 solid transparent",
          userSelect: "none",
          backgroundColor: "transparent",
          padding: 0,

          "&:focus": {
            outline: "none",
          },
        }}
        className={className}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Txt
          onClick={() => setIsOpen(!isOpen)}
          size="medium"
          color={colors.black}
          fontWeight="bold"
        >
          {selectedValue || title}
        </Txt>
        <Icon css={{ marginLeft: 4 }} name="icon-arrow-down-small" size={24} />
      </button>
      <BottomSheet open={isOpen} close={() => setIsOpen(false)} header={title}>
        <ul
          css={{
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Children.map(children, (child) => {
            if (isValidElement<OptionProps<T>>(child)) {
              return cloneElement(child, {
                ...child.props,
                value: child.props.value as T,
                onSelect: handleSelect,
                checked: child.props.value === value,
              });
            }
            return child;
          })}
        </ul>
      </BottomSheet>
    </>
  );
}

function Option<T>({ children, value, onSelect, checked }: OptionProps<T>) {
  return (
    <li
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
      }}
      onClick={() => onSelect?.(value)}
    >
      {children}
      {checked && <Icon name="icon-check" size={24} />}
    </li>
  );
}

SelectBottomSheet.Option = Option;
