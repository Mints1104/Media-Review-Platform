const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController'); // Import controller functions

// @desc Register a new user
// @route POST /api/users/register
// @access Public
router.post('/register',registerUser);

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
router.post('/login',authUser);
module.exports = router;