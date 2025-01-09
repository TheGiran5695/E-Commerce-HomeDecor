const express = require('express');
const { isAuthenticatedUser } = require('../middleWare/auth'); // Import the middleware

const protectedRoute = express.Router();

// Example of a protected route
protectedRoute.get('/protected-route', isAuthenticatedUser, (req, res) => {
    res.status(200).json({ message: `Welcome user ${req.user.id}` });
});

module.exports = protectedRoute;
