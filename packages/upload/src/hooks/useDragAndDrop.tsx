import { cn } from "@datashare/theme";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";

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
function showDragInteractionOn(domElement: RefObject<HTMLDivElement | null>) {
  return () => {
    if (domElement.current === null) return;
    const currentElement = domElement.current;

    inertClasses.forEach((className) => {
      currentElement.classList.add(cn(className));
    });
  };
}
function hideDragInteractionOn(domElement: RefObject<HTMLDivElement | null>) {
  return () => {
    if (domElement.current === null) return;
    const currentElement = domElement.current;

    inertClasses.forEach((className) => {
      currentElement.classList.remove(cn(className));
    });
  };
}
function handleDrop(updateFileStatus: Dispatch<SetStateAction<File | null>>) {
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
export default function useDragAndDrop() {
  const [file, setFile] = useState<File | null>(null);
  const pageRef = useRef(null);
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
  return {
    file,
    setFile,
    pageRef,
  };
}
