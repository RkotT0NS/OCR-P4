import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { Upload } from "@datashare/types";
import MimeTypeIcon from "../components/MimeTypeIcon";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "../lib/utils";
import { humanFileSize } from "../lib/size-format";
import { Callout } from "../components/Callout";
import { Icons } from "../contexts/Icons";
import { useState } from "react";
import { InputField } from "../components/InputField";

function FileInfo({ fileDetails }: { fileDetails: Upload }) {
  return (
    <div className={cn("flex items-center w-full gap-4 p-2 overflow-hidden")}>
      <div className={cn("flex flex-0 items-center")}>
        <MimeTypeIcon
          mimeType={fileDetails.mime_type}
          classes={cn("w-6 h-6")}
        />
      </div>
      <div className={cn("flex-1  overflow-hidden")}>
        <p
          className={cn(
            "text-base text-ellipsis overflow-hidden whitespace-nowrap font-medium",
          )}
        >
          {fileDetails.original_name}
        </p>
        <p className={cn("text-sm text-black")}>
          {humanFileSize(fileDetails.size)}
        </p>
      </div>
    </div>
  );
}

export default function DownloadWithoutPasswordPage({
  fileDetails,
}: {
  fileDetails: Upload;
}) {
  console.log({ fileDetails });
  const [password, setPassword] = useState("");

  const handleDownload = async (e: React.MouseEvent) => {
    if (fileDetails.has_password && fileDetails.download_url) {
      e.preventDefault();
      try {
        const response = await fetch(fileDetails.download_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });

        if (!response.ok) {
          throw new Error("Download failed");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileDetails.original_name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error downloading file:", error);
        // Ideally show an error message to the user
      }
    }
  };

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
        <div
          className={cn(
            "bg-white flex flex-col gap-6 items-center max-w-xl w-full p-8 rounded-2xl shadow-lg",
          )}
        >
          <h2 className={cn("text-3xl font-bold text-black text-center")}>
            Télécharger un fichier
          </h2>
          <div className={cn("flex flex-col gap-4 w-full")}>
            <FileInfo {...{ fileDetails }} />
            <Callout
              className={cn("w-full")}
              type="Info"
              label={`Ce fichier expirera ${formatDistance(
                new Date(fileDetails.expires_at),
                new Date(),
                {
                  locale: fr,
                  addSuffix: true,
                },
              )}.`}
            />
            {fileDetails.has_password && (
              <InputField
                label="Mot de passe"
                placeholder="Saisissez le mot de passe..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>
          <a
            href={fileDetails.download_url || "#"}
            onClick={handleDownload}
            className={cn(
              "bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] p-3 rounded-lg w-full flex items-center justify-center gap-2 cursor-pointer",
            )}
          >
            <span className={cn("w-4 h-4")}>
              <Icons.Consumer>
                {({ DownloadCloudIcon }) => (
                  <DownloadCloudIcon
                    className={cn("w-full h-full stroke-[#ba681f]")}
                  >
                    <title>download icon</title>
                  </DownloadCloudIcon>
                )}
              </Icons.Consumer>
            </span>
            <span>Télécharger</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
