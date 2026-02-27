import type { SharedData } from "@datashare/webapp/types";
import { createContext } from "react";

export default createContext<SharedData>({
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
