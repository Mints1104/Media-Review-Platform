const express = require('express');
const router = express.Router();
const { createReview,
     getReviews, 
     deleteReview,
     getReviewById,
     updateReview
    } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
.post(protect,createReview)
.get(getReviews);

router.route('/:id')
.get(getReviewById)
.delete(protect,deleteReview)
.put(protect,updateReview);


module.exports = router;