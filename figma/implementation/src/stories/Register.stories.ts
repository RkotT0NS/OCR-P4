import type { Meta, StoryObj } from "@storybook/react-vite";
import Register from "../pages/register";

const meta = {
  title: "Pages",
  component: Register,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Register>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegisterPage: Story = {};
