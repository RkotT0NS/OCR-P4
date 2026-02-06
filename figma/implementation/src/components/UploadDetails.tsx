import { humanFileSize } from "../lib/size-format";
import { cn } from "../lib/utils";
import MimeTypeIcon from "./MimeTypeIcon";
import { Icons } from "../contexts/Icons";
import inputFileSelectionChange from "../lib/file-selection-handler";

function ChevronDown({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <Icons.Consumer>
        {({ SelectTrigger }) => (
          <SelectTrigger
            className={cn("w-full h-full")}
            title="Chevron Down Icon"
          />
        )}
      </Icons.Consumer>
    </div>
  );
}

import React, { useId } from "react";

function InputField({
  label,
  placeholder,
  disabled = false,
  type = "text",
}: {
  label: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
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
        className={cn(
          "bg-white border border-[#d9d9d9] rounded-lg p-3 w-full text-base text-gray-800 font-main placeholder:text-[#b3b3b3] focus:outline-none focus:border-[#ffa569] transition-colors",
        )}
      />
    </div>
  );
}

import ReactSelect, {
  components,
  type DropdownIndicatorProps,
} from "react-select";

const expirationOptions = [
  { value: 1, label: "Une journée" },
  { value: 2, label: "2 jours" },
  { value: 3, label: "3 jours" },
  { value: 4, label: "4 jours" },
  { value: 5, label: "5 jours" },
  { value: 6, label: "6 jours" },
  { value: 7, label: "Une semaine" },
];

function ExpirationDays({
  onChange,
  isDisabled,
}: {
  onChange?: (value: number) => void;
  isDisabled?: boolean;
}) {
  const DropdownIndicator = (
    props: DropdownIndicatorProps<(typeof expirationOptions)[0]>,
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown className={cn("w-4 h-4 relative")} />
      </components.DropdownIndicator>
    );
  };

  return (
    <div
      className={cn("flex flex-col gap-2 w-full", isDisabled && "opacity-50")}
    >
      <p className={cn("text-base text-gray-800")}>Expiration</p>
      <ReactSelect
        options={expirationOptions}
        defaultValue={expirationOptions[0]}
        isDisabled={isDisabled}
        onChange={(option) => {
          if (option && onChange) {
            onChange(option.value);
          }
        }}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#d9d9d9",
            borderRadius: "8px",
            padding: "2px",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#d9d9d9",
            },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "8px",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#1e1e1e",
            fontSize: "16px",
            fontFamily: "Inter, sans-serif",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "8px",
            marginTop: "4px",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#f3f4f6" : "white",
            color: "#1e1e1e",
            "&:hover": {
              backgroundColor: "#f9fafb",
            },
          }),
        }}
        classNames={{
          control: () => cn("h-[54px]"),
        }}
        isSearchable={false}
      />
    </div>
  );
}

export function UploadDetails({
  file,
  setFile,
  uploader,
  progress = 0,
  isPaused = false,
  isUploading = false,
  onPause,
  onResume,
}: {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploader: (file: File) => void;
  progress?: number;
  isPaused?: boolean;
  isUploading?: boolean;
  onPause?: () => void;
  onResume?: () => void;
}) {
  return (
    <div
      className={cn(
        "bg-white flex flex-col gap-6 items-center max-w-lg w-full p-8 rounded-2xl shadow-lg",
      )}
    >
      <h2 className={cn("text-3xl font-bold text-black text-center")}>
        Ajouter un fichier
      </h2>
      <div className={cn("flex flex-1 items-center w-full gap-4")}>
        <div className={cn("flex flex-0 items-center")}>
          <div className={cn("w-6 h-6 relative")}>
            <MimeTypeIcon mimeType={file.type} classes="w-full h-full" />
          </div>
        </div>
        <div
          className={cn(
            "flex flex-1 flex-col justify-center text-black overflow-hidden",
          )}
        >
          <p
            className={cn(
              "text-base text-ellipsis overflow-hidden whitespace-nowrap",
            )}
          >
            {file.name}
          </p>
          <p className={cn("text-sm")}>{humanFileSize(file.size, true)}</p>
        </div>
        <label
          htmlFor="fileInput"
          className={cn(
            "flex-initial border border-[#ffa569] text-[#794310] px-3 py-2 rounded-lg text-base cursor-pointer",
            isUploading && "opacity-50",
          )}
        >
          Changer
        </label>
        <input
          className={cn("hidden")}
          id="fileInput"
          type="file"
          disabled={isUploading}
          onChange={inputFileSelectionChange(setFile)}
        />
      </div>
      <div className={cn("flex flex-col gap-4 w-full")}>
        <InputField
          label="Mot de passe"
          placeholder="Optionnel"
          disabled={isUploading}
        />
        <ExpirationDays isDisabled={isUploading} />
      </div>
      {isUploading ? (
        <div className={cn("w-full flex flex-col gap-2")}>
          <div
            className={cn(
              "w-full h-2 bg-gray-100 rounded-full overflow-hidden",
            )}
          >
            <div
              className={cn(
                "h-full bg-[#ff812d] transition-all duration-300 ease-out",
              )}
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>
          <div
            className={cn(
              "flex items-center justify-between text-[#794310] font-medium",
            )}
          >
            <span className={cn("text-sm")}>{Math.round(progress)}%</span>
            <button
              onClick={isPaused ? onResume : onPause}
              className={cn("text-sm hover:underline focus:outline-none")}
            >
              {isPaused ? "Reprendre" : "Pause"}
            </button>
          </div>
        </div>
      ) : (
        <button
          className={cn(
            "bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#794310] px-4 py-3 rounded-lg flex items-center justify-center gap-2",
          )}
          onClick={() => {
            console.log("Uploader le fichier");
            uploader(file);
          }}
        >
          <div className={cn("w-4 h-4 relative")}>
            <Icons.Consumer>
              {({ UploadIcon }) => <UploadIcon />}
            </Icons.Consumer>
          </div>
          <p className={cn("text-base")}>Téléverser</p>
        </button>
      )}
    </div>
  );
}
