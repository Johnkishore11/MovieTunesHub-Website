import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getTours = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/tours`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tours');
  }
};

const createTour = async (tourData) => {
  try {
    const response = await axios.post(`${API_URL}/api/tours`, tourData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating tour');
  }
};

const updateTour = async (tourId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/tours/${tourId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating tour');
  }
};

const deleteTour = async (tourId) => {
  try {
    await axios.delete(`${API_URL}/api/tours/${tourId}`);
  } catch (error) {
    throw new Error('Error deleting tour');
  }
};

export { getTours, createTour, updateTour, deleteTour };
