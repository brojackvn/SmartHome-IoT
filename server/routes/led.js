const express = require('express');
const router = express.Router();

const ledController = require('../controllers/ledController');

router.get('/', ledController.index);