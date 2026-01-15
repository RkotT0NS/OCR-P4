import type { Meta, StoryObj } from '@storybook/react-vite';
import UserSpace from '../pages/user-space';

const meta = {
  title: 'Example/Page',
  component: UserSpace,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UserSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserSpacePage: Story = {};
