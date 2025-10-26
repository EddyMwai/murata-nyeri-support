import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";

// Stub AnalyticsPage for /analytics route
const AnalyticsPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-4">Analytics</h1>
    <p className="text-lg">Admin analytics and metrics will appear here.</p>
    <button className="murata-back mt-6" onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</button>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage activeTab="login" />} />
            <Route path="/signup" element={<AuthPage activeTab="signup" />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
