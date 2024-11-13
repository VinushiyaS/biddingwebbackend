const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

// Route to create a new auction
router.post('/', auctionController.createAuction);

// Route to add a player to an auction
router.post('/auction/:id/player', auctionController.addPlayer);

// Route to get auction details
router.get('/auction/:id', auctionController.getAuctionDetails);

// Route to get the highest bid player in an auction
router.get('/auction/highest/:id', auctionController.getHighestBidPlayer);

module.exports = router;
