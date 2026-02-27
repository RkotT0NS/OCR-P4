import { cn } from "../lib/utils";

type HeaderProps = {
  className?: string;
  login?: "Anonymous" | unknown;
  isAuthPage?: boolean;
};

export function Header({
  className = "",
  login = "Anonymous",
  isAuthPage = false,
}: HeaderProps) {
  return (
    <header className={cn("absolute top-0 left-0 right-0 z-10", className)}>
      <div
        className={cn(
          "flex gap-2.5 items-center justify-end max-w-7xl mx-auto p-4 relative shrink-0 w-full",
        )}
      >
        <p
          className={cn(
            "flex-[1_0_0] font-bold leading-10 relative text-[32px] text-black whitespace-pre-wrap",
          )}
        >
          DataShare
        </p>
        <div className={cn("flex flex-col items-start relative shrink-0")}>
          {!isAuthPage && (
            <button
              onClick={() => {
                if (login !== "Anonymous") {
                  window.location.href = "/dashboard";
                } else {
                  window.location.href = "/login";
                }
              }}
              className={cn(
                "bg-[#2c2c2c] flex gap-2 items-center justify-center overflow-clip p-3 relative rounded-2 shrink-0",
              )}
            >
              <span
                className={cn(
                  "font-normal leading-4 relative shrink-0 text-[#f3eeea] text-[16px]",
                )}
              >
                {login !== "Anonymous" ? "Mon espace" : "Se connecter"}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
