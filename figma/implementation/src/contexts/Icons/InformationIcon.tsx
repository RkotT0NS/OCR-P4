import { type PropsWithChildren } from "react";

export default function InformationIcon({
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
      <g clipPath="url(#information-line_svg__a)">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M8 10.667V8m0-2.667h.006M14.666 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.333 0"
        />
      </g>
      <defs>
        <clipPath id="information-line_svg__a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
