const supabase = require('../../db/supabase');

// Show service functions
const getAllShows = async ({ category, limit = 20, offset = 0 }) => {
  let query = supabase
    .from('shows')
    .select('*', { count: 'exact' })
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data: shows, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    shows: shows || [],
    pagination: {
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset),
      hasMore: parseInt(offset) + parseInt(limit) < count
    }
  };
};

const getLiveShows = async () => {
  const { data: shows, error } = await supabase
    .from('shows')
    .select('*')
    .eq('is_live', true);

  if (error) {
    throw new Error(error.message);
  }

  return shows || [];
};

const getShowById = async (showId) => {
  const { data: show, error } = await supabase
    .from('shows')
    .select('*')
    .eq('id', showId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return show;
};

const createShow = async (showData) => {
  const { data: show, error } = await supabase
    .from('shows')
    .insert([{
      ...showData,
      is_live: false,
      viewers: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return show;
};

const updateShow = async (showId, updateData) => {
  const { data: show, error } = await supabase
    .from('shows')
    .update({
      ...updateData,
      updated_at: new Date().toISOString()
    })
    .eq('id', showId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return show;
};

const deleteShow = async (showId) => {
  const { error } = await supabase
    .from('shows')
    .delete()
    .eq('id', showId);

  if (error) {
    throw new Error(error.message);
  }

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