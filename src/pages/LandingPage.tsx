import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-50 px-4">
      <div className="w-full max-w-xl mx-auto text-center py-16 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">Murata Nyeri Support</h1>
          <p className="text-xl text-muted-foreground mb-4 font-medium">Empowering you to take charge of your wellness journey</p>
          <p className="text-base text-gray-700 mb-8">
            Murata Nyeri Support is a wellness and mental health support platform designed to help users track progress, engage in daily check-ins, and connect for guided assistance.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            className="murata-back w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow hover:from-purple-600 hover:to-purple-800 transition"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          <button
            className="murata-back w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow hover:from-purple-500 hover:to-purple-700 transition"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
      <footer className="w-full text-center py-6 text-muted-foreground text-base font-medium">
        Empowering you to take charge of your wellness journey – Murata Nyeri Support
      </footer>
    </div>
  );
};

export default LandingPage;