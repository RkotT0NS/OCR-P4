import { createContext } from "react";

export const Icons = createContext<{
  logoutIcon: string;
  fileIcon: string;
  deleteIcon: string;
  accessIcon: string;
  audioIcon: string;
  videoIcon: string;
  lockIcon: string;
}>({
  logoutIcon: "/logoutIcon.png",
  fileIcon: "/fileIcon.png",
  deleteIcon: "/deleteIcon.png",
  accessIcon: "/accessIcon.png",
  audioIcon: "/audioIcon.png",
  videoIcon: "/videoIcon.png",
  lockIcon: "/lockIcon.png",
});
