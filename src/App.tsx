import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import ContactUs from "./pages/ContactUs";
import SignUp from "./pages/SignUp";
import PublicRoute from "./components/auth/PublicRoute";
import { login } from "./redux/slices/authSlice";

const App: React.FC = () => {

  useEffect(() => {
  const storedUser = localStorage.getItem("auth");
  if (storedUser) {
    dispatch(login(JSON.parse(storedUser)));
  }
}, []);

  return (
    <Router>
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
    </Router>
  );
};

export default App;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

