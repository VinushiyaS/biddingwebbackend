const express = require('express');

const authMiddleware = (req, res, next) => {
    console.log('Middleware is running!');
    next(); // Call the next middleware or route handler
};

module.exports = authMiddleware; // Exporting middleware function
