const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

router.get('/', require('../middleware/verifyTokenWebhook'));

router.post('/', chatbotController.postWebhook);

module.exports = router;
