const express = require('express');
const router = express.Router();
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (requires token)
router.post('/', protect, createReview);

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
router.get('/', getReviews);

// --- Add this line ---
// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
router.delete('/:id', protect, deleteReview); // Use protect middleware here!
// ---------------------

module.exports = router;