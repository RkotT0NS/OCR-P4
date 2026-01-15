import type { Meta, StoryObj } from '@storybook/react-vite';
import Home from '../pages/home';

const meta = {
  title: 'Example/Page',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {};
