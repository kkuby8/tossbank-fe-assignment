import type { Meta, StoryObj } from "@storybook/react";

import { Input } from ".";
import { GlobalPortal } from "components/GlobalPortal";
import { css } from "@emotion/react";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

export const Basic: StoryObj<typeof Input> = {
  args: {
    label: "label",
    bottomText: "bottomText",
    hasError: false,
    disabled: false,
  },
  render: (args) => (
    <GlobalPortal.Provider>
      <div css={css({ width: "300px" })}>
        <Input {...args} placeholder="placeholder" />
      </div>
    </GlobalPortal.Provider>
  ),
};
