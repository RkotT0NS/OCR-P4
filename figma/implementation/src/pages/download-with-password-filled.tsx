import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Icons } from "../contexts/Icons";
import { cn } from "../lib/utils";
import { Callout } from "../components/Callout";
import MimeTypeIcon from "../components/MimeTypeIcon";

function FileInfo() {
  return (
    <div className={cn("flex items-center w-full gap-4 p-2 overflow-hidden")}>
      <div className={cn("flex flex-0 items-center")}>
        <MimeTypeIcon mimeType="image/jpeg" classes={cn("w-6 h-6")} />
      </div>
      <div className={cn("flex-1 overflow-hidden")}>
        <p
          className={cn(
            "text-base text-ellipsis overflow-hidden whitespace-nowrap font-medium",
          )}
          title="IMG_9210_1231231313132132312313131321323131313213231231.jpg"
        >
          IMG_9210_1231231313132132312313131321323131313213231231.jpg
        </p>
        <p className={cn("text-sm text-black")}>2,6 Mo</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 w-full")}>
      <label className={cn("text-base text-gray-800")}>{label}</label>
      <input
        type={type}
        value={value}
        readOnly
        className={cn("bg-white border border-gray-300 rounded-lg p-3 w-full")}
      />
    </div>
  );
}

export default function DownloadWithPasswordFilledPage() {
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
            <FileInfo />
            <Callout type="Info" label="Ce fichier expirera dans 3 jours." />
            <InputField
              label="Mot de passe"
              value="***********"
              type="password"
            />
          </div>
          <button
            className={cn(
              "bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] p-3 rounded-lg w-full flex items-center justify-center gap-2",
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
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
