import axios from 'axios';
import API_BASE_URL from './api'; 


const REVIEW_API_URL = `${API_BASE_URL}/api/reviews/`; 


const getReviews = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${REVIEW_API_URL}${queryString ? `?${queryString}` : ''}`; 
  const response = await axios.get(url);
  return response.data;
};

const getReviewById = async (id) => {
  const response = await axios.get(REVIEW_API_URL + id); 
  return response.data;
};

const createReview = async (reviewData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}`, }, };
  const response = await axios.post(REVIEW_API_URL, reviewData, config); 
};

const updateReview = async (reviewId, reviewData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}`, }, };
  const response = await axios.put(REVIEW_API_URL + reviewId, reviewData, config); 
  return response.data;
};

const deleteReview = async (reviewId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}`, }, };
  const response = await axios.delete(REVIEW_API_URL + reviewId, config); 
  return response.data;
};

const getMyReviews = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}`, }, };
  const response = await axios.get(REVIEW_API_URL + 'myreviews', config); 
};

const reviewService = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
};

export default reviewService;