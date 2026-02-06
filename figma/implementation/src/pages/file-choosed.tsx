import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { cn } from "../lib/utils";
import MimeTypeIcon from "../components/MimeTypeIcon";
import { Icons } from "../contexts/Icons";

export default function FileChoosed() {
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
            "bg-white flex flex-col gap-6 items-center max-w-lg w-full p-8 rounded-2xl shadow-lg",
          )}
        >
          <h2 className={cn("text-3xl font-bold text-black text-center")}>
            Ajouter un fichier
          </h2>

          <div
            className={cn(
              "flex items-center w-full bg-white p-2 overflow-hidden",
            )}
          >
            <div
              className={cn("flex flex-1 items-center gap-4 overflow-hidden")}
            >
              <div className={cn("flex flex-0 items-center")}>
                <MimeTypeIcon mimeType="image/jpeg" classes={cn("w-6 h-6")} />
              </div>
              <div
                className={cn(
                  "flex flex-1 flex-col justify-center text-black overflow-hidden",
                )}
              >
                <p
                  className={cn(
                    "text-base text-ellipsis overflow-hidden whitespace-nowrap",
                  )}
                  title="IMG_9210_123123131323123131313213231132132312312313131321323123123131313213231.jpg"
                >
                  IMG_9210_123123131323123131313213231132132312312313131321323123123131313213231.jpg
                </p>
                <p className={cn("text-sm")}>2,6 Mo</p>
              </div>
            </div>
          </div>

          <div className={cn("flex flex-col gap-4 items-start w-full")}>
            <p className={cn("text-base text-black")}>
              Félicitations, ton fichier sera conservé chez nous pendant une
              semaine !
            </p>
            <div
              className={cn(
                "bg-gray-200/50 flex items-center p-2 rounded-lg w-full",
              )}
            >
              <p className={cn("text-base text-[#d8640b] underline")}>
                https://datashare.fr/UhGyr
              </p>
            </div>
          </div>
          <button
            className={cn(
              "bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] px-4 py-3 rounded-lg flex items-center justify-center gap-2",
            )}
          >
            <span className={cn("w-4 h-4 relative")}>
              <Icons.Consumer>
                {({ CopyIcon }) => (
                  <CopyIcon className={cn("w-full h-full stroke-[#ba681f]")}>
                    <title>copy icon</title>
                  </CopyIcon>
                )}
              </Icons.Consumer>
            </span>
            <p className={cn("text-base")}>Copier le lien</p>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
