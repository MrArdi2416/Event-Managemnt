import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // ⛔️ No BrowserRouter here!
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import ContactUs from "./pages/ContactUs";
import SignUp from "./pages/SignUp";
import PublicRoute from "./components/auth/PublicRoute";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  // const { login } = useAuth();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("auth");
  //   if (storedUser) {
  //     login(JSON.parse(storedUser));
  //   }
  // }, [login]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
