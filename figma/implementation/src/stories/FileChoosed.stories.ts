import type { Meta, StoryObj } from '@storybook/react-vite';
import FileChoosed from '../pages/file-choosed';

const meta = {
  title: 'Example/Page/FileUpload',
  component: FileChoosed,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FileChoosed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileChoosedPage: Story = {};
