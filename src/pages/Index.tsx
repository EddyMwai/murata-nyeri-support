import { useState } from "react";
import LandingPage from "./LandingPage";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import PasswordResetForm from "@/components/PasswordResetForm";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "signup" | "reset">("landing");

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onForgotPassword={() => setCurrentView("reset")}
            onSignUp={() => setCurrentView("signup")}
            onClose={() => setCurrentView("landing")}
          />
        );
      case "signup":
        return (
          <SignupForm
            onLogin={() => setCurrentView("login")}
            onClose={() => setCurrentView("landing")}
          />
        );
      case "reset":
        return (
          <PasswordResetForm
            onBack={() => setCurrentView("login")}
            onClose={() => setCurrentView("landing")}
          />
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <LandingPage />
      {currentView !== "landing" && renderCurrentView()}
    </>
  );
};

export default Index;
