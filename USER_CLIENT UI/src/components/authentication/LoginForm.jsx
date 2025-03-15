import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import "../../styles/modules/LoginPage.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await dispatch(loginUser(formData.email, formData.password, formData.role));

      if (!res?.success) {
        setErrorMessage(res.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-header">
        <h2>Welcome Back!</h2>
        <p>Please log in to continue</p>
      </div>
      <div className="login-container">
        <div className="login-form">
          {errorMessage && <p className="error">{errorMessage}</p>}
          {authError && <p className="error">{authError}</p>}

          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-label="Email"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              aria-label="Password"
            />

            <label htmlFor="role">Select Your Role:</label>
            <select name="role" id="role" value={formData.role} onChange={handleInputChange} required>
              <option value="user">Traveler</option>
              <option value="client">Business Owner</option>
            </select>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>

          <div className="auth-links">
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
              Not registered? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
