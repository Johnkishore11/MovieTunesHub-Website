import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../store/types";

import {
  getCurrentUserService,
  loginUserService,
  logoutUserService,
  registerUserService,
  verifyOtpService,
} from "../../services/authService";

// Load Authenticated User on App Startup
export const loadUser = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    if (auth?.user) return;

    const user = await getCurrentUserService();
    if (user) {
      dispatch({ type: USER_LOADED, payload: user });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error?.response?.data?.message || "Authentication Error",
    });
  }
};

// Login User
export const loginUser = (email, password, role) => async (dispatch) => {
  try {
    if (!role) throw new Error("Role is required for login.");

    const response = await loginUserService(email, password, role);
    if (!response?.success) throw new Error(response.message);

    dispatch({ type: LOGIN_SUCCESS, payload: response });
    dispatch(loadUser());

    return { success: true, message: response.message, role: response.role };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });

    return { success: false, message: errorMessage };
  }
};

// Register User & Trigger OTP (DO NOT dispatch REGISTER_SUCCESS here)
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await registerUserService(userData);
    if (!response?.success) throw new Error(response.message);

    // ✅ Do NOT dispatch REGISTER_SUCCESS yet, wait for OTP verification
    return { success: true, message: response.message, otpSent: response.otpSent || false };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Registration failed. Please try again.";
    dispatch({ type: REGISTER_FAIL, payload: errorMessage });

    return { success: false, message: errorMessage, otpSent: false };
  }
};

// Verify OTP & Complete Registration
export const verifyOtp = ({ email, otp }) => async (dispatch) => {
  try {
    const response = await verifyOtpService({ email, otp });
    if (!response?.success) throw new Error(response.message);

    // ✅ Now dispatch REGISTER_SUCCESS after OTP is verified
    dispatch({ type: REGISTER_SUCCESS, payload: response });

    return { success: true, message: "OTP Verified! Registration Complete." };
  } catch (error) {
    return { success: false, message: error?.response?.data?.message || "OTP verification failed." };
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await logoutUserService();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
