import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type UploadFilterState = "All" | "True" | "False";

export interface UploadFilterProps {
  className?: string;
  selected?: UploadFilterState;
  onSelect?: (state: UploadFilterState) => void;
}

export function UploadFilter({
  className,
  selected = "All",
  onSelect,
}: UploadFilterProps) {
  const isAll = selected === "All";
  const isTrue = selected === "True";
  const isFalse = selected === "False";

  const baseButtonClass =
    "content-stretch flex px-4 py-2 items-center justify-center relative shrink-0 cursor-pointer transition-colors duration-200";
  const selectedButtonClass = "bg-[#e77a6e] text-white";
  const unselectedButtonClass = "text-black hover:bg-[rgba(231,122,110,0.1)]";

  return (
    <div
      className={twMerge(
        "bg-[#ffc19129] border border-[rgba(215,99,11,0.2)] border-solid content-stretch flex items-center overflow-clip relative rounded-3xl w-fit",
        className,
      )}
    >
      {/* Tous / All */}
      <div
        className={clsx(
          baseButtonClass,
          isAll ? selectedButtonClass : unselectedButtonClass,
          isAll && "w-[33%]",
        )}
        onClick={() => onSelect?.("All")}
      >
        <p
          className={clsx(
            "font-[family-name:var(--font-sans)] font-normal leading-4 relative shrink-0 text-[16px]",
            isAll ? "text-white" : "text-black",
          )}
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Tous
        </p>
      </div>

      {/* Actifs / True */}
      <div
        className={clsx(
          baseButtonClass,
          isTrue ? selectedButtonClass : unselectedButtonClass,
          isAll && "w-[33%]",
        )}
        onClick={() => onSelect?.("True")}
      >
        <p
          className={clsx(
            "font-[family-name:var(--font-sans)] font-normal leading-4 relative shrink-0 text-[16px]",
            isTrue ? "text-white" : "text-black",
          )}
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Actifs
        </p>
      </div>

      {/* Expiré / False */}
      <div
        className={clsx(
          baseButtonClass,
          isFalse ? selectedButtonClass : unselectedButtonClass,
          isAll && "w-[34%]",
        )}
        onClick={() => onSelect?.("False")}
      >
        <p
          className={clsx(
            "font-[family-name:var(--font-sans)] font-normal leading-4 relative shrink-0 text-[16px]",
            isFalse ? "text-white" : "text-black",
          )}
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Expiré
        </p>
      </div>
    </div>
  );
}
