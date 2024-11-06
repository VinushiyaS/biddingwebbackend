const express = require('express');
const {
    createPaymentIntent,
    updatePaymentStatus,
    getAllPayments,
} = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/update-payment-status', updatePaymentStatus);
router.get('/all-payments', getAllPayments); // Admin route to view all payments

module.exports = router;
