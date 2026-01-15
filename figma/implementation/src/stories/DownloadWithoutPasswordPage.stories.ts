import type { Meta, StoryObj } from '@storybook/react-vite';
import DownloadWithoutPasswordPage from '../pages/download-without-password';

const meta = {
  title: 'Example/Page',
  component: DownloadWithoutPasswordPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DownloadWithoutPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DownloadWithoutPassword: Story = {};
