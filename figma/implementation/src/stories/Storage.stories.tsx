import type { Meta, StoryObj } from "@storybook/react-vite";
import SampleSuspense, { type PaginatedDefinition } from "../pages/test-idb";

const meta = {
  title: "Example/Storage",
  component: SampleSuspense,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SampleSuspense>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleSuspensePage: Story = {
  args: {
    storeName: "definitions",
    requester: async () => {
      return (await (
        await fetch("/definitions.json")
      ).json()) as PaginatedDefinition;
    },
  },
};
