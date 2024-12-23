import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <i className="text-6xl fas fa-exclamation-triangle"></i>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-xl mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>

        {/* Redirect Button */}
        <Link to="/" className="bg-white text-indigo-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-500 hover:text-white transition duration-300">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
