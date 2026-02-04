import type { Meta, StoryObj } from "@storybook/react-vite";
import UserSpace from "../pages/user-space";

const meta = {
  title: "Example/Page",
  component: UserSpace,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UserSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserSpacePage: Story = {
  args: {
    uploads: Promise.resolve([
      {
        uuid: "abcd-abcdef",
        original_name:
          "kjshdfkjhskjdhfksjhkdjhfksjhdkjfhskjhkdjhkfjshkj hdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
        mime_type: "application/pdf",
        size: 1024,
        expires_at: new Date(Date.now() + 3600000).toLocaleString(),
        deleted_at: null,
        created_at: new Date(Date.now() - 3600000).toLocaleString(),
        url: "about:blank",
      },
      {
        uuid: "abcd-abcdef",
        original_name:
          "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
        mime_type: "application/pdf",
        size: 1024,
        expires_at: new Date(Date.now() + 14400000).toLocaleString(),
        deleted_at: null,
        created_at: new Date(Date.now() - 3600000).toLocaleString(),
        url: "about:blank",
      },
    ]),
    actions: {
      logout: () => ({ url: "#logout", method: "post" }),
      upload: () => ({ url: "#upload", method: "get" }),
    },
  },
};
