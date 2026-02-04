import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { Upload } from "@datashare/types";
import MimeTypeIcon from "../components/MimeTypeIcon";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "../lib/utils";
import { humanFileSize } from "../lib/size-format";
import { Callout } from "../components/Callout";
const alertIcon =
  "https://www.figma.com/api/mcp/asset/38a7ba09-95e2-4753-b5e3-b0b749adc97a";
const downloadIcon =
  "https://www.figma.com/api/mcp/asset/754b191c-9ff8-4765-a865-b3361e097f73";

function FileInfo({ fileDetails }: { fileDetails: Upload }) {
  return (
    <div className={cn("flex items-center w-full gap-4 p-2")}>
      <MimeTypeIcon mimeType={fileDetails.mime_type} classes="w-6 h-6" />
      <div className={cn("flex-1")}>
        <p
          className={cn(
            "text-base text-ellipsis overflow-hidden whitespace-nowrap font-medium text-ellipsis ",
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

export function LocalCallout({ label }: { label: string }) {
  return (
    <div
      className={cn(
        "bg-[#fff5ed] border border-[#e6cbb5] rounded-lg flex items-center gap-2 p-2 w-full",
      )}
    >
      <img src={alertIcon} alt="alert icon" className={cn("w-4 h-4")} />
      <p className={cn("text-[#aa642b] text-sm")}>{label}</p>
    </div>
  );
}

function DownloadWithoutPasswordPage({ fileDetails }: { fileDetails: Upload }) {
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
          </div>
          <a
            href={fileDetails.download_url}
            className={cn(
              "bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] p-3 rounded-lg w-full flex items-center justify-center gap-2",
            )}
          >
            <img
              src={downloadIcon}
              alt="download icon"
              className={cn("w-4 h-4")}
            />
            <span>Télécharger</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DownloadWithoutPasswordPage;
