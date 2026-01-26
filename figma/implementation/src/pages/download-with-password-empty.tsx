import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const infoIcon = "https://www.figma.com/api/mcp/asset/6b26e605-76d3-4bf6-a3cd-0e74e8970122";
const fileIcon = "https://www.figma.com/api/mcp/asset/3f659ec6-9ab2-472a-be74-6070ec90b58a";
const downloadIcon = "https://www.figma.com/api/mcp/asset/a8cdcab2-70fd-4bee-b4f9-d569968832b1";

function FileInfo() {
    return (
        <div className="flex items-center w-full gap-4 p-2">
            <img src={fileIcon} alt="file icon" className="w-6 h-6" />
            <div className="flex-1">
                <p className="text-base text-ellipsis overflow-hidden whitespace-nowrap font-medium">
                    IMG_9210_123123131313213231.jpg
                </p>
                <p className="text-sm text-black">
                    2,6 Mo
                </p>
            </div>
      </div>
    )
}

function Callout({label}: {label: string}) {
    return (
        <div className="bg-[#e2ecff] border border-[#b1c9f5] rounded-lg flex items-center gap-2 p-2 w-full">
            <img src={infoIcon} alt="info icon" className="w-4 h-4"/>
            <p className="text-[#2a3f72] text-sm">{label}</p>
        </div>
    )
}

function InputField({ label, placeholder, type = 'text' }: { label: string; placeholder: string, type?: string }) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-base text-gray-800">{label}</label>
        <input type={type} placeholder={placeholder} className="bg-white border border-gray-300 rounded-lg p-3 w-full" />
      </div>
    );
}

export default function DownloadWithPasswordEmptyPage() {
    return (
        <div className="relative w-full h-screen" style={{ backgroundImage: "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)" }}>
            <Header/>
            <main className="w-full h-full flex flex-col items-center justify-center">
                <div className="bg-white flex flex-col gap-6 items-center max-w-xl w-full p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-black text-center">
                        Télécharger un fichier
                    </h2>
                    <div className="flex flex-col gap-4 w-full">
                        <FileInfo />
                        <Callout label="Ce fichier expirera dans 3 jours." />
                        <InputField label="Mot de passe" placeholder="Saisissez le mot de passe..." type="password"/>
                    </div>
                    <button disabled className="bg-gray-200/50 border border-gray-300/50 text-gray-400 p-3 rounded-lg w-full flex items-center justify-center gap-2">
                        <img src={downloadIcon} alt="download icon" className="w-4 h-4"/>
                        <span>Télécharger</span>
                    </button>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
