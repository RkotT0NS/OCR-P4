import type { Meta, StoryObj } from "@storybook/react";
import Profile from "../components/PageHeader/Profile";
import type { ReactNode } from "react";

const meta = {
  title: "Components/PageHeader/Profile",
  component: Profile,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;
function SidebarTrigger({ children }: { children: ReactNode }) {
  return children;
}
function Avatar({ children }: { children: ReactNode }) {
  return children;
}
function AvatarFallback({ children }: { children: ReactNode }) {
  return children;
}
export const Default: Story = {
  args: {
    name: "Claire Marie",
    avatarUrl: "/profile/marie.png",
    SidebarTrigger,
    Avatar,
    AvatarFallback,
  },
};

export const CustomName: Story = {
  args: {
    name: "John Doe",
    SidebarTrigger,
    Avatar,
    AvatarFallback,
  },
};
