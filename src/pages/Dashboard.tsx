import React from "react";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "../components/events/CreateEventModal";
import EventFilters from "../components/events/EventFilters";
import EventList from "../components/events/EventList";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-white to-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#fe4e4e]">
            Event Management
          </h1>
          <button
            onClick={handleLogout}
            className="bg-[#fe4e4e] text-white px-5 py-2 rounded-md font-medium hover:bg-[#e53e3e] transition"
          >
            Logout
          </button>
        </div>

        {/* Event Management Features */}
        <div className="space-y-6">
          <CreateEventModal />
          <EventFilters />
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
