import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { Upload } from "@datashare/types";
import MimeTypeIcon from "../components/MimeTypeIcon";
import { humanFileSize } from "../lib/size-format";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { Callout } from "../components/Callout";
const alertIcon =
  "https://www.figma.com/api/mcp/asset/38a7ba09-95e2-4753-b5e3-b0b749adc97a";
const downloadIcon =
  "https://www.figma.com/api/mcp/asset/754b191c-9ff8-4765-a865-b3361e097f73";

function FileInfo({ fileDetails }: { fileDetails: Upload }) {
  return (
    <div className="flex items-center w-full gap-4 p-2">
      <MimeTypeIcon mimeType={fileDetails.mime_type} classes="w-6 h-6" />
      <div className="flex-1">
        <p className="text-base text-ellipsis overflow-hidden whitespace-nowrap font-medium">
          {fileDetails.original_name}
        </p>
        <p className="text-sm text-black">{humanFileSize(fileDetails.size)}</p>
      </div>
    </div>
  );
}

export function LocalCallout({ label }: { label: string }) {
  return (
    <div className="bg-[#fff5ed] border border-[#e6cbb5] rounded-lg flex items-center gap-2 p-2 w-full">
      <img src={alertIcon} alt="alert icon" className="w-4 h-4" />
      <p className="text-[#aa642b] text-sm">{label}</p>
    </div>
  );
}

function DownloadWithoutPasswordPage({ fileDetails }: { fileDetails: Upload }) {
  return (
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage:
          "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)",
      }}
    >
      <Header />
      <main className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white flex flex-col gap-6 items-center max-w-xl w-full p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-black text-center">
            Télécharger un fichier
          </h2>
          <div className="flex flex-col gap-4 w-full">
            <FileInfo {...{ fileDetails }} />
            <Callout
              className="w-full"
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
            className="bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] p-3 rounded-lg w-full flex items-center justify-center gap-2"
          >
            <img src={downloadIcon} alt="download icon" className="w-4 h-4" />
            <span>Télécharger</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DownloadWithoutPasswordPage;
