import React from "react";

const GradientButton = ({ children, className = "", ...props }) => (
  <button
    className={`bg-gradient-to-r from-[#7A4BFF] to-[#B768FF] text-white font-semibold py-3 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#7A4BFF] ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default GradientButton;
