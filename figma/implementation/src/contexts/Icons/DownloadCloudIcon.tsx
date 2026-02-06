import { type PropsWithChildren } from "react";

export default function DownloadCloudIcon({
  children,
  ...props
}: PropsWithChildren) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      {children}
      <g clipPath="url(#download-cloud_svg__a)">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M5.334 11.333 8 14m0 0 2.667-2.667M8 14V8m5.92 4.06A3.333 3.333 0 0 0 12 6h-.84A5.333 5.333 0 1 0 2 10.86"
        />
      </g>
      <defs>
        <clipPath id="download-cloud_svg__a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
