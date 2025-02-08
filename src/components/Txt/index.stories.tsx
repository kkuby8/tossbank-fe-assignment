import type { Meta, StoryObj } from "@storybook/react";
import { FontWeightValue, Txt } from ".";

const meta: Meta<typeof Txt> = {
  component: Txt,
};

export default meta;

export const Basic: StoryObj<typeof Txt> = {
  argTypes: {
    fontWeight: {
      control: "inline-radio",
      options: ["regular", "medium", "bold"] as FontWeightValue[],
    },
  },
  args: {
    size: "small",
  },
  render: (args) => <Txt {...args}>타이틀</Txt>,
};
