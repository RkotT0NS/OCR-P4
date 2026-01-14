import React from 'react';

const uploadIcon = "https://www.figma.com/api/mcp/asset/9245b9ba-0864-4552-9150-7f03c11d928b";

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold text-black">
          DataShare
        </h1>
        <button className="bg-[#2c2c2c] text-white px-4 py-3 rounded-lg text-sm">
          Mon espace
        </button>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="relative w-full h-screen" style={{ backgroundImage: "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)" }}>
      <Header />
      <main className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-3xl font-light text-black">
            Tu veux partager un fichier ?
          </p>
          <div className="p-6 bg-black/15 rounded-full">
            <div className="p-6 bg-[#100218] rounded-full">
                <img alt="Upload cloud icon" className="w-12 h-12" src={uploadIcon} />
            </div>
          </div>
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
