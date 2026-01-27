import { cn } from "../lib/utils";
import { Copyright } from "./Copyright";

export function Footer() {
  return (
    <footer
      className={cn("max-[900px]:hidden absolute bottom-0 left-0 right-0")}
    >
      <div className={cn("max-w-[1280px] mx-auto p-4 text-white")}>
        <Copyright />
      </div>
    </footer>
  );
}
