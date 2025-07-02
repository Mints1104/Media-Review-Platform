import axios from 'axios';

const API_URL = '/api/reviews/';

//Get all reviews
const getReviews = async () => {
    const response = await axios.get(API_URL);
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
    createReview,
    deleteReview,
};

export default reviewService;