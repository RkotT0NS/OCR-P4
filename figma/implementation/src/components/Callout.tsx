import { cn } from "../lib/utils";

const imgInfo = "https://www.figma.com/api/mcp/asset/a4ba73b7-994c-4e62-a0ef-695416c6a09a";
const imgAlert = "https://www.figma.com/api/mcp/asset/dbe44f85-bbbb-4ee8-9908-6bbb5ba4ae4d";
const imgError = "https://www.figma.com/api/mcp/asset/557f3538-7ad8-4de4-8893-5dbd0425dc24";

type CalloutProps = {
  className?: string;
  label?: string;
  type?: "Info" | "Alert" | "Error";
};

export function Callout({ className, label = "Label", type = "Info" }: CalloutProps) {
  const isAlert = type === "Alert";
  const isError = type === "Error";
  const isInfo = type === "Info";

  return (
    <div
      className={cn(
        "border border-solid flex gap-[8px] items-center p-[8px] relative rounded-[8px] w-full max-w-[297px]",
        isInfo && "bg-[#e2ecff] border-[#b1c9f5]",
        isAlert && "bg-[#fff5ed] border-[#e6cbb5]",
        isError && "bg-[#ffe2e2] border-[#e8a6a6]",
        className
      )}
    >
      {isInfo && (
        <>
          <div className="relative shrink-0 w-[16px] h-[16px]">
            <div className="absolute inset-[8.33%]">
              <div className="absolute inset-[-6%]">
                <img className="block w-full h-full" alt="Info icon" src={imgInfo} />
              </div>
            </div>
          </div>
          <p className="flex-[1_0_0] font-main font-normal leading-[16px] text-[#2a3f72] text-[14px] whitespace-pre-wrap">
            {label}
          </p>
        </>
      )}
      {isAlert && (
        <>
          <div className="relative shrink-0 w-[16px] h-[16px]">
            <div className="absolute inset-[12.07%_6.47%_12.5%_6.47%]">
              <div className="absolute inset-[-6.63%_-5.74%]">
                <img className="block w-full h-full" alt="Alert icon" src={imgAlert} />
              </div>
            </div>
          </div>
          <p className="flex-[1_0_0] font-main font-normal leading-[16px] text-[#aa642b] text-[14px] whitespace-pre-wrap">
            {label}
          </p>
        </>
      )}
      {isError && (
        <>
          <div className="relative shrink-0 w-[16px] h-[16px]">
            <div className="absolute inset-[8.33%]">
              <div className="absolute inset-[-6%]">
                <img className="block w-full h-full" alt="Error icon" src={imgError} />
              </div>
            </div>
          </div>
          <p className="flex-[1_0_0] font-main font-normal leading-[16px] text-[#9c3333] text-[14px] whitespace-pre-wrap">
            {label}
          </p>
        </>
      )}
    </div>
  );
}
