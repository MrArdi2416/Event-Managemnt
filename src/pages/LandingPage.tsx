import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-white to-white relative overflow-hidden">
        {/* Header Buttons */}
        <div className="absolute top-4 right-6 z-10 flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#fe4e4e] text-white px-5 py-2 rounded-md text-sm hover:bg-[#e33d3d] transition font-medium shadow"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="border-2 border-[#fe4e4e] text-[#fe4e4e] px-5 py-2 rounded-md text-sm hover:bg-[#fff1f1] transition font-medium"
          >
            Sign Up
          </button>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Text Content */}
          <div className="md:w-1/2 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-3 leading-tight">
              Welcome to <br />
              <span className="text-[#fe4e4e]">Thinkwik</span> Event Dashboard
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              Built with React, TypeScript, Redux Toolkit, Tailwind, and love.
              Manage your events smoothly and efficiently.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#fe4e4e] text-white px-6 py-3 rounded-lg hover:bg-[#e53e3e] transition font-semibold"
              >
                Task Details
              </button>
              <button
                onClick={() => navigate("/contactus")}
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="md:w-1/2 animate-fade-in delay-200">
            <img
              src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?auto=format&fit=crop&w=1050&q=80"
              alt="Event"
              className="rounded-xl shadow-xl w-full object-cover max-h-[400px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
