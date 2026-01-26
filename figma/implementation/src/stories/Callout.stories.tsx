import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from '../components/Callout';

const meta = {
  title: 'Example/Component/Callout',
  component: Callout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['Info', 'Alert', 'Error'],
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: 'Info',
    label: 'This is an information callout.',
  },
};

export const Alert: Story = {
  args: {
    type: 'Alert',
    label: 'This is an alert callout.',
  },
};

export const Error: Story = {
  args: {
    type: 'Error',
    label: 'This is an error callout.',
  },
};
