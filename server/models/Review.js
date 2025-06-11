const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        mediaTitle: {
            type: String,
            required: true,
        },
        mediaType: {
            type: String,
            required: true,
            enum: ['Game','Anime','Manga','Light Novel']
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        reviewText: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;