const mongoose = require('mongoose');

// Define schema for Contact
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Validate email format
    },
    message: {
        type: String,
        required: true,
    },
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
