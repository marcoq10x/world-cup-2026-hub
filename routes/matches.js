const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matches');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', matchesController.getAllMatches);
router.get('/:id', matchesController.getSingleMatch);
router.post('/', isAuthenticated, validation.validateMatch, matchesController.createMatch);
router.put('/:id', isAuthenticated, validation.validateMatch, matchesController.updateMatch);
router.delete('/:id', isAuthenticated, matchesController.deleteMatch);

module.exports = router;