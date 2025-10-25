// Mock data for demonstration
const shows = [];
const tips = [];
const streams = [];

// Show service functions
const getAllShows = async ({ category, limit = 20, offset = 0 }) => {
  let filteredShows = shows;
  
  if (category && category !== 'all') {
    filteredShows = shows.filter(show => show.category === category);
  }
  
  const start = parseInt(offset);
  const end = start + parseInt(limit);
  const paginatedShows = filteredShows.slice(start, end);
  
  return {
    shows: paginatedShows,
    pagination: {
      total: filteredShows.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
      hasMore: end < filteredShows.length
    }
  };
};

const getLiveShows = async () => {
  // In a real app, this would filter for currently live shows
  return shows.filter(show => show.isLive === true);
};

const getShowById = async (showId) => {
  const show = shows.find(s => s.id === parseInt(showId));
  return show;
};

const createShow = async (showData) => {
  const show = {
    id: shows.length + 1,
    ...showData,
    isLive: false,
    viewers: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  shows.push(show);
  return show;
};

const updateShow = async (showId, updateData) => {
  const showIndex = shows.findIndex(s => s.id === parseInt(showId));
  if (showIndex === -1) {
    throw new Error('Show not found');
  }
  
  shows[showIndex] = {
    ...shows[showIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  return shows[showIndex];
};

const deleteShow = async (showId) => {
  const showIndex = shows.findIndex(s => s.id === parseInt(showId));
  if (showIndex === -1) {
    throw new Error('Show not found');
  }
  
  shows.splice(showIndex, 1);
  return true;
};

module.exports = {
  getAllShows,
  getLiveShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow
};