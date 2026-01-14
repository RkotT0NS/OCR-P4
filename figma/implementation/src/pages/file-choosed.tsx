import React from 'react';

const fileImageIcon = "https://www.figma.com/api/mcp/asset/2e17934b-3fed-44f8-aef1-6f601cf2ed73";
const copyIcon = "https://www.figma.com/api/mcp/asset/79326ab5-ec1f-491c-b2cf-2ae1e032463b";

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold text-black">
          DataShare
        </h1>
        <button className="bg-[#2c2c2c] text-white px-4 py-3 rounded-lg text-sm">
          Se connecter
        </button>
      </div>
    </header>
  );
}

export default function FileChoosed() {
  return (
    <div className="relative w-full h-screen" style={{ backgroundImage: "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)" }}>
        <Header/>
      <main className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white flex flex-col gap-6 items-center max-w-lg w-full p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-black text-center">
            Ajouter un fichier
          </h2>

          <div className="flex items-center w-full bg-white p-2">
            <div className="flex flex-1 items-center gap-4">
              <div className="w-6 h-6 relative">
                <img alt="File image icon" className="w-full h-full" src={fileImageIcon} />
              </div>
              <div className="flex flex-1 flex-col justify-center text-black">
                <p className="text-base text-ellipsis overflow-hidden whitespace-nowrap">
                  IMG_9210_123123131313213231.jpg
                </p>
                <p className="text-sm">
                  2,6 Mo
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start w-full">
            <p className="text-base text-black">
              Félicitations, ton fichier sera conservé chez nous pendant une semaine !
            </p>
            <div className="bg-gray-200/50 flex items-center p-2 rounded-lg w-full">
              <p className="text-base text-[#d8640b] underline">
                https://datashare.fr/UhGyr
              </p>
            </div>
          </div>
          <button className="bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] px-4 py-3 rounded-lg flex items-center justify-center gap-2">
            <div className="w-4 h-4 relative">
                <img alt="Copy icon" className="w-full h-full" src={copyIcon} />
            </div>
            <p className="text-base">
              Copier le lien
            </p>
          </button>
        </div>
      </main>
      <footer className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[1280px] mx-auto p-4 text-white">
            <p>Copyright DataShare© 2025</p>
          </div>
      </footer>
    </div>
  );
}
