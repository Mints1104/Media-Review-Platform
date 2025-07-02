const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc Register a new user
// @route POST /api/users/register
// @access Public

const registerUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400);
        throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }

    try {
        const userExists = await User.findOne({email});
        if(userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        if(user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400);
            throw new Error('Username or email already exists');
        }
        throw error;
    }
});

//@desc Authenticate a user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    
    //Check if user exists by email
    const user = await User.findOne({email});
   
    // Check if user exists and password matches
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


module.exports = {registerUser, authUser};