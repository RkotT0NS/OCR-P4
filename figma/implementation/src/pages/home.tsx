import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { cn } from "../lib/utils";

const uploadIcon =
  "https://www.figma.com/api/mcp/asset/9245b9ba-0864-4552-9150-7f03c11d928b";

export default function Home({user}: {user:unknown}) {
  console.log({ user });
  return (
    <div
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
      <main className={cn("w-full h-full flex flex-col items-center justify-center")}>
        <div className={cn("flex flex-col items-center gap-6 text-center")}>
          <p className={cn("text-3xl font-light text-black")}>
            Tu veux partager un fichier ?
          </p>
          <div className={cn("p-6 bg-black/15 rounded-full")}>
            <div className={cn("p-6 bg-[#100218] rounded-full")}>
              <img
                alt="Upload cloud icon"
                className={cn("w-12 h-12")}
                src={uploadIcon}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
