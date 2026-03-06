import { Fragment } from "react";
import { cn } from "../lib/utils";
import { Icons } from "../contexts/Icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverTitle,
} from "./ui/popover";

function FileAction({ downloadLink }: { downloadLink: string }) {
  return (
    <Icons.Consumer>
      {({ deleteIcon, accessIcon }) => (
        <Fragment>
          <button
            className={cn(
              "flex items-center gap-2 p-2 border border-orange-300 rounded-md",
            )}
          >
            <img src={deleteIcon} alt="delete icon" className={cn("w-4 h-4")} />
            <span className={cn("flex-auto text-start")}>Supprimer</span>
          </button>
          <a
            href={downloadLink}
            target="_new"
            className={cn(
              "flex items-center gap-2 p-2 border border-orange-300 rounded-md",
            )}
          >
            <img src={accessIcon} alt="access icon" className={cn("w-4 h-4")} />
            <span className={cn("flex-auto text-start")}>Accéder</span>
          </a>
        </Fragment>
      )}
    </Icons.Consumer>
  );
}

export default function ActiveUploadActions({
  downloadLink,
  fileName,
}: {
  downloadLink: string;
  fileName: string;
}) {
  return (
    <Fragment>
      <div className={cn("md:hidden")}>
        <Popover>
          <PopoverTrigger>
            <Icons.Consumer>
              {({ UploadActionTrigger }) => <UploadActionTrigger />}
            </Icons.Consumer>
          </PopoverTrigger>
          <PopoverContent className={cn("bg-white")}>
            <PopoverTitle
              className={cn("w-full text-ellipsis overflow-hidden pb-2")}
            >
              <span
                className={cn(
                  "text-base text-ellipsis overflow-hidden whitespace-nowrap",
                )}
                title={fileName}
              >
                {fileName}
              </span>
            </PopoverTitle>
            <div className={cn("flex flex-col")}>
              <FileAction {...{ downloadLink }} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className={cn("hidden md:inline-flex md:gap-2")}>
        <FileAction {...{ downloadLink }} />
      </div>
    </Fragment>
  );
}
