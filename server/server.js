require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./config/db');

connectDB();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/',(req,res) => {
    res.send('API is running...');
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});