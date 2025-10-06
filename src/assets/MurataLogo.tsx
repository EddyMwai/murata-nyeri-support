import React from "react";

const MurataLogo = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="24" cy="24" r="24" fill="url(#murata-gradient)" />
    <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">M</text>
    <defs>
      <linearGradient id="murata-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7A4BFF" />
        <stop offset="1" stopColor="#B768FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default MurataLogo;
