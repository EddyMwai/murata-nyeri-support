import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC<{ to?: string; className?: string }> = ({ to = -1, className = "" }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`murata-back flex items-center gap-2 ${className}`}
      onClick={() => (typeof to === "number" ? navigate(to) : navigate(to))}
      aria-label="Back"
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#7A4BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Back
    </button>
  );
};

export default BackButton;
