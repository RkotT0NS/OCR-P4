import { type PropsWithChildren } from "react";

export default function AlertOctagonIcon({
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
      <g clipPath="url(#alert-octagon_svg__a)">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M8 5.333V8m0 2.667h.006M5.24 1.333h5.52l3.906 3.907v5.52l-3.906 3.907H5.24L1.333 10.76V5.24z"
        />
      </g>
      <defs>
        <clipPath id="alert-octagon_svg__a">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
