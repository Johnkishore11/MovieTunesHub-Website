import { SUBMIT_FEED_SUCCESS, SUBMIT_FEED_FAIL, APPROVE_FEED_SUCCESS, APPROVE_FEED_FAIL } from "../store/types";
import clientService from "../../services/clientService";

// Submit Client Feed
export const submitClientFeed = (feedData) => async (dispatch) => {
  try {
    const response = await clientService.submitFeed(feedData);
    if (!response?.success) throw new Error(response.message);

    dispatch({ type: SUBMIT_FEED_SUCCESS, payload: response });
    return { success: true, message: "Feed submitted successfully!" };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Failed to submit feed.";
    dispatch({ type: SUBMIT_FEED_FAIL, payload: errorMessage });
    return { success: false, message: errorMessage };
  }
};

// Approve Client Feed (if applicable for admin/client verification)
export const approveFeed = (feedId) => async (dispatch) => {
  try {
    const response = await clientService.approveFeed(feedId);
    if (!response?.success) throw new Error(response.message);

    dispatch({ type: APPROVE_FEED_SUCCESS, payload: response });
    return { success: true, message: "Feed approved successfully!" };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Failed to approve feed.";
    dispatch({ type: APPROVE_FEED_FAIL, payload: errorMessage });
    return { success: false, message: errorMessage };
  }
};
