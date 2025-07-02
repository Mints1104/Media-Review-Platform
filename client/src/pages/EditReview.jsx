import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewService from '../services/reviewService';
import { useAuth } from '../context/AuthContext';


function EditReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        mediaTitle: '',
        mediaType: 'Game',
        rating: 1,
        reviewText: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mediaTitle, mediaType, rating, reviewText } = formData;

    useEffect(() => {
        const fetchReview = async () => {
            try {
                setLoading(true);
                setError(null);
                const review = await reviewService.getReviewById(id);

                // Check if fetched review is for the current user
                if (!user || review.user._id !== user._id) {
                    console.error('Not authorized to edit this review');
                    navigate('/');
                    return;
                }

                setFormData({
                    mediaTitle: review.mediaTitle,
                    mediaType: review.mediaType,
                    rating: review.rating,
                    reviewText: review.reviewText,
                });
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch review for editing:', err);
                const errorMessage = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : err.message;
                setError('Failed to fetch review for editing: ' + errorMessage);
                setLoading(false);
                //Redirect to home if error occurs
                if (err.response && err.response.status === 404) {
                    navigate('/');
                }
            }
        };
        if (user) {
            fetchReview();
        } else {
            setLoading(false);
        }
    }, [user, id, navigate]);

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
            rating: parseInt(rating),
            reviewText,
        };
        setIsSubmitting(true);

        try {
            if (!user || !user.token) {
                console.error('User not logged in or token missing. Cannot edit review.');
                navigate('/login');
                return;
            }

            const updatedReview = await reviewService.updateReview(id, reviewData, user.token);
            console.log('Review updated successfully:', updatedReview);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message;
            setError('Failed to update review: ' + errorMessage);
            console.error('Failed to update review:', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    if (loading) return <p>Loading review for editing...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <h1>Edit Review</h1>
            <p>Update your review details below.</p>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="mediaTitle">Media Title</label>
                    <input
                        className="form-control"
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
                    <label htmlFor="mediaType">Media Type</label>
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
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating (1-5):</label>
                    <input
                        className="form-control"
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
                    <label htmlFor="reviewText">Review Text</label>
                    <textarea
                        className="form-control"
                        id="reviewText"
                        name="reviewText"
                        value={reviewText}
                        onChange={onChange}
                        placeholder="Write your review here"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Update Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default EditReview;