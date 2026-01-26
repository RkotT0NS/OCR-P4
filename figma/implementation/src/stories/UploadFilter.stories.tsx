import type { Meta, StoryObj } from '@storybook/react-vite';
import {UploadFilter} from '../components/UploadFilter';

const meta = {
  title: 'Example/Component/UploadFilter',
  component: UploadFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'radio',
      options: ['All', 'True', 'False'],
    },
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof UploadFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    selected: 'All',
  },
};

export const Active: Story = {
  args: {
    selected: 'True',
  },
};

export const Expired: Story = {
  args: {
    selected: 'False',
  },
};
