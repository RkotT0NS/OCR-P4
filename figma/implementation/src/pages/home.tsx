import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Icons } from "../contexts/Icons";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { UploadDetails } from "../components/UploadDetails";
import inputFileSelectionChange from "../lib/file-selection-handler";
function preventDefaultDragEvents(event: Event) {
  event.preventDefault();
  // event.stopPropagation();
}
const inertClasses = [
  "opacity-50",
  "grayscale",
  // "pointer-events-none",
  // "select-none",
];
function showDragInteractionOn(
  domElement: React.RefObject<HTMLDivElement | null>,
) {
  return () => {
    if (domElement.current === null) return;
    inertClasses.forEach((className) => {
      domElement.current.classList.add(cn(className));
    });
    // domElement.current.classList.add(cn("highlight"));
  };
}
function hideDragInteractionOn(
  domElement: React.RefObject<HTMLDivElement | null>,
) {
  return () => {
    if (domElement.current === null) return;

    inertClasses.forEach((className) => {
      domElement.current.classList.remove(cn(className));
    });
    // domElement.current.classList.remove(cn("highlight"));
  };
}
function handleDrop(
  updateFileStatus: React.Dispatch<React.SetStateAction<File | null>>,
) {
  console.log("handleDrop construction");
  return (event: DragEvent) => {
    const droppedFiles = event.dataTransfer?.files; // Access the files
    console.log(event);
    console.log(event.dataTransfer);
    if (droppedFiles?.length) {
      if (droppedFiles?.length > 1) {
        console.log("Only one file can be dropped at a time");
      }
      updateFileStatus(droppedFiles[0]);
    }
  };
}

export default function HomePage({ user }: { user: unknown }) {
  console.log({ user });
  const [file, setFile] = useState<File | null>(null);
  const pageRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    // we should use a ref here
    // const fileInput = document.getElementById("fileUpload");
    const showInteraction = showDragInteractionOn(pageRef);
    const hideInteraction = hideDragInteractionOn(pageRef);
    const updateFileStatus = handleDrop(setFile);
    // 1. Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      document.addEventListener(eventName, preventDefaultDragEvents, false);
    });

    // 2. Toggle a visual "active" state
    ["dragenter", "dragover"].forEach((eventName) => {
      document.addEventListener(eventName, showInteraction, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      document.addEventListener(eventName, hideInteraction, false);
    });

    // 3. Handle the drop
    document.addEventListener("drop", updateFileStatus);
    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        document.removeEventListener(
          eventName,
          preventDefaultDragEvents,
          false,
        );
      });
      ["dragenter", "dragover"].forEach((eventName) => {
        document.removeEventListener(eventName, showInteraction, false);
      });
      ["dragleave", "drop"].forEach((eventName) => {
        document.removeEventListener(eventName, hideInteraction, false);
      });
      document.removeEventListener("drop", updateFileStatus);
    };
  }, [setFile]);

  return (
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
          <>
            <label
              htmlFor="fileInput"
              className={cn("flex flex-col items-center gap-6 text-center")}
            >
              <p className={cn("text-3xl font-light text-black")}>
                Tu veux partager un fichier ?
              </p>
              <div className={cn("p-6 bg-black/15 rounded-full")}>
                <div className={cn("p-6 bg-[#100218] rounded-full")}>
                  <Icons.Consumer>
                    {({ DatashareLightLogo }) => (
                      <DatashareLightLogo
                        classes="w-12 h-12"
                        aria-hidden="true"
                      />
                    )}
                  </Icons.Consumer>
                </div>
              </div>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={inputFileSelectionChange(setFile)}
              id="fileInput"
              className={cn("hidden")}
            />
          </>
        ) : (
          <UploadDetails {...{ file, setFile }} />
        )}
      </main>
      <Footer />
    </div>
  );
}
