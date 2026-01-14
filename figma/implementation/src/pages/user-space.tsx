import React from 'react';

const logoutIcon = "https://www.figma.com/api/mcp/asset/4bef1d54-5946-4cc2-bbbb-2b969174b1af";
const fileIcon = "https://www.figma.com/api/mcp/asset/0d70d109-ac9b-467d-9be7-7e79e7381986";
const deleteIcon = "https://www.figma.com/api/mcp/asset/b71745e9-ee6e-4591-a2ef-738c33acab31";
const accessIcon = "https://www.figma.com/api/mcp/asset/2edd435a-8048-4665-9a18-26c7af14aeb5";
const audioIcon = "https://www.figma.com/api/mcp/asset/5e650f3a-1716-4622-9c57-3fd7f451df38";
const videoIcon = "https://www.figma.com/api/mcp/asset/9ae0d90e-61e3-4db0-a000-36eda616340c";
const lockIcon = "https://www.figma.com/api/mcp/asset/f9208425-9247-495d-9e5d-582823f2f044";


function FileEntry({ icon, fileName, expiration, isExpired, isLocked }: { icon: string, fileName: string, expiration: string, isExpired?: boolean, isLocked?: boolean }) {
    return (
        <div className="bg-orange-50/5 border border-orange-200/50 rounded-lg flex items-center p-3 gap-4 w-full">
            <img src={icon} alt="file icon" className="w-6 h-6" />
            <div className="flex-1">
                <p className="font-semibold text-black truncate">{fileName}</p>
                <p className={`text-sm ${isExpired ? 'text-red-600' : 'text-black'}`}>{expiration}</p>
            </div>
            {isExpired ? (
                <p className="text-sm text-gray-500">Ce fichier à expiré, il n’est plus stocké chez nous</p>
            ) : (
                <div className="flex items-center gap-2">
                    {isLocked && <img src={lockIcon} alt="lock icon" className="w-4 h-4" />}
                    <button className="flex items-center gap-2 p-2 border border-orange-300 rounded-md">
                        <img src={deleteIcon} alt="delete icon" className="w-4 h-4" />
                        <span>Supprimer</span>
                    </button>
                    <button className="flex items-center gap-2 p-2 border border-orange-300 rounded-md">
                        <span>Accéder</span>
                        <img src={accessIcon} alt="access icon" className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}


function UserSpace() {
    return (
        <div className="flex h-screen bg-[#fff8f3]">
            <aside className="w-64 flex flex-col" style={{ backgroundImage: "linear-gradient(153.58deg, #FFB88C 2.29%, #DE6262 97.71%)" }}>
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-white">DataShare</h1>
                </div>
                <nav className="p-6">
                    <a href="#" className="block bg-white/40 text-orange-900 font-semibold p-3 rounded-xl">Mes fichiers</a>
                </nav>
                <div className="mt-auto p-6 text-white/80 text-sm">
                    <p>Copyright DataShare© 2025</p>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-[#ffeee3] border-b border-orange-200/50 flex justify-end items-center p-4">
                    <div className="flex items-center gap-4">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Ajouter des fichiers</button>
                        <button className="flex items-center gap-2 text-orange-600 px-4 py-2 rounded-lg">
                            <img src={logoutIcon} alt="logout" className="w-4 h-4" />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </header>

                <main className="p-6 flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-black">Mes fichiers</h2>
                    <div className="bg-orange-100/30 border border-orange-200/50 rounded-full flex text-center text-sm font-medium self-start">
                        <button className="py-2 px-4 bg-[#e77a6e] text-white rounded-full">Tous</button>
                        <button className="py-2 px-4 text-black">Actifs</button>
                        <button className="py-2 px-4 text-black">Expiré</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <FileEntry icon={fileIcon} fileName="IMG_9210_123123131313213231.jpg" expiration="Expire dans 2 jours" isLocked />
                        <FileEntry icon={audioIcon} fileName="compo2.mp3" expiration="Expire demain" />
                        <FileEntry icon={videoIcon} fileName="vacances_ardeche.mp4" expiration="Expiré" isExpired />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserSpace;
