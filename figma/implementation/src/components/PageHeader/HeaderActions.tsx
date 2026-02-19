import { cn } from "../../lib/utils";
import axios from "axios";
export function HeaderActions({
  actions,
  logoutIcon,
}: {
  actions: {
    logout: () => { url: string; method: "post" };
    upload: () => { url: string; method: "get" };
  };
  logoutIcon: string;
}) {
  return (
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
          // There's something missing here ...
          // fetch(actions.logout().url)
          //   .then((response) => {
          //     if (response.ok) {
          //       window.location.href = "/";
          //     } else {
          //       throw response;
          //     }
          //   })
          //   .catch(async (error: Response) => {
          //     const { status, statusText } = error;
          //     console.error({
          //       status,
          //       statusText,
          //       statusDetails: await error.text(),
          //     });
          //   });
        }}
      >
        <img src={logoutIcon} alt="logout" className={cn("w-4 h-4")} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}
