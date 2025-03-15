import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../store/types";

const initialState = {
  user: null,
  token: null,
  role: "",
  isAuthenticated: false, // ✅ Correct authentication handling
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role || "",
        isAuthenticated: true, // ✅ User is now authenticated only after login
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        // ✅ DO NOT set `isAuthenticated` here, just store user details for reference
        user: action.payload.user,
        token: null, // Ensure token is NOT stored yet
        role: action.payload.role || "",
      };

    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        role: action.payload.role || "",
        isAuthenticated: !!action.payload, // ✅ Ensure proper authentication check
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        role: "",
        isAuthenticated: false, // ✅ Set to false on error
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState, // ✅ Reset state completely
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
