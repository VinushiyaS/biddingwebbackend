const Auction = require('../models/Auction');

// Fetch all auctions
const getAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching auctions', error });
    }
};

// Create a new auction
const createAuction = async (req, res) => {
    try {
        const { leaderEmail, tournamentName, tournamentDate, teamsCount, totalPointsPerTeam, players } = req.body;

        const newAuction = new Auction({
            leaderEmail,
            tournamentName,
            tournamentDate,
            teamsCount,
            totalPointsPerTeam,
            players,
            image: req.file ? req.file.path : null, // Optional image upload handling
        });

        await newAuction.save();
        res.status(201).json(newAuction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create auction' });
    }
};

module.exports = { getAuctions, createAuction };
