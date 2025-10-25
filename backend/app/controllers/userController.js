const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const { walletAddress, username, email, name } = req.body;
    const user = await userService.createUser({ walletAddress, username, email, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const token = await userService.authenticateUser(walletAddress);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUser(req.user.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};