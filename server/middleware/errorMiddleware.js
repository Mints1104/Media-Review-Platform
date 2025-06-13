// Middleware to handle requests to non-existent routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the next error-handling middleware
};

// General error handling middleware
const errorHandler = (err, req, res, next) => {
    // If status code is 200 (OK), but an error occurred, change to 500 (Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        // Only include stack trace in development mode for debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };