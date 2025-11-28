const analyticsService = require('../services/analyticsService');

const getCreatorAnalytics = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const analytics = await analyticsService.getCreatorAnalytics(walletAddress);
    res.json(analytics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTipAnalytics = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const tips = await analyticsService.getTipAnalytics(walletAddress);
    res.json(tips);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSessionAnalytics = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const sessions = await analyticsService.getSessionAnalytics(walletAddress);
    res.json(sessions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRealTimeAnalytics = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const realTimeData = await analyticsService.getRealTimeAnalytics(walletAddress);
    res.json(realTimeData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCreatorAnalytics,
  getTipAnalytics,
  getSessionAnalytics,
  getRealTimeAnalytics
};