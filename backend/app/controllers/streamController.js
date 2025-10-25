const streamService = require('../services/streamService');

const getStreamStatus = async (req, res) => {
  try {
    const { streamerId } = req.params;
    const status = await streamService.getStreamStatus(streamerId);
    res.json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const startStream = async (req, res) => {
  try {
    const { streamerId, streamKey, title, description, category } = req.body;
    const stream = await streamService.startStream({
      streamerId,
      streamKey,
      title,
      description,
      category
    });
    res.status(201).json(stream);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const endStream = async (req, res) => {
  try {
    const { streamId } = req.body;
    await streamService.endStream(streamId);
    res.json({ message: 'Stream ended successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getViewers = async (req, res) => {
  try {
    const { streamId } = req.params;
    const viewerCount = await streamService.getViewerCount(streamId);
    res.json({ viewerCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getStreamStatus,
  startStream,
  endStream,
  getViewers
};