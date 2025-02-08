import type { Meta, StoryObj } from "@storybook/react";

import { List } from ".";
import { CheckboxCircle } from "components/Checkbox";

const meta: Meta<typeof List> = {
  component: List,
};

export default meta;

export const Basic: StoryObj<typeof List.Row> = {
  args: {
    iconName: "icon-document-lines",
    topText: "새로운 할 일",
    bottomText: "청소하기",
    withArrow: true,
    onClick: () => alert("클릭"),
  },
  render: (args) => (
    <List>
      <List.Row {...args} />
    </List>
  ),
};

export const WithRight: StoryObj<typeof List.Row> = {
  args: {
    topText: "선택하기",
    right: <CheckboxCircle />,
  },
  render: (args) => (
    <List>
      <List.Row {...args} />
    </List>
  ),
};
