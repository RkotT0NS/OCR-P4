import { Icons } from "../contexts/Icons";
import { cn } from "../lib/utils";
import { Copyright } from "../components/Copyright";
import axios from "axios";

function FileEntry({
  icon,
  fileName,
  expiration,
  isExpired,
  isLocked,
}: {
  icon: string;
  fileName: string;
  expiration: string;
  isExpired?: boolean;
  isLocked?: boolean;
}) {
  return (
    <Icons.Consumer>
      {({ deleteIcon, accessIcon, lockIcon }) => (
        <div
          className={cn(
            "bg-orange-50/5 border border-orange-200/50 rounded-lg flex items-center p-3 gap-4 w-full",
          )}
        >
          <img src={icon} alt="file icon" className={cn("w-6 h-6")} />
          <div className={cn("flex-1")}>
            <p className={cn("font-semibold text-black truncate")}>
              {fileName}
            </p>
            <p
              className={cn(
                "text-sm",
                isExpired ? "text-red-600" : "text-black",
              )}
            >
              {expiration}
            </p>
          </div>
          {isExpired ? (
            <p className={cn("text-sm text-gray-500")}>
              Ce fichier à expiré, il n’est plus stocké chez nous
            </p>
          ) : (
            <div className={cn("flex items-center gap-2")}>
              {isLocked && (
                <img src={lockIcon} alt="lock icon" className={cn("w-4 h-4")} />
              )}
              <button
                className={cn(
                  "flex items-center gap-2 p-2 border border-orange-300 rounded-md",
                )}
              >
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  className={cn("w-4 h-4")}
                />
                <span>Supprimer</span>
              </button>
              <button
                className={cn(
                  "flex items-center gap-2 p-2 border border-orange-300 rounded-md",
                )}
              >
                <span>Accéder</span>
                <img
                  src={accessIcon}
                  alt="access icon"
                  className={cn("w-4 h-4")}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </Icons.Consumer>
  );
}

export default function UserSpacePage({
  uploads,
  actions,
}: {
  uploads: unknown;
  actions: {
    logout: () => { url: string; method: "post" };
    upload: () => { url: string; method: "get" };
  };
}) {
  console.log(actions.logout());
  console.log(uploads);
  return (
    <Icons.Consumer>
      {({ logoutIcon, fileIcon, audioIcon, videoIcon }) => (
        <div className={cn("flex h-screen bg-[#fff8f3]")}>
          <aside
            className={cn("w-64 flex flex-col")}
            style={{
              backgroundImage:
                "linear-gradient(153.58deg, #FFB88C 2.29%, #DE6262 97.71%)",
            }}
          >
            <div className={cn("p-8")}>
              <h1 className={cn("text-4xl font-bold text-white")}>DataShare</h1>
            </div>
            <nav className={cn("p-6")}>
              <a
                href="#"
                className={cn(
                  "block bg-white/40 text-orange-900 font-semibold p-3 rounded-xl",
                )}
              >
                Mes fichiers
              </a>
            </nav>
            <div
              className={cn("mt-auto p-6 text-white/80 text-sm font-inter ")}
            >
              <Copyright />
            </div>
          </aside>

          <div className={cn("flex-1 flex flex-col")}>
            <header
              className={cn(
                "bg-[#ffeee3] border-b border-orange-200/50 flex justify-end items-center p-4",
              )}
            >
              <div className={cn("flex items-center gap-4")}>
                <button
                  className={cn("bg-gray-800 text-white px-4 py-2 rounded-lg")}
                  onClick={() => {
                    window.location.href = actions.upload().url;
                  }}
                >
                  Ajouter des fichiers
                </button>
                <button
                  className={cn(
                    "flex items-center gap-2 text-orange-600 px-4 py-2 rounded-lg",
                  )}
                  onClick={() => {
                    axios.post(actions.logout().url).then(() => {
                      window.location.href = "/";
                    });
                  }}
                >
                  <img
                    src={logoutIcon}
                    alt="logout"
                    className={cn("w-4 h-4")}
                  />
                  <span>Déconnexion</span>
                </button>
              </div>
            </header>

            <main className={cn("p-6 flex flex-col gap-6")}>
              <h2 className={cn("text-3xl font-bold text-black")}>
                Mes fichiers
              </h2>
              <div
                className={cn(
                  "bg-orange-100/30 border border-orange-200/50 rounded-full flex text-center text-sm font-medium self-start",
                )}
              >
                <button
                  className={cn(
                    "py-2 px-4 bg-[#e77a6e] text-white rounded-full",
                  )}
                >
                  Tous
                </button>
                <button className={cn("py-2 px-4 text-black")}>Actifs</button>
                <button className={cn("py-2 px-4 text-black")}>Expiré</button>
              </div>
              <div className={cn("flex flex-col gap-4")}>
                <FileEntry
                  icon={fileIcon}
                  fileName="IMG_9210_123123131313213231.jpg"
                  expiration="Expire dans 2 jours"
                  isLocked
                />
                <FileEntry
                  icon={audioIcon}
                  fileName="compo2.mp3"
                  expiration="Expire demain"
                />
                <FileEntry
                  icon={videoIcon}
                  fileName="vacances_ardeche.mp4"
                  expiration="Expiré"
                  isExpired
                />
              </div>
            </main>
          </div>
        </div>
      )}
    </Icons.Consumer>
  );
}
