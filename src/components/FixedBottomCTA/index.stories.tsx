import type { Meta, StoryObj } from "@storybook/react";

import { FixedBottomCTA } from ".";
import { GlobalPortal } from "components/GlobalPortal";
import { Button } from "components/Button";
import { colors } from "constants/colors";

const meta: Meta<typeof FixedBottomCTA> = {
  component: FixedBottomCTA,
};

export default meta;

export const TypeA: StoryObj<typeof FixedBottomCTA> = {
  args: {
    children: "확인",
    onClick: () => alert("클릭"),
    disabled: false,
    topAccessory: "입력할 수 없는 값이에요",
  },
  render: (args) => (
    <GlobalPortal.Provider>
      <FixedBottomCTA {...args} />
    </GlobalPortal.Provider>
  ),
};

export const TypeB: StoryObj<typeof FixedBottomCTA.TypeB> = {
  args: {
    leftButton: <Button theme="dark">취소하기</Button>,
    rightButton: <Button>추가하기</Button>,
  },
  render: (args) => (
    <GlobalPortal.Provider>
      <FixedBottomCTA.TypeB {...args} />
    </GlobalPortal.Provider>
  ),
};
