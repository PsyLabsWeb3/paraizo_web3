const express = require('express');
const router = express.Router();
const tipController = require('../app/controllers/tipController');

router.get('/', tipController.getTipsForStreamer);
router.post('/', tipController.sendTip);
router.get('/total/:streamerId', tipController.getTotalTips);

module.exports = router;