const streamingIntegrationService = require('../services/streamingIntegrationService');

const getStreamerStatus = async (req, res) => {
  try {
    const { platform, identifier } = req.params;
    const status = await streamingIntegrationService.getStreamStatus(platform, identifier);
    res.json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStreamKey = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const streamKey = await streamingIntegrationService.getStreamKey(walletAddress);
    res.json({ streamKey });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getStreamerStatus,
  getStreamKey
};