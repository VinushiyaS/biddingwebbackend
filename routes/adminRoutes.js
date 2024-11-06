const express = require('express');
const {
    getLeaders,
    getUsers,
    getStats,
  
} = require('../controllers/adminController');

const router = express.Router();

router.get('/leaders', getLeaders);
router.get('/users', getUsers);
router.get('/stats', getStats);


module.exports = router;
