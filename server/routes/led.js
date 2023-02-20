const express = require('express');
const router = express.Router();

const ledController = require('../app/controllers/ledController');

router.get('/', ledController.index);

module.exports = router;