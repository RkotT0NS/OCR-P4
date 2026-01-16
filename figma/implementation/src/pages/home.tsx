import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const uploadIcon = "https://www.figma.com/api/mcp/asset/9245b9ba-0864-4552-9150-7f03c11d928b";

export default function Home() {
  return (
    <div className="relative w-full h-screen" style={{
      // below style allow accessibility testing since gradients with multiple colors are not handled
      // backgroundColor: "#DE6262",
      // backgroundColor: "#FFB88C",
      backgroundImage: "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)"
    }}>
      <Header login="Anonymous" />
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
      <Footer />
    </div>
  );
}
