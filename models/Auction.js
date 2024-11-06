// backend/models/Auction.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    number: Number,
    team: String,
    bidPoints: Number,
    profilePic: String,
});

const auctionSchema = new mongoose.Schema({
    leaderEmail: { type: String, required: true },
    tournamentName: String,
    tournamentDate: Date,
    teamsCount: Number,
    totalPointsPerTeam: Number,
    players: [playerSchema],
    isLive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Auction', auctionSchema);
