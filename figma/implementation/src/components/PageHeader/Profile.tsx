import { type ReactElement, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Icons } from "../../contexts/Icons";
type ProfileProps = {
  className?: string;
  name?: string;
  avatarUrl?: string;
  SidebarTrigger: ReactElement;
  Avatar: ReactElement;
  AvatarFallback: ReactElement;
  onMenuClick?: () => void;
};

function DesignAvatar({
  className,
  children,
  src,
}: {
  children: ReactNode;
  className?: string;
  src?: string;
}) {
  return (
    <div
      className={cn("overflow-clip relative shrink-0 size-[40px]", className)}
      data-node-id="15:435"
    >
      <div
        className={cn("overflow-clip relative rounded-full size-[40px]")}
        data-node-id="15:445"
      >
        <div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[40px] top-1/2",
          )}
          data-node-id="15:457"
        >
          {children ?? (
            <img
              alt=""
              className={cn(
                "absolute inset-0 max-w-none object-cover pointer-events-none size-full",
              )}
              src={src}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Profile({
  className,
  name,
  SidebarTrigger,
  avatarUrl,
  Avatar,
  AvatarFallback,
}: ProfileProps) {
  return (
    <div
      className={cn(
        "bg-[#ffeee3] content-stretch flex flex-col items-center relative w-full",
        className,
      )}
      data-node-id="27:358"
    >
      <div
        className={cn(
          "content-stretch flex gap-[10px] items-center justify-end max-w-[1280px] relative shrink-0 w-full",
        )}
        data-node-id="27:359"
      >
        <div
          className={cn(
            "content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative",
          )}
          data-node-id="27:537"
        >
          <SidebarTrigger>
            <Icons.Consumer>
              {({ MenuIcon }) => (
                <MenuIcon
                  className={cn(
                    "overflow-clip relative shrink-0 size-6 cursor-pointer",
                  )}
                />
              )}
            </Icons.Consumer>
          </SidebarTrigger>
        </div>
        <div
          className={cn(
            "content-stretch flex gap-[16px] items-center relative shrink-0",
          )}
          data-node-id="27:360"
        >
          <Avatar />
          {typeof avatarUrl === "string" ? (
            <DesignAvatar src={avatarUrl} alt={name} />
          ) : (
            <Avatar
              alt={name}
              className={cn(" dark:bg-neutral-700 dark:text-white")}
            >
              <AvatarFallback>
                {((splittedName) => {
                  if (!Array.isArray(splittedName)) {
                    return "NA";
                  }
                  if (splittedName.length > 1) {
                    return (
                      splittedName[0].slice(0, 1).toUpperCase() +
                      splittedName[1].slice(0, 1).toUpperCase()
                    );
                  } else {
                    return splittedName[0].slice(0, 2).toUpperCase();
                  }
                })((name ?? "NA").split(/\s+/))}
              </AvatarFallback>
            </Avatar>
          )}
          <p
            className={cn(
              "font-semibold leading-[24px] relative shrink-0 text-[16px] text-black",
            )}
            data-node-id="27:362"
            style={{
              fontFamily: "var(--main-font, 'DM Sans', sans-serif)",
              fontVariationSettings: "'opsz' 14",
              fontFeatureSettings: "'liga' 0",
            }}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
