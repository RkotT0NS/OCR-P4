import { cn } from "../lib/utils";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { UploadDetails } from "../components/UploadDetails";
import { useState } from "react";

export default function FileChooser() {
  const [file, setFile] = useState<File>(
    new File([""], "quoicoubé.txt", { type: "text/plain" }),
  );
  return (
    <div
      className={cn("relative w-full h-screen")}
      style={{
        backgroundImage:
          "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)",
      }}
    >
      <Header />
      <main
        className={cn(
          "w-full h-full flex flex-col items-center justify-center",
        )}
      >
        <UploadDetails {...{ file, setFile }} />
      </main>
      <Footer />
    </div>
  );
}
