// controllers/auctionController.js
const Auction = require('../models/Auction');
const Player = require('../models/Player');

// Create a new auction
exports.createAuction = async (req, res) => {
  try {
    const { leaderEmail, tournamentName, teams, bidPointsPerTeam } = req.body;
    const newAuction = new Auction({ leaderEmail, tournamentName, teams, bidPointsPerTeam });
    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a player to an auction
exports.addPlayer = async (req, res) => {
  try {
    const id = req.params.id; // Retrieve auctionId from URL parameters (this is the ObjectId of the auction)
    const { name, photo, bidAmount, team, done } = req.body;

    // Create a new Player document and link it to the auction by using auctionId (ObjectId)
    const newPlayer = new Player({ name, photo, bidAmount, team, done, id });
    await newPlayer.save();

    // Update remaining bid points for the team if player is marked as done
    if (done) {
      // Find the auction by its ObjectId
      const auction = await Auction.findById(id); // Use auctionId as the ObjectId
      if (!auction) {
        return res.status(404).json({ message: 'Auction not found' });
      }

      const selectedTeam = auction.teams.find((t) => t.name === newPlayer.team);
      if (selectedTeam && selectedTeam.remainingBidPoints >= newPlayer.bidAmount) {
        selectedTeam.remainingBidPoints -= newPlayer.bidAmount;
        await auction.save();
      } else {
        return res.status(400).json({ message: 'Insufficient points for this team.' });
      }
    }

    // Add player reference to the auction's players array
    const auction = await Auction.findById(id); // Again, use auctionId to find the auction
    auction.players.push(newPlayer); // Add player to the auction's players array
    await auction.save();

    res.status(201).json(newPlayer); // Respond with the new player
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get auction details along with players
// exports.getAuctionDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const auction = await Auction.findById(id).populate('players');  // Populate the players
//     if (!auction) {
//       return res.status(404).json({ message: 'Auction not found' });
//     }
//     res.status(200).json(auction);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const mongoose = require('mongoose');

exports.getAuctionDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid auction ID format' });
    }

    // Find the auction by ObjectId
    const auction = await Auction.findById(id).populate('players');  // Populate the players

    // If auction not found, return 404
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Return auction details
    res.status(200).json(auction);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching auction details:', error);

    // Respond with the error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// // Get the player with the highest bid in an auction
// exports.getHighestBidPlayer = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const highestBidPlayer = await Player.find({ id })
//       .sort({ bidAmount: -1 })
//       .limit(1);
//     res.status(200).json(highestBidPlayer[0]);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Get the player with the highest bid in an auction
// Get the player with the highest bid in an auction

// Get the player with the highest bid in an auction

exports.getHighestBidPlayer = async (req, res) => {
  try {
    const { id } = req.params; // auctionId from the URL

    // Ensure the id is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid auction ID format' });
    }

    // Convert the auctionId to ObjectId
    const auctionObjectId = new mongoose.Types.ObjectId(id);

    // Find players whose auctionId matches the given auction ID and sort by bidAmount in descending order
    const highestBidPlayer = await Player.find({ auctionId: auctionObjectId })
      .sort({ bidAmount: -1 }) // Sort by bidAmount in descending order
      .limit(1); // Only retrieve the player with the highest bid

    // Check if any players exist in this auction
    if (highestBidPlayer.length === 0) {
      return res.status(404).json({ message: 'No players found in this auction' });
    }

    // Return the player with the highest bid
    res.status(200).json(highestBidPlayer[0]);
  } catch (error) {
    // General error handling
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

