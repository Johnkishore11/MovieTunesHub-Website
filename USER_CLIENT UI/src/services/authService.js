// src/services/authService.js
import { authAPI } from '../api/authAPI';

// Register Service
export const registerUserService = async (userData) => {
  try {
    const { name, email, password, role } = userData;
    const formattedRole = role?.toLowerCase() || 'user'; // Ensure lowercase role

    const data = await authAPI.register({ name, email, password, role: formattedRole });

    if (data?.token) {
      // Securely store token and role received from the backend
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role || formattedRole); // Prefer backend role
    }

    return {
      success: data?.success || false,
      message: data?.message || "Registration successful",
      user: data?.user || null,
      token: data?.token || null,
      role: data.role || formattedRole, // Prefer backend role
      otpSent: data?.otpSent || false, // 🔹 Ensures continuity with authActions.js
    };
  } catch (error) {
    console.error("Registration Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Registration failed. Please try again.",
      otpSent: false, // 🔹 Ensure failure case also has `otpSent`
    };
  }
};

// Login Service
export const loginUserService = async (email, password, role) => {
  try {
    const formattedRole = role?.toLowerCase() || 'user';
    const data = await authAPI.login({ email, password, role: formattedRole });

    if (data?.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role || formattedRole);
    }

    return {
      success: data?.success || false,
      message: data?.message || "Login successful",
      user: data?.user || null,
      token: data?.token || null,
      role: data.role || formattedRole,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Login failed. Please try again.",
    };
  }
};

// Verify OTP Service
export const verifyOtpService = async (otpData) => {
  try {
    const data = await authAPI.verifyOtp(otpData);

    if (data?.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role); // 🔹 Store role after OTP verification
    }

    return {
      success: data?.success || false,
      message: data?.message || "OTP verification successful",
      token: data?.token || null, // 🔹 Ensure token is returned post-OTP
      role: data?.role || null, // 🔹 Ensure role is returned post-OTP
    };
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "OTP verification failed. Try again.",
    };
  }
};

// Logout Service
export const logoutUserService = async () => {
  try {
    await authAPI.logout();
    sessionStorage.clear(); // Clear all session storage
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Logout failed. Please try again.",
    };
  }
};

// Get Current User Service
export const getCurrentUserService = async () => {
  try {
    const data = await authAPI.fetchCurrentUser();
    return data?.user || null;
  } catch (error) {
    console.error("Fetch User Error:", error);
    return null;
  }
};
