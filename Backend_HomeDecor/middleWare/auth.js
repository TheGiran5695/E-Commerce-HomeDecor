const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure the path to the User model is correct

const isAuthenticatedUser = async (req, res, next) => {

    console.log('Request Headers:', req.headers);  // Log headers

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Authorization token is required' });
    }

    const token = authorization.split(' ')[1]; // Extract the token part

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in .env
        req.user = await User.findById(decoded.id); // Attach user information to the request
        next(); // Allow the request to proceed
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { isAuthenticatedUser };

