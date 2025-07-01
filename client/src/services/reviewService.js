import axios from 'axios';

const API_URL = '/api/reviews/';

//Get all reviews
const getReviews = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const reviewService = {
    getReviews,
};

export default reviewService;