const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model('Leader', leaderSchema);
