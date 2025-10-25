const supabase = require('../../db/supabase');
const jwt = require('jsonwebtoken');

// User service functions
const createUser = async (userData) => {
  const { walletAddress, username, email, name } = userData;
  
  // Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (existingUser) {
    throw new Error('User with this wallet address already exists');
  }

  // Insert new user
  const { data: user, error } = await supabase
    .from('users')
    .insert([{
      wallet_address: walletAddress,
      username,
      email,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

const authenticateUser = async (walletAddress) => {
  // Check if user exists
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (error || !user) {
    throw new Error('User not found');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, walletAddress: user.wallet_address },
    process.env.JWT_SECRET || 'fallback_jwt_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return token;
};

const getUserById = async (userId) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !user) {
    throw new Error('User not found');
  }

  return user;
};

const updateUser = async (userId, updateData) => {
  // Update user
  const { data: user, error } = await supabase
    .from('users')
    .update({
      ...updateData,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

module.exports = {
  createUser,
  authenticateUser,
  getUserById,
  updateUser
};