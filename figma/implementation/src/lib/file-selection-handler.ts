import { type SetStateAction, type ChangeEvent, type Dispatch } from "react";

export default function inputFileSelectionChange(
  setFile: Dispatch<SetStateAction<File | null>>,
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles?.length) {
      if (selectedFiles?.length > 1) {
        console.warn("Only one file can be dropped at a time");
      }
      setFile(selectedFiles[0]);
    }
  };
}
