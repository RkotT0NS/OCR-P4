// import type React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { cn } from '../lib/utils';
import type { ReactNode } from 'react';

function InputField({ label, placeholder, type = 'text' }: { label: string; placeholder: string, type?: string }) {
    return (
      <div className={cn("flex flex-col gap-2 w-full")}>
        <label className={cn("text-base text-gray-800")}>{label}</label>
        <input type={type} placeholder={placeholder} className={cn("bg-white border border-gray-300 rounded-lg p-3 w-full")} />
      </div>
    );
  }

export default function LoginPage({children}: {children?: ReactNode}) {
    return (
        <div className={cn("relative w-full h-screen")} style={{ backgroundImage: "linear-gradient(174.9deg, #FFB88C 2.29%, #DE6262 97.71%)" }}>
            <Header/>
            <main className={cn("w-full h-full flex flex-col items-center justify-center")}>
                <div className={cn("bg-white flex flex-col gap-6 items-center max-w-xl w-full p-8 rounded-2xl shadow-lg")}>
                    <h2 className={cn("text-3xl font-bold text-black text-center")}>
                        Connexion
            </h2>
            {children || (
              <>
            <div className={cn("flex flex-col gap-4 w-full")}>
                <InputField label="Email" placeholder="Saisissez votre email..." type="email"/>
                <InputField label="Mot de passe" placeholder="Saisissez votre mot de passe..." type="password"/>
            </div>
            <div className={cn("flex flex-col gap-2 w-full")}>
                <button className={cn("text-orange-600 p-3 rounded-lg w-full text-center")}>
                    Créer un compte
                </button>
                <button className={cn("bg-[#ff812d]/13 border border-[#cd5e14]/50 text-[#ba681f] p-3 rounded-lg w-full")}>
                    Connexion
                </button>
            </div>
                </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
