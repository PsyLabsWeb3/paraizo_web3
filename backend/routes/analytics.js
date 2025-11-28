const express = require('express');
const router = express.Router();
const analyticsController = require('../app/controllers/analyticsController');

// Get creator analytics
router.get('/creator/:walletAddress', analyticsController.getCreatorAnalytics);

// Get tip analytics
router.get('/tips/:walletAddress', analyticsController.getTipAnalytics);

// Get session analytics
router.get('/sessions/:walletAddress', analyticsController.getSessionAnalytics);

// Get real-time analytics
router.get('/realtime/:walletAddress', analyticsController.getRealTimeAnalytics);

module.exports = router;