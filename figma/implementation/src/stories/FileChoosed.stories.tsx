import type { Meta, StoryObj } from "@storybook/react-vite";
import FileChoosed from "../pages/file-choosed";
import UserInterfacePage from "../contexts/Page";

const meta: Meta<typeof FileChoosed> = {
  title: "Example/Page/FileUpload",
  component: FileChoosed,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => (
      <UserInterfacePage auth={{ user: { name: "Alice" } }}>
        <Story {...context.args} />
      </UserInterfacePage>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FileChoosedPage: Story = {
  args: {
    fileDetails: {
      name: "IMG_9210_123123131323123131313213231132132312312313131321323123123131313213231.jpg",
      size: 1024,
      type: "application/pdf",
    } as unknown as File,
    fileUrl: "https://example.com/file.pdf",
  },
};
