const User = require('../models/User');

// Get leaders and users
exports.getLeaders = async (req, res) => {
    try {
        const leaders = await User.find({ role: 'leader' });
        res.json(leaders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch leaders", error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

// Get stats
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalLeaders = await User.countDocuments({ role: 'leader' });
        res.json({ totalUsers, totalLeaders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stats", error });
    }
};

