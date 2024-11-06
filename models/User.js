const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['viewer', 'leader', 'admin'], // Define allowed roles
        default: 'viewer',
    },
});

module.exports = mongoose.model('User', userSchema);
