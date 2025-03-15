import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Global Components
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import HomePage from "./components/global/HomePage";
import NotFoundPage from "./components/global/NotFoundPage";

// User Pages
import UserPage from "./components/user/UserHome";
import UserDashboardPage from "./components/user/UserManageTour";
import TourDetailPage from "./components/user/UserTour";
import UserProfilePage from "./components/user/UserProfile";

// Client Pages
import ClientPage from "./components/client/ClientHome";
import ClientDashboardPage from "./components/client/ClientRewards";
import ClientAddFeed from "./components/client/ClientAddFeed";
import ClientProfilePage from "./components/client/ClientProfile";

// Authentication Components
import LoginPage from "./components/authentication/LoginForm";
import RegistrationPage from "./components/authentication/RegisterForm";

// Role-Based Protected Route
import ProtectedRoute from "./components/authentication/ProtectedRoute";


const App = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} role={role} isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />

      <main className="App" onClick={() => setIsNavbarOpen(false)} aria-live="polite">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isAuthenticated ? <Navigate to={`/${role}`} replace /> : <HomePage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to={`/${role}`} replace /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to={`/${role}`} replace /> : <RegistrationPage />} />
          
          {/* Protected User Routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>          
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/dashboard" element={<UserDashboardPage />} />
            <Route path="/user/tours" element={<TourDetailPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
          </Route>

          {/* Protected Client Routes */}
          <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client/dashboard" element={<ClientDashboardPage />} />
            <Route path="/client/submit-place" element={<ClientAddFeed/>} />
            <Route path="/client/profile" element={<ClientProfilePage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
