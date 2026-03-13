import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Uppy } from "@uppy/core";
import Tus from "@uppy/tus";
import useUploadHandler from "./useUploadHandler";

export default function usePageUpload(authToken: string | null): {
  uploadedFileUrl: string | null;
  progress: number;
  isPaused: boolean;
  isUploading: boolean;
  handleUpload: (
    file: File,
    options?:
      | {
          password?: string | undefined;
          expiresAt?: number | undefined;
        }
      | undefined,
  ) => void;
  onPause: () => void;
  onResume: () => void;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
} {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const pendingOptions = useRef<{
    password?: string;
    expiresAt?: number;
  } | null>(null);

  const [uppy] = useState(
    () =>
      new Uppy({
        autoProceed: false,
        restrictions: { maxNumberOfFiles: 1 },
      }),
  );

  useEffect(() => {
    if (!uppy.getPlugin("Tus")) {
      uppy.use(Tus, {
        id: "Tus",
        endpoint: "/api/upload",
        chunkSize: 5000 * 1024,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    const onProgress = (progress: number) => {
      setProgress(progress);
    };

    const onSuccess = (
      file: unknown,
      response: {
        body?: Record<string, never> | undefined;
        status: number;
        bytesUploaded?: number;
        uploadURL?: string;
      },
    ) => {
      const uploadUrl = response.uploadURL;
      const uuid = uploadUrl?.split("/").pop();

      if (
        pendingOptions.current &&
        (pendingOptions.current.password || pendingOptions.current.expiresAt)
      ) {
        const { password, expiresAt } = pendingOptions.current;
        const payload: { password?: string; expires_at?: string } = {};
        if (password && password.trim() !== "") {
          payload.password = password;
        }
        if (expiresAt) {
          const date = new Date();
          date.setDate(date.getDate() + expiresAt);
          payload.expires_at = date.toISOString();
        }

        if (Object.keys(payload).length > 0) {
          fetch(`/api/uploads/${uuid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify(payload),
          })
            .then((res) => {
              if (!res.ok) {
                console.error("Failed to patch upload metadata");
              }
              return res.json().then((jsonResponse) => {
                setUploadedFileUrl(jsonResponse.data.url);
              });
            })
            .catch((err) => {
              console.error("Error patching upload metadata:", err);
            });
        }
      }

      setProgress(100);
      setIsUploading(false);
      pendingOptions.current = null;
    };

    uppy.on("progress", onProgress);
    uppy.on("upload-success", onSuccess);

    return () => {
      uppy.off("progress", onProgress);
      uppy.off("upload-success", onSuccess);
    };
  }, [uppy, authToken]);

  const handleUpload = useUploadHandler({
    uppy,
    pendingOptions,
    setIsUploading,
    setIsPaused,
  });

  return {
    uploadedFileUrl,
    progress,
    isPaused,
    setIsPaused,
    isUploading,
    handleUpload,
    onPause: () => {
      uppy.pauseAll();
      setIsPaused(true);
    },
    onResume: () => {
      uppy.resumeAll();
      setIsPaused(false);
    },
  };
}
