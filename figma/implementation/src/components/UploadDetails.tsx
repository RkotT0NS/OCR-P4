import { humanFileSize } from "../lib/size-format";
import { cn } from "../lib/utils";
import MimeTypeIcon from "./MimeTypeIcon";
import { Icons } from "../contexts/Icons";
import inputFileSelectionChange from "../lib/file-selection-handler";

function ChevronDown({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div
        className={cn("absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]")}
      >
        <Icons.Consumer>
          {({ SelectTrigger }) => (
            <SelectTrigger
              className={cn("w-full h-full")}
              title="Chevron Down Icon"
            />
          )}
        </Icons.Consumer>
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", disabled && "opacity-50")}>
      <p className={cn("text-base text-gray-800")}>{label}</p>
      <div
        className={cn(
          "bg-white border border-gray-300 rounded-lg flex items-center p-3 w-full",
        )}
      >
        <p className={cn("flex-1 text-base text-gray-400")}>{placeholder}</p>
      </div>
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
        <div
          className={cn(
            "flex flex-col gap-2 w-full",
            isUploading && "opacity-50",
          )}
        >
          <p className={cn("text-base text-gray-800")}>Expiration</p>
          <div
            className={cn(
              "bg-white border border-gray-300 rounded-lg flex items-center justify-between pl-4 pr-3 py-3 w-full",
            )}
          >
            <p className={cn("flex-1 text-base text-gray-800")}>Une journée</p>
            <ChevronDown className={cn("w-4 h-4 relative")} />
          </div>
        </div>
      </div>
      {isUploading ? (
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff812d] transition-all duration-300 ease-out"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[#794310] font-medium">
            <span className="text-sm">{Math.round(progress)}%</span>
            <button
              onClick={isPaused ? onResume : onPause}
              className="text-sm hover:underline focus:outline-none"
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
