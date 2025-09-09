import { Link } from "react-router-dom";
import "../index.css";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto text-center p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to CampusEase
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your one-stop solution for campus complaint management
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
