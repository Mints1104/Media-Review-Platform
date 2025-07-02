// client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import reviewService from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchReviews = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await reviewService.getReviews();
            setReviews(data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message;
            setError('Failed to load reviews: ' + errorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const onDelete = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                if (!user || !user.token) {
                    console.error('User not logged in or token missing. Cannot delete review.');
                    navigate('/login');
                    return;
                }
                // Call the service to delete
                await reviewService.deleteReview(reviewId, user.token);
                console.log('Review deleted successfully');
                // Refetch reviews to update the list
                fetchReviews();
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

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (reviews.length === 0) return <p>No reviews found. Be the first to create one!</p>;

    return (
        <div>
            <h1>All Reviews</h1>
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

export default Home;