import { Link } from "react-router-dom";

const AuthGateway = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Welcome</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthGateway;
