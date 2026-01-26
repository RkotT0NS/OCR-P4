import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const errorIcon = "https://www.figma.com/api/mcp/asset/c8952fa5-228b-4803-b7a1-0a358c35a5e6";

function Callout({label}: {label: string}) {
    return (
        <div className="bg-[#ffe2e2] border border-[#e8a6a6] rounded-lg flex items-center gap-2 p-2 w-full">
            <img src={errorIcon} alt="error icon" className="w-4 h-4"/>
            <p className="text-[#9c3333] text-sm">{label}</p>
        </div>
    )
}

export default function NoDownloadAvailablePage() {
    return (
        <div className="relative w-full h-screen" style={{ backgroundImage: "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)" }}>
            <Header/>
            <main className="w-full h-full flex flex-col items-center justify-center">
                <div className="bg-white flex flex-col gap-6 items-center max-w-xl w-full p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-black text-center">
                        Télécharger un fichier
                    </h2>
                    <Callout label="Ce fichier n'est plus disponible en téléchargement car il a expiré." />
                </div>
            </main>
            <Footer />
        </div>
    );
}
