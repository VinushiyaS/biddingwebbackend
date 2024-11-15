const express = require('express');
const multer = require('multer');
const path = require('path');
const Auction = require('../models/Auction');  // Path to your Auction model

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Path to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  }
});

const upload = multer({ storage: storage });

// Endpoint to upload an image
router.post('/upload-image/:ObjectId', upload.single('image'), async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.ObjectId);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Store the image URL in the auction document
    auction.image = `/uploads/${req.file.filename}`;
    await auction.save();

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl: auction.image });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading image', error: err });
  }
});

module.exports = router;
