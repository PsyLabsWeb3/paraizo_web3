// Mock data for demonstration
const tips = [];
const users = []; // This would come from the database in a real app

// Tip service functions
const getTipsForStreamer = async (streamerId) => {
  return tips.filter(tip => tip.toUserId === parseInt(streamerId));
};

const recordTip = async (tipData) => {
  const tip = {
    id: tips.length + 1,
    ...tipData,
    createdAt: new Date()
  };
  
  tips.push(tip);
  return tip;
};

const getTotalTips = async (streamerId) => {
  const streamerTips = tips.filter(tip => tip.toUserId === parseInt(streamerId));
  const total = streamerTips.reduce((sum, tip) => {
    return sum + parseFloat(tip.amount);
  }, 0);
  
  return total;
};

module.exports = {
  getTipsForStreamer,
  recordTip,
  getTotalTips
};