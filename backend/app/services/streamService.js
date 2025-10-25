const supabase = require('../../db/supabase');

// Stream service functions
const getStreamStatus = async (streamerId) => {
  const { data: stream, error } = await supabase
    .from('streams')
    .select('*')
    .eq('streamer_id', streamerId)
    .eq('is_active', true)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    throw new Error(error.message);
  }

  return {
    isActive: !!stream,
    streamId: stream ? stream.id : null,
    viewers: stream ? stream.viewers : 0
  };
};

const startStream = async (streamData) => {
  const { data: stream, error } = await supabase
    .from('streams')
    .insert([{
      ...streamData,
      is_active: true,
      viewers: 0,
      started_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return stream;
};

const endStream = async (streamId) => {
  const { error } = await supabase
    .from('streams')
    .update({
      is_active: false,
      ended_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', streamId)
    .eq('is_active', true);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

const getViewerCount = async (streamId) => {
  const { data: stream, error } = await supabase
    .from('streams')
    .select('viewers')
    .eq('id', streamId)
    .eq('is_active', true)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!stream) {
    throw new Error('Stream not found or not active');
  }

  return stream.viewers;
};

// Increment viewer count
const updateViewerCount = async (streamId, newViewerCount) => {
  const { data: stream, error } = await supabase
    .from('streams')
    .update({
      viewers: newViewerCount,
      updated_at: new Date().toISOString()
    })
    .eq('id', streamId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return stream;
};

module.exports = {
  getStreamStatus,
  startStream,
  endStream,
  getViewerCount,
  updateViewerCount
};