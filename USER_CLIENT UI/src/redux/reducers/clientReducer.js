import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  SUBMIT_FEED_REQUEST,
  SUBMIT_FEED_SUCCESS,
  SUBMIT_FEED_FAIL,
} from "../store/types";

const initialState = {
  loading: false,
  places: [],
  categories: [],
  categoriesLoading: false,
  success: false,
  error: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FEED_REQUEST:
      return {
        ...state,
        loading: true,
        success: false, // Reset success state on new submission
        error: null, // Clear previous errors
      };

    case SUBMIT_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        places: [...state.places, action.payload], // Append new place
        success: true,
      };

    case SUBMIT_FEED_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        categoriesLoading: true,
        error: null, // Clear errors when fetching starts
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesLoading: false,
        categories: action.payload, // Store fetched categories
      };

    case FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        categoriesLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default clientReducer;
