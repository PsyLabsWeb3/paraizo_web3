const settingsService = require('../services/settingsService');

const getStreamerSettings = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const settings = await settingsService.getStreamerSettings(walletAddress);
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveStreamerSettings = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const settings = req.body;
    
    // Validate required fields
    if (!settings.title && !settings.description && !settings.category) {
      return res.status(400).json({ error: 'At least one setting field is required' });
    }
    
    const updatedSettings = await settingsService.saveStreamerSettings(walletAddress, settings);
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getStreamerSettings,
  saveStreamerSettings
};