import { Icons } from "../contexts/Icons";
import { cn } from "../lib/utils";

type CalloutProps = {
  className?: string;
  label?: string;
  type?: "Info" | "Alert" | "Error";
};

export function Callout({
  className,
  label = "Label",
  type = "Info",
}: CalloutProps) {
  const isAlert = type === "Alert";
  const isError = type === "Error";
  const isInfo = type === "Info";

  return (
    <Icons.Consumer>
      {({ AlertOctagonIcon, AlertTriangleIcon, InformationIcon }) => (
        <div
          className={cn(
            "border border-solid flex gap-[8px] items-center p-[8px] relative rounded-[8px] w-full",
            isInfo && "bg-[#e2ecff] border-[#b1c9f5]",
            isAlert && "bg-[#fff5ed] border-[#e6cbb5]",
            isError && "bg-[#ffe2e2] border-[#e8a6a6]",
            className,
          )}
        >
          {isInfo && (
            <>
              <div className={cn("relative shrink-0 w-[16px] h-[16px]")}>
                <div className={cn("absolute inset-[8.33%]")}>
                  <div className={cn("absolute inset-[-6%]")}>
                    <InformationIcon
                      className={cn("block w-full h-full text-[#2a3f72]")}
                    >
                      <title>information icon</title>
                    </InformationIcon>
                  </div>
                </div>
              </div>
              <p
                className={cn(
                  "flex-[1_0_0] font-main font-normal leading-[16px] text-[#2a3f72] text-[14px] whitespace-pre-wrap",
                )}
              >
                {label}
              </p>
            </>
          )}
          {isAlert && (
            <>
              <div className={cn("relative shrink-0 w-[16px] h-[16px]")}>
                <div
                  className={cn("absolute inset-[12.07%_6.47%_12.5%_6.47%]")}
                >
                  <div className={cn("absolute inset-[-6.63%_-5.74%]")}>
                    <AlertTriangleIcon
                      className={cn("block w-full h-full text-[#aa642b] ")}
                    >
                      <title>alert icon</title>
                    </AlertTriangleIcon>
                  </div>
                </div>
              </div>
              <p
                className={cn(
                  "flex-[1_0_0] font-main font-normal leading-[16px] text-[#aa642b] text-[14px] whitespace-pre-wrap",
                )}
              >
                {label}
              </p>
            </>
          )}
          {isError && (
            <>
              <div className={cn("relative shrink-0 w-[16px] h-[16px]")}>
                <div className={cn("absolute inset-[8.33%]")}>
                  <div className={cn("absolute inset-[-6%]")}>
                    <AlertOctagonIcon
                      className={cn("block w-full h-full text-[#9c3333] ")}
                    >
                      <title>alert icon</title>
                    </AlertOctagonIcon>
                  </div>
                </div>
              </div>
              <p
                className={cn(
                  "flex-[1_0_0] font-main font-normal leading-[16px] text-[#9c3333] text-[14px] whitespace-pre-wrap",
                )}
              >
                {label}
              </p>
            </>
          )}
        </div>
      )}
    </Icons.Consumer>
  );
}
