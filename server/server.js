require('dotenv').config(); 
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); 
const cors = require('cors');
connectDB();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'https://media-review-platform.vercel.app', // ONLY allow your Vercel frontend URL
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));
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