const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadConfig'); // Assuming you have a middleware for file uploads
const { getAuctions, createAuction } = require('../controllers/auctionController');

// Route for creating a new auction (with optional image upload)
router.post('/create-auction', upload.single('image'), createAuction);

// Route to fetch auctions by leader ID
router.get('/leader/:leaderEmail', async (req, res) => {
    const leaderEmail = req.params.leaderEmail;
    try {
        const auctions = await Auction.find({ leaderEmail });
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching auctions for the leader', error });
    }
});

router.get('/', getAuctions); // Route to fetch all auctions

module.exports = router;
