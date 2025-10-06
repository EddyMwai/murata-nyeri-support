import React from "react";

const Header: React.FC<{ title?: string; children?: React.ReactNode }> = ({ title = "Murata", children }) => (
  <header className="w-full bg-gradient-to-r from-[#7A4BFF] to-[#B768FF] py-4 px-6 flex items-center justify-between shadow-murata">
    <h1 className="text-2xl font-bold text-white tracking-wide">{title}</h1>
    {children}
  </header>
);

export default Header;
