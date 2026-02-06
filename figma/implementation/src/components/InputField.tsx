import React, { useId } from "react";
import { cn } from "../lib/utils";

export function InputField({
  label,
  placeholder,
  disabled = false,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-2 w-full", disabled && "opacity-50")}>
      <label htmlFor={id} className={cn("text-base text-gray-800 font-main")}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={cn(
          "bg-white border border-[#d9d9d9] rounded-lg p-3 w-full text-base text-gray-800 font-main placeholder:text-[#b3b3b3] focus:outline-none focus:border-[#ffa569] transition-colors",
        )}
      />
    </div>
  );
}
