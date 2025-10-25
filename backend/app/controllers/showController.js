const showService = require('../services/showService');

const getAllShows = async (req, res) => {
  try {
    const { category, limit, offset } = req.query;
    const shows = await showService.getAllShows({ category, limit, offset });
    res.json(shows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLiveShows = async (req, res) => {
  try {
    const shows = await showService.getLiveShows();
    res.json(shows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await showService.getShowById(req.params.id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    res.json(show);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createShow = async (req, res) => {
  try {
    const { title, description, category, thumbnail, youtubeUrl } = req.body;
    const userId = req.user.id; // Assuming user is authenticated
    
    const show = await showService.createShow({
      title,
      description,
      category,
      thumbnail,
      youtubeUrl,
      userId
    });
    
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateShow = async (req, res) => {
  try {
    const show = await showService.updateShow(req.params.id, req.body);
    res.json(show);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteShow = async (req, res) => {
  try {
    await showService.deleteShow(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllShows,
  getLiveShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow
};