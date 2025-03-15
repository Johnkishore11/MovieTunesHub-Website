import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      navigate("/login", { replace: true });
    } else if (!allowedRoles.includes(role)) {
      // Show unauthorized popup if logged in but role mismatch
      setShowPopup(true);
    }
  }, [isAuthenticated, role, allowedRoles, navigate]);

  const handleRedirect = () => {
    setShowPopup(false);
    navigate("/login", { state: { from: location.pathname }, replace: true });
  };

  return (
    <>
      {/* Unauthorized Access Popup */}
      {showPopup && isAuthenticated && (
        <div className="modal-overlay">
          <div className="modal">
            <p>🔒 You are not authorized to access this page.</p>
            <button onClick={handleRedirect}>Go to Login</button>
          </div>
        </div>
      )}

      {/* Render Nested Routes */}
      {isAuthenticated && allowedRoles.includes(role) ? <Outlet /> : null}
    </>
  );
};

export default ProtectedRoute;
