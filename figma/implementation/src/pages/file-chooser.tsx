import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const chevronDownIcon = "https://www.figma.com/api/mcp/asset/55ce0c05-6733-444a-9f51-1d95ba2feae2";
const fileImageIcon = "https://www.figma.com/api/mcp/asset/9e17eb71-acf4-4781-a4c1-c77be700cc33";
const uploadIcon = "https://www.figma.com/api/mcp/asset/5ac24ffb-a08f-4526-b847-9b4561417aff";

function ChevronDown({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
        <img className="w-full h-full" alt="Chevron Down Icon" src={chevronDownIcon} />
      </div>
    </div>
  );
}

function InputField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-base text-gray-800">{label}</p>
      <div className="bg-white border border-gray-300 rounded-lg flex items-center p-3 w-full">
        <p className="flex-1 text-base text-gray-400">{placeholder}</p>
      </div>
    </div>
  );
}


export default function FileChooser() {
  return (
    <div className="relative w-full h-screen" style={{
      backgroundImage: "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)"
    }}>
      <Header />
      <main className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white flex flex-col gap-6 items-center max-w-lg w-full p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-black text-center">
            Ajouter un fichier
          </h2>
          <div className="flex flex-1 items-center w-full gap-4">
            <div className="flex flex-0 items-center">
              <div className="w-6 h-6 relative">
                <img alt="File Image Icon" className="w-full h-full" src={fileImageIcon} />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center text-black overflow-hidden">
              <p className="text-base text-ellipsis overflow-hidden whitespace-nowrap">
                IMG_9210_123123131313213231.jpg
              </p>
              <p className="text-sm">
                2,6 Mo
              </p>
            </div>
            <button className="flex-initial border border-[#ffa569] text-[#794310] px-3 py-2 rounded-lg text-base">
              Changer
            </button>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <InputField label="Mot de passe" placeholder="Optionnel" />
            <div className="flex flex-col gap-2 w-full">
              <p className="text-base text-gray-800">Expiration</p>
              <div className="bg-white border border-gray-300 rounded-lg flex items-center justify-between pl-4 pr-3 py-3 w-full">
                <p className="flex-1 text-base text-gray-800">
                  Une journée
                </p>
                <ChevronDown className="w-4 h-4 relative" />
              </div>
            </div>
          </div>
          <button className="bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#794310] px-4 py-3 rounded-lg flex items-center justify-center gap-2">
            <div className="w-4 h-4 relative">
                <img alt="Upload Icon" className="w-full h-full" src={uploadIcon} />
            </div>
            <p className="text-base">
              Téléverser
            </p>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
