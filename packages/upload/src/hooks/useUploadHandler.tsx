import Uppy, { Meta } from "@uppy/core";
import { type Dispatch, type RefObject, type SetStateAction } from "react";

export default function useUploadHandler(uploadOptions: {
  uppy: Uppy<Meta, Record<string, never>>;
  pendingOptions: RefObject<{
    password?: string;
    expiresAt?: number;
  } | null>;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}) {
  return (file: File, options?: { password?: string; expiresAt?: number }) => {
    uploadOptions.uppy.cancelAll();
    uploadOptions.pendingOptions.current = options || null;
    try {
      uploadOptions.uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
      });
      uploadOptions.uppy.upload();
      uploadOptions.setIsUploading(true);
      uploadOptions.setIsPaused(false);
    } catch (err) {
      console.error("Error adding file to Uppy:", err);
    }
  };
}
