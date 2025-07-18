const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const User = require('../models/User'); 

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
    const { mediaTitle, mediaType, rating, reviewText } = req.body;

    // The 'protect' middleware attached the user to req.user
    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
    }

    if (!mediaTitle || !mediaType || !rating || !reviewText) {
        res.status(400);
        throw new Error('Please add all required fields: mediaTitle, mediaType, rating, reviewText');
    }

    const review = await Review.create({
        user: req.user._id, // Assign the logged-in user's ID
        mediaTitle,
        mediaType,
        rating,
        reviewText,
    });

    res.status(201).json(review);
});

// @desc    Get all reviews (with optional search and filter)
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword? {
        mediaTitle: {
            $regex: req.query.keyword, // regex is used to search for keyword in  mediaTitle field
            $options: 'i',
        },
    } : {}; // if no keyword, then no filter

    const mediaType = req.query.mediaType? {
        mediaType: req.query.mediaType
    }: {};
    const rating = req.query.rating? {
        rating: {$gte : Number(req.query.rating)} // filter by min rating (gte = greater than or equal to)
    }: {};
    const filters = {...keyword,...mediaType,...rating};
    //find reviews based on combined filters

    const reviews = await Review.find(filters).populate('user', 'username');
    res.status(200).json(reviews);
    
});

//@desc Get reviews for logged-in user
//@route GET /api/reviews/myreviews
//@access Private
const getMyReviews = asyncHandler(async (req,res) => {
    //Find reviews where the 'user' field matches the logged in user's ID
    const reviews = await Review.find({user: req.user._id}).populate('user', 'username');
    res.status(200).json(reviews);
});

// @desc Get single review by ID
// @route GET /api/reviews/:id
// @access Public

const getReviewById = asyncHandler(async (req,res) => {
    const review = await Review.findById(req.params.id).populate('user', 'username');

    if(review) {
        res.status(200).json(review);
    } else {
        res.status(404);
        throw new Error('Review not found');
        }
});

//@desc Update a review
//@route PUT /api/reviews/:id
//@access Private

const updateReview = asyncHandler(async (req,res) => {
    const {mediaTitle, mediaType, rating,reviewText} = req.body;
    const review = await Review.findById(req.params.id);

    if(!review) {
        res.status(404);
        throw new Error('Review not found');
    }

    if(review.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this review');
    }

    //Update fields if provided in the request body

    review.mediaTitle = mediaTitle || review.mediaTitle;
    review.mediaType = mediaType || review.mediaType;
    review.rating = rating || review.rating;
    review.reviewText = reviewText || review.reviewText;

    const updatedReview = await review.save();
    res.status(200).json(updatedReview)
})



// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        res.status(404); 
        throw new Error('Review not found');
    }

    // Check if the user making the request is the owner of the review
    // review.user is an ObjectId, req.user._id is also an ObjectId
    // We need to convert both to strings for a proper comparison
    if (review.user.toString() !== req.user._id.toString()) {
        res.status(401); 
        throw new Error('Not authorized to delete this review');
    }

    await Review.deleteOne({ _id: req.params.id }); 
    res.status(200).json({ message: 'Review removed' });
});

module.exports = {
    createReview,
    getReviews,
    deleteReview,
    getReviewById,
    updateReview,
    getMyReviews,
};