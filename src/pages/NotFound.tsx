import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface NotFoundProps {
  redirectTo?: string;
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ redirectTo = "/", message = "Oops! Page not found" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [location.pathname, navigate, redirectTo]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">{message}</p>
        <p className="mb-4 text-md text-gray-500">Redirecting to home...</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
