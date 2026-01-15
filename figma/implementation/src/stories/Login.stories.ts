import type { Meta, StoryObj } from '@storybook/react-vite';
import Login from '../pages/login';

const meta = {
  title: 'Example/Page',
  component: Login,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginPage: Story = {};
