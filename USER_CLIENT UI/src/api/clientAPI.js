// src/api/clientAPI.js

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
    const token = sessionStorage.getItem('token');

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

    return { success: true, ...responseData };
  } catch (error) {
    console.error(`API Request Failed: ${method} ${endpoint}`, error);
    return { success: false, message: error.message || 'Unexpected error' };
  }
};

// Client API Requests
export const clientAPI = {
  submitFeed: (feedData, token) => makeApiRequest(`/api/client/submit-feed`, 'POST', feedData, true),
  approveFeed: (feedId, token) => makeApiRequest(`/api/client/approve-feed/${feedId}`, 'PUT', null, true),
};
