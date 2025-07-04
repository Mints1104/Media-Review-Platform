// client/src/pages/MyReviews.jsx
import React, { useEffect, useState } from 'react';
import reviewService from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyReviews = async () => {
            if (!user || !user.token) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await reviewService.getMyReviews(user.token);
                setReviews(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch my reviews:', err);
                const errorMessage = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : err.message;
                setError('Failed to load your reviews: ' + errorMessage);
                setLoading(false);
            }
        };

        fetchMyReviews();
    }, [user, navigate]); // Rerun if user changes


    const onDelete = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                if (!user || !user.token) {
                    console.error('User not logged in or token missing. Cannot delete review.');
                    navigate('/login');
                    return;
                }
                await reviewService.deleteReview(reviewId, user.token);
                console.log('Review deleted successfully');
                setReviews(reviews.filter(review => review._id !== reviewId));
            } catch (err) {
                const errorMessage = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : err.message;
                console.error('Failed to delete review:', errorMessage);
                setError('Failed to delete review: ' + errorMessage);
            }
        }
    };

    const onEdit = (reviewId) => {
        navigate(`/edit-review/${reviewId}`);
    };


    if (loading) return <p>Loading your reviews...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (reviews.length === 0) return <p>You haven't created any reviews yet.</p>;

    return (
        <div>
            <h1>My Reviews</h1>
            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <div>
                            <h3>{review.mediaTitle}</h3>
                            <p>Type: {review.mediaType}</p>
                            <p>Rating: {review.rating}/5</p>
                            <p>{review.reviewText}</p>
                            <small>By: {review.user?.username || 'Unknown User'}</small>
                            <small> - {new Date(review.createdAt).toLocaleDateString()}</small>
                        </div>
                        {user && review.user && user._id === review.user._id && (
                            <div className="review-actions">
                                <button className="btn btn-sm" onClick={() => onEdit(review._id)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => onDelete(review._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyReviews;