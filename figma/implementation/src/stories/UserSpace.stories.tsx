import type { Meta, StoryObj } from "@storybook/react-vite";
import UserSpace from "../pages/user-space";
import { cn } from "../lib/utils";
import type { ReactNode, CSSProperties } from "react";

const meta = {
  title: "Pages",
  component: UserSpace,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UserSpace>;

export default meta;
type Story = StoryObj<typeof meta>;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
function SidebarProvider({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className: string;
}) {
  const style = {};
  return (
    <div
      data-slot="sidebar-wrapper"
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
function Sidebar({ children }: { children: ReactNode }) {
  return (
    <div className={cn("group peer text-sidebar-foreground hidden md:block")}>
      <div
        className={cn(
          "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
        )}
      ></div>
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
        )}
      >
        <div
          className={cn(
            "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
function AppShell({ children }: { children: ReactNode }) {
  return children;
}
function SidebarTrigger({ children }: { children: ReactNode }) {
  return children;
}
function Avatar({ children }: { children: ReactNode }) {
  return children;
}
function AvatarFallback({ children }: { children: ReactNode }) {
  return children;
}

export const UserSpacePage: Story = {
  args: {
    uploads: () =>
      Promise.resolve({
        data: [
          {
            locked: false,
            uuid: "abcd-abcdef1",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfksjhdkjfhskjhkdjhkfjshkj hdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 3600000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          {
            locked: false,
            uuid: "abcd-abcdef2",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfksjhdkjfhskjhkdjhkfjshkj hdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 3600000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          {
            locked: true,
            uuid: "abcd-abcdef3",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          ,
          {
            locked: true,
            uuid: "abcd-abcdef4",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          ,
          {
            locked: false,
            uuid: "abcd-abcdef5",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          ,
          {
            locked: true,
            uuid: "abcd-abcdef6",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          ,
          {
            locked: true,
            uuid: "abcd-abcdef7",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          ,
          {
            locked: true,
            uuid: "abcd-abcdef8",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          ,
          {
            locked: true,
            uuid: "abcd-abcdef9",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
          ,
          {
            locked: true,
            uuid: "abcd-abcdef10",
            original_name:
              "kjshdfkjhskjdhfksjhkdjhfks jhdkjfhskjhkdjhkfjshkjhdkfjhsdkjhkjfhskjhdkjfhjksd.pdf",
            mime_type: "application/pdf",
            size: 1024,
            expires_at: new Date(Date.now() + 14400000).toLocaleString(),
            deleted_at: null,
            created_at: new Date(Date.now() - 3600000).toLocaleString(),
            url: "about:blank",
          },
        ],
        meta: {
          current_page: 1,
          last_page: 2,
        },
      }),
    actions: {
      logout: () => ({ url: "#logout", method: "post" }),
      upload: () => ({ url: "#upload", method: "get" }),
    },

    user: { name: "Marie Claire", avatarUrl: "/profile/marie.png" },
    refresher: (...args) => {
      console.log(args);
    },
    SidebarProvider,
    Sidebar,
    AppShell,
    SidebarTrigger,
    Avatar,
    AvatarFallback,
  },
};
