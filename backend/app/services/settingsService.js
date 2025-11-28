const db = require('../../db/connection');

// Settings service functions
const getStreamerSettings = async (walletAddress) => {
  try {
    const query = `
      SELECT * FROM streamer_settings
      WHERE wallet_address = $1
    `;
    const result = await db.query(query, [walletAddress]);

    if (result.rows.length === 0) {
      // Return default settings if none exist
      return {
        wallet_address: walletAddress,
        title: '',
        description: '',
        category: '',
        tags: '',
        youtube_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveStreamerSettings = async (walletAddress, settings) => {
  try {
    // Check if settings already exist
    const checkQuery = `
      SELECT * FROM streamer_settings
      WHERE wallet_address = $1
    `;
    const checkResult = await db.query(checkQuery, [walletAddress]);

    if (checkResult.rows.length > 0) {
      // Update existing settings
      const updateQuery = `
        UPDATE streamer_settings
        SET title = $1, description = $2, category = $3, tags = $4, youtube_url = $5, updated_at = $6
        WHERE wallet_address = $7
        RETURNING *
      `;
      const result = await db.query(updateQuery, [
        settings.title,
        settings.description,
        settings.category,
        settings.tags,
        settings.youtube_url,
        new Date().toISOString(),
        walletAddress
      ]);
      return result.rows[0];
    } else {
      // Insert new settings
      const insertQuery = `
        INSERT INTO streamer_settings (wallet_address, title, description, category, tags, youtube_url, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const result = await db.query(insertQuery, [
        walletAddress,
        settings.title,
        settings.description,
        settings.category,
        settings.tags,
        settings.youtube_url,
        new Date().toISOString(),
        new Date().toISOString()
      ]);
      return result.rows[0];
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getStreamerSettings,
  saveStreamerSettings
};