import type { Meta, StoryObj } from '@storybook/react-vite';
import DownloadWithPasswordEmptyPage from '../pages/download-with-password-empty';

const meta = {
  title: 'Example/Page/Download',
  component: DownloadWithPasswordEmptyPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DownloadWithPasswordEmptyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DownloadWithPasswordEmpty: Story = {};
