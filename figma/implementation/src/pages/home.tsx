import {
  useRef,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useDragAndDrop } from "@datashare/upload";

import { cn } from "@datashare/theme";
import { Icons } from "../contexts/Icons";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { UploadDetails } from "../components/UploadDetails";
import inputFileSelectionChange from "../lib/file-selection-handler";
import UserInterfacePage from "../providers/UserInterfacePage";
import type { User } from "@datashare/webapp/types";
function UserAction({
  user,
  children,
  setFile,
}: {
  user: unknown;
  children: ReactNode;
  setFile: Dispatch<SetStateAction<File | null>>;
}) {
  const fileInputRef = useRef(null);

  return user === null ? (
    <a
      href="/login"
      className={cn("flex flex-col items-center gap-6 text-center")}
    >
      {children}
    </a>
  ) : (
    <>
      <label
        htmlFor="fileInput"
        className={cn("flex flex-col items-center gap-6 text-center")}
      >
        {children}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        onChange={inputFileSelectionChange(setFile)}
        id="fileInput"
        className={cn("hidden")}
      />
    </>
  );
}
export default function HomePage({
  user,
  uploader,
  progress,
  isPaused,
  isUploading,
  uploadedFileUrl,
  onPause,
  onResume,
  uploadSizeLimit,
}: {
  user: User;
  uploader: (
    file: File,
    options?: { password?: string; expiresAt?: number },
  ) => void;
  progress?: number;
  isPaused?: boolean;
  isUploading?: boolean;
  uploadedFileUrl: string | null;
  onPause?: () => void;
  onResume?: () => void;
  uploadSizeLimit?: number;
}) {
  const { file, pageRef, setFile } = useDragAndDrop();
  return (
    <UserInterfacePage auth={{ user, token: "unknown" }}>
      <div
        ref={pageRef}
        className={cn("relative w-full h-screen bg-amber-50")}
        style={{
          // below style allow accessibility testing since gradients with multiple colors are not handled
          // backgroundColor: "#DE6262",
          // backgroundColor: "#FFB88C",
          backgroundImage:
            "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)",
        }}
      >
        <Header login={user === null ? "Anonymous" : "User"} />
        <main
          className={cn(
            "w-full h-full flex flex-col items-center justify-center",
          )}
        >
          {file === null ? (
            <UserAction {...{ user, setFile }}>
              <p className={cn("text-3xl font-light text-black")}>
                Tu veux partager un fichier ?
              </p>
              <div className={cn("p-6 bg-black/15 rounded-full")}>
                <div className={cn("p-6 bg-[#100218] rounded-full")}>
                  <Icons.Consumer>
                    {({ DataShareLightLogo }) => (
                      <DataShareLightLogo
                        classes="w-12 h-12"
                        aria-hidden="true"
                      />
                    )}
                  </Icons.Consumer>
                </div>
              </div>
            </UserAction>
          ) : (
            <UploadDetails
              {...{
                file,
                setFile,
                uploader,
                progress,
                isPaused,
                isUploading,
                onPause,
                onResume,
                uploadedFileUrl: uploadedFileUrl ?? "",
                uploadSizeLimit,
              }}
            />
          )}
        </main>
        <Footer />
      </div>
    </UserInterfacePage>
  );
}
