const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');

// Create a payment intent
exports.createPaymentIntent = async (req, res) => {
    const { name, email, amount } = req.body;

    try {
        console.log('Currency:', 'inr'); // Check if the currency is passed correctly

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe works with cents
            currency: 'inr',
            payment_method_types: ['card'],
            metadata: { name, email },
        });

        const payment = new Payment({
            name,
            email,
            amount,
            status: 'paid',
            paymentIntentId: paymentIntent.id,
        });
        await payment.save();

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.log(error); // Log error details for more insights
        res.status(500).json({ message: 'Payment initiation failed', error: error.message });
    }
};

// Confirm payment status
exports.updatePaymentStatus = async (req, res) => {
    const { paymentIntentId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        const payment = await Payment.findOneAndUpdate(
            { paymentIntentId },
            { status: paymentIntent.status },
            { new: true }
        );

        res.status(200).json({ message: 'Payment status updated', payment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update payment status', error: error.message });
    }
};

// Get all payments (for admin dashboard)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
    }
};
