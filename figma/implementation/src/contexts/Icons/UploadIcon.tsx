import { cn } from "../../lib/utils";

export default function UploadIcon({
  classes,
  ...additionalSvgProps
}: {
  classes?: string;
}) {
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
