const tipService = require('../services/tipService');

const getTipsForStreamer = async (req, res) => {
  try {
    const { streamerId } = req.params;
    const tips = await tipService.getTipsForStreamer(streamerId);
    res.json(tips);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendTip = async (req, res) => {
  try {
    const { streamerId, amount, currency, txHash } = req.body;
    const userId = req.user.id; // Assuming user is authenticated
    
    const tip = await tipService.recordTip({
      fromUserId: userId,
      toUserId: streamerId,
      amount,
      currency,
      txHash
    });
    
    res.status(201).json(tip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTotalTips = async (req, res) => {
  try {
    const { streamerId } = req.params;
    const total = await tipService.getTotalTips(streamerId);
    res.json({ total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTipsForStreamer,
  sendTip,
  getTotalTips
};