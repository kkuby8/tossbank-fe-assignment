import type { Meta, StoryObj } from "@storybook/react";

import { WheelTimePicker } from ".";

const meta: Meta<typeof WheelTimePicker> = {
  component: WheelTimePicker,
};

export default meta;

export const Basic: StoryObj<typeof WheelTimePicker> = {
  args: {
    initialValue: 10,
    onChange: (value) => console.log(value),
  },
  render: (args) => <WheelTimePicker {...args} />,
};
