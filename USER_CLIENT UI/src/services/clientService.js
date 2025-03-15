// src/services/clientService.js
import { clientAPI } from "../api/clientAPI";

// Submit a new feed
export const submitFeedService = async (feedData) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authentication token is missing.");

    const data = await clientAPI.submitFeed(feedData, token);

    return {
      success: data?.success || false,
      message: data?.message || "Feed submitted successfully",
      feed: data?.feed || null,
    };
  } catch (error) {
    console.error("Submit Feed Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to submit feed. Please try again.",
    };
  }
};

// Approve a feed
export const approveFeedService = async (feedId) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Authentication token is missing.");

    const data = await clientAPI.approveFeed(feedId, token);

    return {
      success: data?.success || false,
      message: data?.message || "Feed approved successfully",
      feed: data?.feed || null,
    };
  } catch (error) {
    console.error("Approve Feed Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to approve feed. Please try again.",
    };
  }
};

// Export all services
const clientService = {
  submitFeedService,
  approveFeedService,
};

export default clientService;
