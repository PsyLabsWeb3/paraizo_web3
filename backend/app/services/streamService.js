// Mock data for demonstration
const streams = [];
const shows = []; // This would be from the show service in a real app

// Stream service functions
const getStreamStatus = async (streamerId) => {
  const stream = streams.find(s => s.streamerId === parseInt(streamerId) && s.isActive);
  return {
    isActive: !!stream,
    streamId: stream ? stream.id : null,
    viewers: stream ? stream.viewers : 0
  };
};

const startStream = async (streamData) => {
  const stream = {
    id: streams.length + 1,
    ...streamData,
    isActive: true,
    viewers: 0,
    startedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  streams.push(stream);
  return stream;
};

const endStream = async (streamId) => {
  const streamIndex = streams.findIndex(s => s.id === parseInt(streamId) && s.isActive);
  if (streamIndex === -1) {
    throw new Error('Active stream not found');
  }
  
  streams[streamIndex].isActive = false;
  streams[streamIndex].endedAt = new Date();
  streams[streamIndex].updatedAt = new Date();
  
  return true;
};

const getViewerCount = async (streamId) => {
  const stream = streams.find(s => s.id === parseInt(streamId));
  if (!stream || !stream.isActive) {
    throw new Error('Stream not found or not active');
  }
  
  return stream.viewers;
};

// Increment viewer count (simulated)
const addViewer = async (streamId) => {
  const stream = streams.find(s => s.id === parseInt(streamId));
  if (stream && stream.isActive) {
    stream.viewers += 1;
    stream.updatedAt = new Date();
  }
};

// Decrement viewer count (simulated)
const removeViewer = async (streamId) => {
  const stream = streams.find(s => s.id === parseInt(streamId));
  if (stream && stream.isActive && stream.viewers > 0) {
    stream.viewers -= 1;
    stream.updatedAt = new Date();
  }
};

module.exports = {
  getStreamStatus,
  startStream,
  endStream,
  getViewerCount,
  addViewer,
  removeViewer
};