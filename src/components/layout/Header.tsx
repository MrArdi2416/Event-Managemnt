import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[#fe4e4e] text-white px-6 py-4 flex justify-between items-center rounded-b-lg shadow-md">
      <h1 className="text-xl font-bold">Event Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="font-medium">👋 {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-[#fe4e4e] px-3 py-1 rounded hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
