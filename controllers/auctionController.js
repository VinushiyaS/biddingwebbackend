const Auction = require('../models/Auction');
const Player = require('../models/Player');

// Create a new auction
exports.createAuction = async (req, res) => {
  try {
    const { leaderEmail, tournamentName, bidPointsPerTeam, teams } = req.body;

    const newAuction = new Auction({
      leaderEmail,
      tournamentName,
      bidPointsPerTeam,
      teams,
    });

    await newAuction.save();
    res.status(201).json({
      success: true,
      message: 'Auction created successfully!',
      auction: newAuction,
    });
  } catch (error) {
    console.error('Error creating auction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create auction',
    });
  }
};

// Get all auctions
exports.getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate('players');
    res.status(200).json({
      success: true,
      auctions,
    });
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch auctions',
    });
  }
};

// Get details of a specific auction
exports.getAuctionDetails = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate('players');

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found',
      });
    }

    res.status(200).json({
      success: true,
      auction,
    });
  } catch (error) {
    console.error('Error fetching auction details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch auction details',
    });
  }
};

// Add players to an auction
exports.addPlayersToAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found',
      });
    }

    // Assuming players are sent in the body as an array of player IDs
    const { playerIds } = req.body;

    // Fetch players by IDs and add them to the auction
    const players = await Player.find({ '_id': { $in: playerIds } });

    // Add players to the auction
    auction.players.push(...players);

    await auction.save();
    res.status(200).json({
      success: true,
      message: 'Players added to the auction successfully!',
      auction,
    });
  } catch (error) {
    console.error('Error adding players to auction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add players to auction',
    });
  }
};

// Get players in a specific auction
exports.getAuctionPlayers = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate('players');

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found',
      });
    }

    res.status(200).json({
      success: true,
      players: auction.players,
    });
  } catch (error) {
    console.error('Error fetching players for auction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch players for auction',
    });
  }
};

// Update bid points for a team in the auction
exports.updateBidPoints = async (req, res) => {
  try {
    const { teamName, bidPoints } = req.body;

    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found',
      });
    }

    // Find the team and update the bid points
    const team = auction.teams.find((team) => team.name === teamName);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    team.bidPoints = bidPoints;
    team.remainingBidPoints = bidPoints; // Reset remaining bid points to the updated bid points value

    await auction.save();
    res.status(200).json({
      success: true,
      message: 'Bid points updated successfully',
      auction,
    });
  } catch (error) {
    console.error('Error updating bid points:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update bid points',
    });
  }
};


