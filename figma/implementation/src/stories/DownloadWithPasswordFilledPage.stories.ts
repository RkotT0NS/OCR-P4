import type { Meta, StoryObj } from "@storybook/react-vite";
import DownloadWithPasswordFilledPage from "../pages/download-with-password-filled";

const meta = {
  title: "Pages/Download",
  component: DownloadWithPasswordFilledPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DownloadWithPasswordFilledPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DownloadWithPasswordFilled: Story = {};
