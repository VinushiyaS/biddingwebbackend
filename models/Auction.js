const mongoose = require('mongoose');

// Auction Schema
const auctionSchema = new mongoose.Schema({
  leaderEmail: {
    type: String,
    required: true
  },
  tournamentName: {
    type: String,
    required: true
  },
  teams: [
    {
      name: {
        type: String,
        required: true
      },
      bidPoints: {
        type: Number,
        required: true
      }, 
      image: {
        type: String,  // URL of the image
        required: false  // Optional, as the image may not always be provided
      },
      remainingBidPoints: {
        type: Number,
        required: true
      }
    }
  ],
  bidPointsPerTeam: {
    type: Number,
    required: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'  // reference the Player model
  }],
 
});

// Create the Auction model
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;