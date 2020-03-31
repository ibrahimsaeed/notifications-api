const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

router.get('/',notificationController.getAllNotification);

router.post('/send',notificationController.createNotification);

module.exports = router;