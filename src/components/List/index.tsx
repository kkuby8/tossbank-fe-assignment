import { css } from "@emotion/react";
import { PropsWithChildren, ReactNode } from "react";
import { Txt } from "components/Txt";
import { colors } from "constants/colors";
import { Icon } from "components/Icon";

interface Props {
  className?: string;
}

export function List({ className, children }: PropsWithChildren<Props>) {
  return (
    <ul
      className={className}
      css={{
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </ul>
  );
}

interface ListRowProps {
  className?: string;
  iconName?: "icon-clock-mono" | "icon-plus-grey-fill" | "icon-document-lines";
  topText: string;
  bottomText?: string;
  right?: ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
}

export const Row = ({
  className,
  iconName,
  topText,
  bottomText,
  right,
  withArrow,
  onClick,
}: ListRowProps) => {
  return (
    <li
      onClick={onClick}
      className={className}
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
      }}
    >
      <div css={{ display: "flex", alignItems: "center" }}>
        {iconName != null ? (
          <Icon name={iconName} size={24} css={{ marginRight: 12 }} />
        ) : null}
        <div
          css={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Txt
            size="medium"
            color={colors.black}
            fontWeight={right != null && bottomText == null ? "medium" : "bold"}
          >
            {topText}
          </Txt>
          {bottomText != null ? (
            <Txt size="medium" color={colors.grey700}>
              {bottomText}
            </Txt>
          ) : null}
        </div>
      </div>
      <div css={{ display: "flex", alignItems: "center" }}>
        {right != null ? right : null}
        {withArrow ? (
          <Icon
            css={{ marginLeft: 12 }}
            name="icon-arrow-right-sidebar-mono"
            size={12}
          />
        ) : null}
      </div>
    </li>
  );
};

List.Row = Row;
