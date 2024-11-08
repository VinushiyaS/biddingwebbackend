const express = require('express');
const router = express.Router();
const { register, loginUser, getUserByEmail } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', loginUser);
router.get('/user/:email', getUserByEmail)

module.exports = router; // This line is crucial
