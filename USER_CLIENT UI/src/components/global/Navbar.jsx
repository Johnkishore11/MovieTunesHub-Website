import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { FiMenu, FiX } from "react-icons/fi";
import "../../styles/Navbar.css";

const Navbar = ({ isAuthenticated, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    setMenuOpen(false); // Close menu before redirecting
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 0);
  }, [dispatch, navigate]);

  // Toggle the menu on mobile view
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  // Close menu after navigation
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Navbar Links Based on Role
  const navbarLinks = useMemo(() => {
    if (!isAuthenticated) {
      return (
        <>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
          <Link to="/register" onClick={closeMenu}>Register</Link>
        </>
      );
    }

    if (isAuthenticated && role === "user") {
      return (
        <>
          <Link to="/user" onClick={closeMenu}>User Home</Link>
          <Link to="/user/dashboard" onClick={closeMenu}>Dashboard</Link>
          <Link to="/user/profile" onClick={closeMenu}>Profile</Link>
          <Link to="/user/tours" onClick={closeMenu}>My Tours</Link>
          <button onClick={handleLogout} className="logout-btn" aria-label="Logout">
            Logout
          </button>
        </>
      );
    }
    if (isAuthenticated && role === "client") {
      return (
        <>
          <Link to="/client" onClick={closeMenu}>Client Home</Link>
          <Link to="/client/dashboard" onClick={closeMenu}>Dashboard</Link>
          <Link to="/client/profile" onClick={closeMenu}>Profile</Link>
          <Link to="/client/submit-place" onClick={closeMenu}>Submit Place</Link>
          <button onClick={handleLogout} className="logout-btn" aria-label="Logout">
            Logout
          </button>
        </>
      );
    }
  }, [isAuthenticated, role, closeMenu, handleLogout]);

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <Link to="/" className="logo" aria-label="Go to Home">🌍 AI Tour</Link>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {navbarLinks}
      </div>

      <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </nav>
  );
};

export default Navbar;
