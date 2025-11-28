const express = require('express');
const router = express.Router();
const streamingIntegrationController = require('../app/controllers/streamingIntegrationController');

// Get streamer status from various platforms
router.get('/status/:platform/:identifier', streamingIntegrationController.getStreamerStatus);

// Get stream key for OBS/streaming software
router.get('/stream-key/:walletAddress', streamingIntegrationController.getStreamKey);

module.exports = router;