import type { SharedData, Auth } from "@datashare/webapp/types";
import { createContext } from "react";

const PageContext = createContext<SharedData>({
  name: "",
  auth: {
    token: "",
    user: {
      id: "",
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
}: {
  auth: Auth;
  children: React.ReactNode;
}) {
  return (
    <PageContext.Provider
      value={{ name: "User Interface", auth, sidebarOpen: false }}
    >
      {children}
    </PageContext.Provider>
  );
}
