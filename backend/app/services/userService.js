// Mock data for demonstration
const users = [];
const shows = [];
const tips = [];
const streams = [];

// User service functions
const createUser = async (userData) => {
  // In a real app, this would interact with a database
  const user = {
    id: users.length + 1,
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(user);
  return user;
};

const authenticateUser = async (walletAddress) => {
  // In a real app, this would verify wallet signature and generate JWT
  const user = users.find(u => u.walletAddress === walletAddress);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Mock token generation (in real app, use JWT)
  return `mock_token_for_${walletAddress}`;
};

const getUserById = async (userId) => {
  const user = users.find(u => u.id === parseInt(userId));
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (userId, updateData) => {
  const userIndex = users.findIndex(u => u.id === parseInt(userId));
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  return users[userIndex];
};

module.exports = {
  createUser,
  authenticateUser,
  getUserById,
  updateUser
};