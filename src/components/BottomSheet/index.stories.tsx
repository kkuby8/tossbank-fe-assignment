import type { Meta, StoryObj } from "@storybook/react";

import { BottomSheet } from ".";
import { GlobalPortal } from "components/GlobalPortal";
import { Txt } from "components/Txt";
import { Button } from "components/Button";

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
};

export default meta;

export const Basic: StoryObj<typeof BottomSheet> = {
  args: {
    open: true,
    header: "제목",
    children: (
      <>
        <Txt>내용</Txt>
        <Button fullWidth={true}>확인</Button>
      </>
    ),
  },
  render: (args) => (
    <GlobalPortal.Provider>
      <BottomSheet {...args}>{args.children}</BottomSheet>
    </GlobalPortal.Provider>
  ),
};
