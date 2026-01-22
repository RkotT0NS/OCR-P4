import { cn } from "../lib/utils";

export function Footer() {
  return (
    <footer className={cn("max-[900px]:hidden absolute bottom-0 left-0 right-0")}>
      <div className={cn("max-w-[1280px] mx-auto p-4 text-white")}>
        {/* <p>Copyright DataShare<span className="align-super">©</span> 2025</p> */}
        <p className={cn("text-shadow-black text-shadow-sm font-inter")}>
          Copyright DataShare<span className="align-super">©</span> 2025
        </p>
      </div>
    </footer>
  );
}
