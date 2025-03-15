// src/api/authAPI.js

const API_BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || '';

if (!API_BASE_URL) {
  console.warn('API Base URL is not defined. Check your environment variables.');
}

// Generic error handler for API responses
const handleResponseError = async (response) => {
  console.error(`API Response Error [${response.status}]: ${response.statusText}`);

  let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
  try {
    const errorData = await response.json();
    errorMessage = errorData?.message || errorMessage;
  } catch {
    // Fallback to default error message
  }

  return Promise.reject(errorMessage);
};

// Generic API request function
const makeApiRequest = async (endpoint, method, body = null, authRequired = false) => {
  try {
    const headers = { 'Content-Type': 'application/json' };
    const token = sessionStorage.getItem('token'); // 🔹 Ensure consistent token usage

    if (authRequired) {
      if (!token) return { success: false, message: 'Authentication token missing' };
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorMessage = await handleResponseError(response);
      return { success: false, message: errorMessage };
    }

    const responseData = await response.json();
    
    return { success: true, ...responseData }; // 🔹 Ensures expected response format
  } catch (error) {
    console.error(`API Request Failed: ${method} ${endpoint}`, error);
    return { success: false, message: error.message || 'Unexpected error' };
  }
};

export const authAPI = {
  register: async (userData) => {
    const response = await makeApiRequest(`/api/auth/register`, 'POST', userData);
    return { ...response, otpSent: response?.otpSent || false }; // 🔹 Ensures otpSent continuity
  },
  login: (credentials) => makeApiRequest(`/api/auth/login`, 'POST', credentials),
  verifyOtp: (otpData) => makeApiRequest(`/api/auth/verify-otp`, 'POST', otpData),
  fetchCurrentUser: () => makeApiRequest(`/api/auth/me`, 'GET', null, true),
  logout: () => makeApiRequest(`/api/auth/logout`, 'POST', null, true),
};
