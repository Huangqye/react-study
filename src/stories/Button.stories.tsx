import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { within } from "@storybook/testing-library";
import { userEvent } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

export const Guang: Story = {
  args: {
    label: "光光光",
    size: "large",
    backgroundColor: "green",
  },
  render(args) {
    return (
      <div>
        <button>aaaa</button>
        <Button {...args} />
        <button>bbb</button>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole("button", {
      name: /光光光/i,
    });
    await userEvent.click(btn);
    // btn.textContent = "东";
    await expect(btn.textContent).toEqual("光光光");
    await expect(btn.style.backgroundColor).toEqual("green");
    // await expect(btn.style.backgroundColor).toEqual("blue");
  },
};

// export const Guang: Story = {
//   args: {
//     label: "光光光",
//     size: "large",
//     backgroundColor: "green",
//   },
//   render(args, meta) {
//     const list = meta.loaded.list;

//     return (
//       <div>
//         <div>{list.join(",")}</div>
//         <Button {...args} />
//       </div>
//     );
//   },
//   loaders: [
//     async () => {
//       await "假装 fetch";
//       return {
//         list: [111, 222, 333],
//       };
//     },
//   ],
// };
