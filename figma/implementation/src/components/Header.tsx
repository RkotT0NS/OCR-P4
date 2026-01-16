import React from 'react';

type HeaderProps = {
  className?: string;
  login?: "Anonymous" | "User";
};

export function Header({ className = "", login = "Anonymous" }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 ${className}`}>
      <div className="flex gap-[10px] items-center justify-end max-w-[1280px] mx-auto p-[16px] relative shrink-0 w-full">
        <p className="flex-[1_0_0] font-bold leading-[40px] relative text-[32px] text-black whitespace-pre-wrap">
          DataShare
        </p>
        <div className="flex flex-col items-start relative shrink-0">
          <button className="bg-[#2c2c2c] flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[8px] shrink-0">
            <span className="font-normal leading-[16px] relative shrink-0 text-[#f3eeea] text-[16px]">
              {login === 'Anonymous' ? 'Se connecter' : 'Mon espace'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
