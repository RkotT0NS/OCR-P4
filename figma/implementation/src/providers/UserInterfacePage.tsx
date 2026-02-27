import type { Auth } from "@datashare/webapp/types";
import PageContext from "../contexts/Page";

// export const PageConsumer = PageContext.Consumer;
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
