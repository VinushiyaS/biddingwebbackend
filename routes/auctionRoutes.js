// routes/auctions.js or similar
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadConfig');
const { createAuction } = require('../controllers/auctionController');

router.post('/create-auction', upload.single('image'), createAuction);

router.get('/auctions/leader/:leaderId', async (req, res) => {
    const leaderId = req.params.leaderId;
    // Fetch auction data for the specific leaderId from the database
    res.json([]); // Replace with actual query results
});

module.exports = router;
