import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const alertIcon = "https://www.figma.com/api/mcp/asset/38a7ba09-95e2-4753-b5e3-b0b749adc97a";
const fileIcon = "https://www.figma.com/api/mcp/asset/44bd39cf-9dc5-496c-86cb-32b2e379ec54";
const downloadIcon = "https://www.figma.com/api/mcp/asset/754b191c-9ff8-4765-a865-b3361e097f73";

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
        <div className="bg-[#fff5ed] border border-[#e6cbb5] rounded-lg flex items-center gap-2 p-2 w-full">
            <img src={alertIcon} alt="alert icon" className="w-4 h-4"/>
            <p className="text-[#aa642b] text-sm">{label}</p>
        </div>
    )
}

function DownloadWithoutPasswordPage() {
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
                        <Callout label="Ce fichier expirera demain." />
                    </div>
                    <button className="bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] p-3 rounded-lg w-full flex items-center justify-center gap-2">
                        <img src={downloadIcon} alt="download icon" className="w-4 h-4"/>
                        <span>Télécharger</span>
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default DownloadWithoutPasswordPage;
