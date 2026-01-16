import React from 'react';

export function Footer() {
  return (
    <footer className="max-[900px]:hidden absolute bottom-0 left-0 right-0">
        <div className="max-w-[1280px] mx-auto p-4 text-white">
        {/* <p>Copyright DataShare<span className="align-super">©</span> 2025</p> */}
        <p 
        className="text-shadow-black text-shadow-sm"
        >
            Copyright DataShare<span className="align-super">©</span> 2025
        </p>
        </div>
    </footer>
  );
}
