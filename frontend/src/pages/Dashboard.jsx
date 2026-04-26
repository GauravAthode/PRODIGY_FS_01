import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      
      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/60 shadow-2xl rounded-3xl p-10 flex flex-col items-center space-y-6 border border-white/30">
        
        {/* Logo */}
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <img
            src="https://placehold.co/400x200?text=PRODIGY+INFOTECH"
            alt="PRODIGY INFOTECH Logo"
            className="w-40 md:w-52 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text tracking-wide text-center">
          PRODIGY INFOTECH
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm md:text-base text-center">
          Welcome to your dashboard 🚀
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;