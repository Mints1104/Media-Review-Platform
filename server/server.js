require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); // Import new middleware

connectDB();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

//Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));



app.get('/',(req,res) => {
    res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});