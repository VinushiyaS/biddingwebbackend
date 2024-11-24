// models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  bidAmount: { type: Number, default: 0 },
  team: { type: String, required: true },
  done: { type: Boolean, default: false },
  
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;