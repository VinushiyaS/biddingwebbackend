const express = require('express');
const router = express.Router();
const { submitContactForm, getAllContacts } = require('../controllers/contactController');

// Route to handle contact form submission
router.post('/contact', submitContactForm);
router.get('/contact', getAllContacts);  // New GET route to fetch all submissions

module.exports = router;
