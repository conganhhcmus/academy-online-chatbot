const express = require('express');
const router = express.Router();
const chatbot = require('../services/chatbot');

router.get('/', require('../middleware/verifyTokenWebhook'));

router.post('/', chatbot.postWebhook);

module.exports = router;
