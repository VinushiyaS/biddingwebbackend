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
    const auctions = await auctionId.find().populate('players');
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

    const { players } = req.body; // Assuming players are sent as an array of player objects

    // Iterate over the players array, save each player, and push their ID to the auction
   
      // Assuming Player is a separate Mongoose model for player data
      const Player = require('../models/Player');
      const newPlayer = new Player(players); // Create a new player document
      console.log (newPlayer)
      const savedPlayer = await newPlayer.save(); // Save the player document to the database
    
    // Add the player IDs to the auction's players array
    auction.players.push(savedPlayer);

    await auction.save(); // Save the updated auction

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
      error: error.message,
    });
  }
};

// Get players in a specific auction
exports.getAuctionPlayers = async (req, res) => {
  try {
    const auctionId = req.params.id;
    const auction = await Auction.findById(auctionId).populate('players');

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found',
      });
    }

    res.status(200).json({
      success: true,
      players: auction.players, // This should contain the populated player data
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


