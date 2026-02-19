import type { Meta, StoryObj } from "@storybook/react-vite";
import NoDownloadAvailablePage from "../pages/no-download-available";

const meta = {
  title: "Pages/Download",
  component: NoDownloadAvailablePage,
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NoDownloadAvailablePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDownloadAvailable: Story = {};
