const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // e.g., 'succeeded' or 'failed'
    paymentIntentId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
