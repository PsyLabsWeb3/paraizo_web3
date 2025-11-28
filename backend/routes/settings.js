const express = require('express');
const router = express.Router();
const settingsController = require('../app/controllers/settingsController');

// Get streamer settings
router.get('/streamer/:walletAddress', settingsController.getStreamerSettings);

// Save streamer settings
router.post('/streamer/:walletAddress', settingsController.saveStreamerSettings);

module.exports = router;