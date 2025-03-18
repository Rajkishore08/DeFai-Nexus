
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import BackButton from '@/components/shared/BackButton';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-defi-gradient p-4">
      <div className="text-center glass p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white/80 mb-6">Oops! Page not found</p>
        <div className="flex gap-4 justify-center">
          <BackButton />
          <Link to="/" className="text-defi-teal hover:text-white underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
