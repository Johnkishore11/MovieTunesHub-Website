import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getReviews = async (tourId) => {
  try {
    const response = await axios.get(`${API_URL}/api/reviews/${tourId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching reviews');
  }
};

const createReview = async (tourId, reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/api/reviews/${tourId}`, reviewData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating review');
  }
};

const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/reviews/${reviewId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating review');
  }
};

const deleteReview = async (reviewId) => {
  try {
    await axios.delete(`${API_URL}/api/reviews/${reviewId}`);
  } catch (error) {
    throw new Error('Error deleting review');
  }
};

export { getReviews, createReview, updateReview, deleteReview };
