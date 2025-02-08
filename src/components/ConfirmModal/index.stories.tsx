import type { Meta, StoryObj } from "@storybook/react";

import { ConfirmModal } from ".";
import { GlobalPortal } from "components/GlobalPortal";

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
};

export default meta;

export const Basic: StoryObj<typeof ConfirmModal> = {
  args: {
    title: "제출할까요?",
    confirmButtonText: "제출",
    cancelButtonText: "취소",
    onConfirm: () => alert("제출"),
    onCancel: () => alert("취소"),
    open: true,
  },
  render: (args) => (
    <GlobalPortal.Provider>
      <ConfirmModal {...args} />
    </GlobalPortal.Provider>
  ),
};
