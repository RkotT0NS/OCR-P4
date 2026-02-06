import { type PropsWithChildren } from "react";

export default function AlertTriangleIcon({
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
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M8 6v2.667m0 2.666h.006M6.86 2.573 1.213 12a1.333 1.333 0 0 0 1.14 2h11.293a1.332 1.332 0 0 0 1.14-2L9.14 2.573a1.333 1.333 0 0 0-2.28 0"
      />
    </svg>
  );
}
