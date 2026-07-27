const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matches');
const validation = require('../middleware/validate');

router.get('/', matchesController.getAllMatches);
router.get('/:id', matchesController.getSingleMatch);
router.post('/', validation.validateMatch, matchesController.createMatch);
router.put('/:id', validation.validateMatch, matchesController.updateMatch);
router.delete('/:id', matchesController.deleteMatch);

module.exports = router;