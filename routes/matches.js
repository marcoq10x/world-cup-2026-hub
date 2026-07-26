const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matches');

router.get('/', matchesController.getAllMatches);

module.exports = router;