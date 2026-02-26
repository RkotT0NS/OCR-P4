import type { SharedData, Auth } from "@datashare/webapp/types";
import { createContext } from "react";

const PageContext = createContext<SharedData>({
  name: "",
  features: {},
  auth: {
    token: "",
    user: {
      id: 0,
      email_verified_at: null,
      created_at: "null",
      updated_at: "null",
      email: "",
      name: "",
      avatar: "",
      role: "",
      permissions: [],
    },
  },
  sidebarOpen: false,
});

export const PageConsumer = PageContext.Consumer;
export default function UserInterfacePage({
  auth,
  children,
}: Readonly<{
  auth: Auth;
  children: React.ReactNode;
}>) {
  return (
    <PageContext.Provider
      value={{ name: "User Interface", auth, sidebarOpen: false }}
    >
      {children}
    </PageContext.Provider>
  );
}
