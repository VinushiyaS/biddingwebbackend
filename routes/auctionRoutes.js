const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

// Route to create a new auction
router.post('/create', auctionController.createAuction);

// Route to get all auctions
router.get('/', auctionController.getAllAuctions);

// Route to get details of a specific auction
router.get('/_id', auctionController.getAuctionDetails);

// Route to add players to an auction
router.post('/_id/add-players', auctionController.addPlayersToAuction);

// Route to get players in an auction
router.get('/_id/players', auctionController.getAuctionPlayers);

// Route to update team bid points in an auction
router.patch('/_id/update-bidpoints', auctionController.updateBidPoints);

module.exports = router;
