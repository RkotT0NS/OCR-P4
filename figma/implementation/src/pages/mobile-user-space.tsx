const userAvatar =
  "https://www.figma.com/api/mcp/asset/8dbebe88-c7b9-437f-b9e7-922ba155648d";
const menuIcon =
  "https://www.figma.com/api/mcp/asset/09a4c503-1816-4dd6-b697-4d9229956096";
const fileIcon =
  "https://www.figma.com/api/mcp/asset/9da111d5-7dcf-492c-9900-086be00c41ea";
const lockIcon =
  "https://www.figma.com/api/mcp/asset/0521fed8-94ce-4571-a3d4-b00fc9515550";
const kebabIcon =
  "https://www.figma.com/api/mcp/asset/4cc8a393-7b94-4fe8-b6cb-eca0c0d73da3";

function FileEntry({
  fileName,
  expiration,
  isExpired,
  isLocked,
}: {
  fileName: string;
  expiration: string;
  isExpired?: boolean;
  isLocked?: boolean;
}) {
  return (
    <div className="bg-orange-50/5 border border-orange-200/50 rounded-lg flex items-center p-3 gap-4 w-full">
      <img src={fileIcon} alt="file icon" className="w-6 h-6" />
      <div className="flex-1">
        <p className="font-semibold text-black truncate">{fileName}</p>
        <p className={`text-sm ${isExpired ? "text-red-600" : "text-black"}`}>
          {expiration}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {isLocked && <img src={lockIcon} alt="lock icon" className="w-4 h-4" />}
        {!isExpired && (
          <button className="p-2 border border-orange-300 rounded-md">
            <img src={kebabIcon} alt="kebab icon" className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function MobileUserSpace() {
  return (
    <div className="bg-[#fff7f7] w-[393px] h-[852px] mx-auto my-8 shadow-2xl rounded-3xl overflow-hidden">
      <header className="bg-[#ffeee3] border-b border-orange-200/50 px-6 py-4 flex items-center justify-between">
        <img src={menuIcon} alt="menu" className="w-6 h-6" />
        <div className="flex items-center gap-4">
          <img
            src={userAvatar}
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <p className="font-semibold text-black">Claire Marie</p>
        </div>
      </header>

      <main className="p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-black">Mes fichiers</h1>

        <div className="bg-orange-100/30 border border-orange-200/50 rounded-full flex text-center text-sm font-medium">
          <button className="flex-1 py-2 px-4 bg-[#e77a6e] text-white rounded-full">
            Tous
          </button>
          <button className="flex-1 py-2 px-4 text-black">Actifs</button>
          <button className="flex-1 py-2 px-4 text-black">Expiré</button>
        </div>

        <div className="flex flex-col gap-4">
          <FileEntry
            fileName="IMG_9210_123123131313213231.jpg"
            expiration="Expire dans 2 jours"
            isLocked
          />
          <FileEntry
            fileName="compo2.mp3"
            expiration="Expire demain"
            isLocked
          />
          <FileEntry
            fileName="vacances_ardeche.mp4"
            expiration="Expiré"
            isExpired
            isLocked
          />
        </div>
      </main>
    </div>
  );
}

export default MobileUserSpace;
