const express = require('express');
const router = express.Router();
const { createReview,
     getReviews, 
     deleteReview,
     getReviewById,
     updateReview,
     getMyReviews
    } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
.post(protect,createReview)
.get(getReviews);

router.get('/myreviews', protect, getMyReviews);

router.route('/:id')
.get(getReviewById)
.delete(protect,deleteReview)
.put(protect,updateReview);


module.exports = router;