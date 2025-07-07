import axios from 'axios';

const API_URL = 'https://media-review-backend-hutb.onrender.com/api/reviews/';

//Get all reviews
const getReviews = async (params = {}) => {
    //Construct query string from params
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;
    const response = await axios.get(url);
    return response.data;
};

const getReviewById = async(reviewId) => {
    const response = await axios.get(API_URL + reviewId);
    return response.data;
};

const getMyReviews = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + 'myreviews', config);
    return response.data;
};

const createReview = async(reviewData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, reviewData, config);
    return response.data;
};

const updateReview = async(reviewId, reviewData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + reviewId, reviewData, config);
    return response.data;
};

const deleteReview = async(reviewId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
        const response = await axios.delete(API_URL + reviewId, config);
        return response.data;
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