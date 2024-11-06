const mongoose = require('mongoose');

// Player Schema as a subdocument
const playerSchema = new mongoose.Schema({
    name: String,
    number: Number,
    team: String,
    bidPoints: Number,
    profilePic: String,
});

// Auction Schema
const auctionSchema = new mongoose.Schema({
    leaderEmail: { type: String, required: true },
    tournamentName: String,
    tournamentDate: Date,
    teamsCount: Number,
    totalPointsPerTeam: Number,
    players: [playerSchema],
    isLive: { type: Boolean, default: true },
    image: String, // Image for the auction (optional)
});

module.exports = mongoose.model('Auction', auctionSchema);
