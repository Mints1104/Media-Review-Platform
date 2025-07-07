import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reviewService from '../services/reviewService';

function CreateReview() {
    const [formData, setFormData] = useState({
        mediaTitle: '',
        mediaType: 'Game', // Default value
        rating: 1, // Default rating
        reviewText: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mediaTitle, mediaType, rating, reviewText } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;


        const reviewData = {
            mediaTitle,
            mediaType,
            rating: parseInt(rating), // Convert rating to a number
            reviewText,
        };

        setIsSubmitting(true);

        try {
            // We need the user's token from localStorage for protected routes
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.token) {
                console.error('User not logged in or token missing. Cannot create review.');
                navigate('/login'); // Redirect to login if no token
                return;
            }

            const createdReview = await reviewService.createReview(reviewData, user.token); // Call service
            console.log('Review created:', createdReview);
            setFormData({
                mediaTitle: '',
                mediaType: 'Game',
                rating: 1,
                reviewText: '',
            });
            navigate('/'); // Navigate back to home page to see new review
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message;
            console.error('Failed to create review:', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h1>Create New Review</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="mediaTitle">Media Title <span style={{ color: 'red' }}>*</span></label>
                    <input className="form-control"
                        type="text"
                        id="mediaTitle"
                        name="mediaTitle"
                        value={mediaTitle}
                        onChange={onChange}
                        placeholder="Enter the title of the media"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mediaType">Media Type <span style={{ color: 'red' }}>*</span></label>
                    <select
                        className="form-control"
                        id="mediaType"
                        name="mediaType"
                        value={mediaType}
                        onChange={onChange}
                        required
                    >
                        <option value="Game">Game</option>
                        <option value="Anime">Anime</option>
                        <option value="Manga">Manga</option>
                        <option value="Light Novel">Light Novel</option>
                        <option value="Movie">Movie</option>
                        <option value="TV Show">TV Show</option>
                        <option value="Book">Book</option>
                        <option value="Other">Other</option>

                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating (1-5): <span style={{ color: 'red' }}>*</span></label>
                    <input className="form-control"
                        type="number"
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={onChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reviewText">Review Text <span style={{ color: 'red' }}>*</span></label>
                    <textarea
                        className="form-control"
                        id="reviewText"
                        name="reviewText"
                        value={reviewText}
                        onChange={onChange}
                        placeholder="Write your review here"
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>

            </form>
        </div>
    );
}
export default CreateReview;