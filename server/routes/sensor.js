const express = require('express');
const router = express.Router();

const sensorController = require('../app/controllers/sensorController');

router.get('/', sensorController.index);

module.exports = router;