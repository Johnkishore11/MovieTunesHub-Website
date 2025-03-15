// src/redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage for web
import { authReducer } from "../reducers/authReducer";
import clientReducer from "../reducers/clientReducer";

// Persist config for authentication state
const persistConfig = {
  key: "auth", // Unique storage key
  storage,
  whitelist: ["user", "token", "role", "isAuthenticated"], // ✅ Persist essential auth states
  blacklist: ["loading", "error"], // ⛔ Avoid persisting temporary states
};

// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // ✅ Persisted auth reducer
    client: clientReducer, // ✅ Non-persisted client reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ], // ✅ Ignored only necessary actions
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // ✅ Enable Redux DevTools in development
  preloadedState: {}, // ✅ Optional: Can preload state if needed
});

// Create a persistor instance
export const persistor = persistStore(store);

export default store;
