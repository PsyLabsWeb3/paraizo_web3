const express = require('express');
const router = express.Router();
const streamController = require('../app/controllers/streamController');

router.get('/status/:streamerId', streamController.getStreamStatus);
router.post('/start', streamController.startStream);
router.post('/end', streamController.endStream);
router.get('/viewers/:streamId', streamController.getViewers);

module.exports = router;