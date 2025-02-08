import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from ".";

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
};

export default meta;

export const Basic: StoryObj<typeof MultiSelect.Option> = {
  args: { checked: true },
  render: (args) => (
    <MultiSelect>
      <MultiSelect.Option checked={args.checked}>월</MultiSelect.Option>
      <MultiSelect.Option checked={args.checked}>화</MultiSelect.Option>
      <MultiSelect.Option checked={args.checked}>수</MultiSelect.Option>
      <MultiSelect.Option checked={args.checked}>목</MultiSelect.Option>
      <MultiSelect.Option checked={args.checked}>금</MultiSelect.Option>
      <MultiSelect.Option checked={args.checked}>토</MultiSelect.Option>
      <MultiSelect.Option checked={args.checked}>일</MultiSelect.Option>
    </MultiSelect>
  ),
};
