import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Callout } from "../components/Callout";
import { cn } from "../lib/utils";

export default function NoDownloadAvailablePage() {
  return (
    <div
      className={cn("relative w-full h-screen")}
      style={{
        backgroundImage:
          "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)",
      }}
    >
      <Header />
      <main className={cn("w-full h-full flex flex-col items-center justify-center")}>
        <div className={cn("bg-white flex flex-col gap-6 items-center max-w-xl w-full p-8 rounded-2xl shadow-lg")}>
          <h2 className={cn("text-3xl font-bold text-black text-center")}>
            Télécharger un fichier
          </h2>
          <Callout
            label="Ce fichier n'est plus disponible en téléchargement car il a expiré."
            type="Error"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}