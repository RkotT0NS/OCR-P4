import { cn } from "../lib/utils";

export function Copyright({ classes = "" }: { classes?: string }) {
  return (
    <p className={cn("text-shadow-black text-shadow-sm font-inter", classes)}>
      Copyright DataShare<span className={cn("align-super")}>©</span> 2025
    </p>
  );
}