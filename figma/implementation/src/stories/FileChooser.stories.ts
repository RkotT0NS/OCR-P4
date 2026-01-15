import type { Meta, StoryObj } from '@storybook/react-vite';
import FileChooser from '../pages/file-chooser';

const meta = {
  title: 'Example/Page',
  component: FileChooser,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FileChooser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileChooserPage: Story = {};
