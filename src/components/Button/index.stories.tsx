import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

export const Basic: StoryObj<typeof Button> = {
  args: {},
  render: (args) => <Button {...args}>확인</Button>,
};
