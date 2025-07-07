import React, { useEffect, useState, useCallback } from 'react';
import reviewService from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [keyword, setKeyword] = useState('');
    const [mediaTypeFilter, setMediaTypeFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchMediaTypeFilter, setSearchMediaTypeFilter] = useState('');
    const [searchRatingFilter, setSearchRatingFilter] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            //Pass filters as an object to the service
            const params = {};
            if (searchKeyword) params.keyword = searchKeyword;
            if (searchMediaTypeFilter) params.mediaType = searchMediaTypeFilter;
            if (searchRatingFilter) params.rating = searchRatingFilter;

            const data = await reviewService.getReviews(params);
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
    }, [searchKeyword, searchMediaTypeFilter, searchRatingFilter]); // Dependencies for useCallback


    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const onDelete = useCallback(async (reviewId) => {
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
    }, [user, navigate, fetchReviews]);

    const onEdit = useCallback((reviewId) => {
        navigate(`/edit-review/${reviewId}`);
    }, [navigate]);

    const handleSearchChange = (e) => setKeyword(e.target.value);
    const handleMediaTypeChange = (e) => setMediaTypeFilter(e.target.value);
    const handleRatingChange = (e) => setRatingFilter(e.target.value);

    const handleSearch = () => {
        setSearchKeyword(keyword);
        setSearchMediaTypeFilter(mediaTypeFilter);
        setSearchRatingFilter(ratingFilter);
    };

    const handleClearFilters = () => {
        setKeyword('');
        setMediaTypeFilter('');
        setRatingFilter('');
        setSearchKeyword('');
        setSearchMediaTypeFilter('');
        setSearchRatingFilter('');
    };


    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <h1>All Reviews</h1>
            <div className="filters-container">
                <div className="filters-header">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                {showFilters && (
                    <div className="filters-content">
                        <div className="filter-row">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title..."
                                value={keyword}
                                onChange={handleSearchChange}
                            />
                            <select className="form-control" value={mediaTypeFilter} onChange={handleMediaTypeChange}>
                                <option value="">All Types</option>
                                <option value="Game">Game</option>
                                <option value="Anime">Anime</option>
                                <option value="Manga">Manga</option>
                                <option value="Light Novel">Light Novel</option>
                                <option value="Movie">Movie</option>
                                <option value="TV Show">TV Show</option>
                                <option value="Book">Book</option>
                                <option value="Other">Other</option>
                            </select>
                            <select className="form-control" value={ratingFilter} onChange={handleRatingChange}>
                                <option value="">Min Rating</option>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>
                        <div className="filter-actions">
                            <button className="btn btn-primary" onClick={handleSearch}>
                                Search
                            </button>
                            <button className="btn btn-secondary" onClick={handleClearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {reviews.length === 0 ? (
                <p>No reviews found matching your criteria. Try adjusting filters.</p>
            ) : (
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
            )}
        </div>
    );
}


export default Home;