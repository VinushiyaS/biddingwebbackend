// controllers/auctionController.js
const Auction = require('../models/Auction');

// const createAuction = async (req, res) => {
//     try {
//         const { tournamentName, tournamentDate, numTeams, totalPoints } = req.body;
//         const imagePath = req.file ? req.file.path : '';

//         const newAuction = new Auction({
//             tournamentName,
//             tournamentDate,
//             numTeams,
//             totalPoints,
//             image: imagePath, // Save file path in the database
//         });

//         await newAuction.save();
//         res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create auction' });
//     }
// };

const createAuction = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newAuction = new Auction({
      title,
      description,
      image: req.file ? req.file.path : null, // If you are uploading an image
    });
    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create auction' });
  }
};

module.exports = { createAuction };


module.exports = { createAuction };
