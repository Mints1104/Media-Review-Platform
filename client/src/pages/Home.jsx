import React, { useEffect, useState } from 'react';
import reviewService from '../services/reviewService';

function Home() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await reviewService.getReviews();
                setReviews(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
                setError('Failed to load reviews. Please try again later.');
                setLoading(false);
            }
        };
        fetchReviews();

    }, []);

    if (loading) return <p>Loading Reviews...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (reviews.length === 0) return <p>No reviews found. Be the first to create one!</p>;
    return (
        <div>
            <h1>All Reviews</h1>
            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <h3>{review.mediaTitle}</h3>
                        <p>Type: {review.mediaType}</p>
                        <p>Rating: {review.rating}/5</p>
                        <p>{review.reviewText}</p>
                        <small>By: {review.user?.username || 'Unknown User'}</small>
                        <small> - {new Date(review.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;