import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, verifyOtp } from "../../redux/actions/authActions";
import "../../styles/modules/RegisterPage.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disableOtpInput, setDisableOtpInput] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverMessage) {
      const timer = setTimeout(() => setServerMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [serverMessage]);

  useEffect(() => {
    console.log("OTP Sent State Changed:", isOtpSent);
  }, [isOtpSent]);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value.trim() }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value.trim());
  };

  const validateInputs = () => {
    const { fullName, email, password, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!fullName.trim()) return "Full Name is required.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!passwordRegex.test(password))
      return "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";
    if (password !== confirmPassword) return "Passwords do not match.";

    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationMessage = validateInputs();
    if (validationMessage) {
      setServerMessage(validationMessage);
      return;
    }

    setIsLoading(true);
    const response = await dispatch(registerUser({ 
      name: formData.fullName, 
      email: formData.email, 
      password: formData.password, 
      role: formData.role 
    }));

    setIsLoading(false);

    console.log("Register Response:", response);

    if (response.success && response.otpSent) {
      setIsOtpSent(true);
      console.log("OTP sent successfully:", response.otp);
      setServerMessage("OTP sent to your email. Please check and verify.");
    } else {
      setServerMessage(response.message || "Failed to send OTP.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otpAttempts >= 3) {
      setServerMessage("Too many failed attempts. Please request a new OTP.");
      return;
    }

    setIsLoading(true);
    const response = await dispatch(verifyOtp({ email: formData.email, otp }));
    setIsLoading(false);

    if (response.success) {
      setDisableOtpInput(true);
      setServerMessage("OTP Verified! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setOtpAttempts((prev) => prev + 1);
      setServerMessage(response.message || "Invalid OTP. Try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Welcome to AI Tour Guider!</h2>
      <p>Create an account to explore amazing tours and manage your favorite spots!</p>

      {serverMessage && <div className="popup-message">{serverMessage}</div>}

      <div className="register-form">
        {isOtpSent ? (
          <form onSubmit={handleOtpSubmit} key="otp-form">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              required
              disabled={disableOtpInput}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit} key="register-form">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="role">Select Your Role:</label>
            <select name="role" id="role" value={formData.role} onChange={handleInputChange} required>
              <option value="user">Traveler (Explore Places)</option>
              <option value="client">Business Owner (Manage Tour Spots)</option>
              <option value="both">Both (Explore & Manage)</option>
            </select>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        <p className="login-redirect">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
