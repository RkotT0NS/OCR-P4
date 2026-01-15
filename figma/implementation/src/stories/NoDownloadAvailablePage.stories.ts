import type { Meta, StoryObj } from '@storybook/react-vite';
import NoDownloadAvailablePage from '../pages/no-download-available';

const meta = {
  title: 'Example/Page/NoDownloadAvailablePage',
  component: NoDownloadAvailablePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NoDownloadAvailablePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
