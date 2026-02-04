import type { Meta, StoryObj } from "@storybook/react-vite";
import DownloadWithoutPasswordPage from "../pages/download-without-password";

const meta = {
  title: "Example/Page/Download",
  component: DownloadWithoutPasswordPage,
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DownloadWithoutPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DownloadWithoutPassword: Story = {
  args: {
    fileDetails: {
      id: "1234567890",
      original_name:
        "example_______________________________________________________________________________.pdf",
      download_url: "about:blank",
      expires_at: new Date(Date.now() + 3600000).toLocaleString(),
      size: 1024,
      type: "application/pdf",
    },
  },
};
