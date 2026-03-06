import { createContext, type JSX, type FC, type SVGProps } from "react";

// SVG Icon
import UnknownFileTypeIcon from "../icons/file-unknow-line.svg";
import MusicFileTypeIcon from "../icons/file-music-line.svg";
import VideoFileTypeIcon from "../icons/file-video-line.svg";
import ImageFileTypeIcon from "../icons/file-image-line.svg";
import SelectTrigger from "../icons/select-trigger.svg";
import PdfFileTypeIcon from "../icons/file-pdf-2-line.svg";
import CalloutAlertIcon from "../icons/alert-line.svg";
import CalloutInfoIcon from "../icons/information-line.svg";
import MenuIcon from "../icons/menu.svg";
import CloseMenuIcon from "../icons/close-menu-panel.svg";
import CalloutStopIcon from "../icons/spam-2-line.svg";
import UploadActionTrigger from "../icons/upload-action-trigger.svg";

// TSX Icons
import DataShareLightLogo from "./Icons/DataShareLightIcon";
import UploadIcon from "./Icons/UploadIcon";
import DownloadCloudIcon from "./Icons/DownloadCloudIcon";
import AlertTriangleIcon from "./Icons/AlertTriangleIcon";
import AlertOctagonIcon from "./Icons/AlertOctagonIcon";
import InformationIcon from "./Icons/InformationIcon";
import CopyIcon from "./Icons/CopyIcon";

export const Icons = createContext<{
  logoutIcon: string;
  fileIcon: string;
  deleteIcon: string;
  accessIcon: string;
  audioIcon: string;
  videoIcon: string;
  lockIcon: string;
  DataShareLightLogo: ({
    classes,
    ...additionalSvgProps
  }: {
    classes?: string | undefined;
  }) => JSX.Element;
  UploadIcon: ({
    classes,
    ...additionalSvgProps
  }: {
    classes?: string | undefined;
  }) => JSX.Element;
  UnknownFileTypeIcon: FC<SVGProps<SVGSVGElement>>;
  MusicFileTypeIcon: FC<SVGProps<SVGSVGElement>>;
  VideoFileTypeIcon: FC<SVGProps<SVGSVGElement>>;
  ImageFileTypeIcon: FC<SVGProps<SVGSVGElement>>;
  SelectTrigger: FC<SVGProps<SVGSVGElement>>;
  PdfFileTypeIcon: FC<SVGProps<SVGSVGElement>>;
  CalloutAlertIcon: FC<SVGProps<SVGSVGElement>>;
  CalloutInfoIcon: FC<SVGProps<SVGSVGElement>>;
  CalloutStopIcon: FC<SVGProps<SVGSVGElement>>;
  UploadActionTrigger: FC<SVGProps<SVGSVGElement>>;
  MenuIcon: FC<SVGProps<SVGSVGElement>>;
  CloseMenuIcon: FC<SVGProps<SVGSVGElement>>;
  DownloadCloudIcon: typeof DownloadCloudIcon;
  AlertTriangleIcon: typeof AlertTriangleIcon;
  AlertOctagonIcon: typeof AlertOctagonIcon;
  InformationIcon: typeof InformationIcon;
  CopyIcon: typeof CopyIcon;
}>({
  logoutIcon: "/logoutIcon.png",
  fileIcon: "/fileIcon.png",
  deleteIcon: "/deleteIcon.png",
  accessIcon: "/accessIcon.png",
  audioIcon: "/audioIcon.png",
  videoIcon: "/videoIcon.png",
  lockIcon: "/lockIcon.png",
  DataShareLightLogo,
  UploadIcon,
  UnknownFileTypeIcon,
  MusicFileTypeIcon,
  VideoFileTypeIcon,
  ImageFileTypeIcon,
  SelectTrigger,
  PdfFileTypeIcon,
  CalloutAlertIcon,
  CalloutInfoIcon,
  CalloutStopIcon,
  UploadActionTrigger,
  MenuIcon,
  CloseMenuIcon,
  DownloadCloudIcon,
  AlertOctagonIcon,
  AlertTriangleIcon,
  InformationIcon,
  CopyIcon,
});
