const supabase = require('../../db/supabase');

// Tip service functions
const getTipsForStreamer = async (streamerId) => {
  const { data: tips, error } = await supabase
    .from('tips')
    .select('*')
    .eq('to_user_id', streamerId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return tips || [];
};

const recordTip = async (tipData) => {
  const { data: tip, error } = await supabase
    .from('tips')
    .insert([{
      ...tipData,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return tip;
};

const getTotalTips = async (streamerId) => {
  const { data: result, error } = await supabase
    .from('tips')
    .select('amount', { count: 'exact' })
    .eq('to_user_id', streamerId);

  if (error) {
    throw new Error(error.message);
  }

  if (!result || result.length === 0) {
    return 0;
  }

  const total = result.reduce((sum, tip) => {
    return sum + (parseFloat(tip.amount) || 0);
  }, 0);

  return total;
};

module.exports = {
  getTipsForStreamer,
  recordTip,
  getTotalTips
};