import { createContext, type JSX, type FC, type SVGProps } from "react";
import { cn } from "../lib/utils";
import UnknownFileTypeIcon from "../icons/file-unknow-line.svg";
import MusicFileTypeIcon from "../icons/file-music-line.svg";
import VideoFileTypeIcon from "../icons/file-video-line.svg";
import ImageFileTypeIcon from "../icons/file-image-line.svg";
import SelectTrigger from "../icons/select-trigger.svg";
import PdfFileTypeIcon from "../icons/file-pdf-2-line.svg";
import CalloutAlertIcon from "../icons/alert-line.svg";
import CalloutInfoIcon from "../icons/information-line.svg";
import CalloutStopIcon from "../icons/spam-2-line.svg";

import DownloadCloudIcon from "./Icons/DownloadCloudIcon";
import AlertTriangleIcon from "./Icons/AlertTriangleIcon";
import AlertOctagonIcon from "./Icons/AlertOctagonIcon";
import InformationIcon from "./Icons/InformationIcon";
import CopyIcon from "./Icons/CopyIcon";
function UploadIcon({ classes, ...additionalSvgProps }: { classes?: string }) {
  return (
    <svg
      className={cn(classes || "w-full h-full")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...additionalSvgProps}
    >
      <g clipPath="url(#clip0_3096_220)">
        <path
          d="M10.6666 10.6666L7.99997 7.99995M7.99997 7.99995L5.33331 10.6666M7.99997 7.99995V13.9999M13.5933 12.2599C14.2435 11.9055 14.7572 11.3445 15.0532 10.6657C15.3492 9.98686 15.4108 9.22877 15.2281 8.51107C15.0454 7.79338 14.629 7.15696 14.0444 6.70225C13.4599 6.24754 12.7405 6.00044 12 5.99995H11.16C10.9582 5.21944 10.5821 4.49484 10.0599 3.88061C9.5378 3.26638 8.8832 2.77852 8.14537 2.45369C7.40754 2.12886 6.60567 1.97552 5.80005 2.0052C4.99443 2.03489 4.20602 2.24682 3.49409 2.62506C2.78216 3.0033 2.16525 3.53802 1.68972 4.189C1.2142 4.83999 0.892434 5.59031 0.748627 6.38354C0.60482 7.17678 0.64271 7.9923 0.859449 8.76879C1.07619 9.54527 1.46613 10.2625 1.99997 10.8666"
          stroke="#BA681F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3096_220">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DatashareLightLogo({
  classes,
  ...additionalSvgProps
}: {
  classes?: string;
}) {
  return (
    <svg
      className={cn(classes || "w-12 h-12")}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...additionalSvgProps}
    >
      <g clipPath="url(#clip0_10_269)">
        <path
          d="M32 32L24 24M24 24L16 32M24 24V42M40.78 36.78C42.7307 35.7165 44.2717 34.0338 45.1598 31.9972C46.0478 29.9607 46.2324 27.6865 45.6844 25.5334C45.1364 23.3803 43.887 21.471 42.1334 20.1069C40.3797 18.7428 38.2217 18.0015 36 18H33.48C32.8746 15.6585 31.7463 13.4847 30.1799 11.642C28.6135 9.7993 26.6497 8.3357 24.4362 7.36121C22.2227 6.38673 19.8171 5.92672 17.4002 6.01576C14.9834 6.10481 12.6181 6.7406 10.4824 7.87533C8.34659 9.01006 6.49583 10.6142 5.06926 12.5672C3.64268 14.5201 2.67739 16.7711 2.24597 19.1508C1.81455 21.5305 1.92822 23.9771 2.57844 26.3065C3.22865 28.636 4.3985 30.7877 6.00001 32.6"
          stroke="#FFEEEC"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_269">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const Icons = createContext<{
  logoutIcon: string;
  fileIcon: string;
  deleteIcon: string;
  accessIcon: string;
  audioIcon: string;
  videoIcon: string;
  lockIcon: string;
  DatashareLightLogo: ({
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
  DownloadCloudIcon: JSX.Element;
  AlertTriangleIcon: JSX.Element;
  AlertOctagonIcon: JSX.Element;
  InformationIcon: JSX.Element;
  CopyIcon: JSX.Element;
}>({
  logoutIcon: "/logoutIcon.png",
  fileIcon: "/fileIcon.png",
  deleteIcon: "/deleteIcon.png",
  accessIcon: "/accessIcon.png",
  audioIcon: "/audioIcon.png",
  videoIcon: "/videoIcon.png",
  lockIcon: "/lockIcon.png",
  DatashareLightLogo,
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
  DownloadCloudIcon,
  AlertOctagonIcon,
  AlertTriangleIcon,
  InformationIcon,
  CopyIcon,
});
