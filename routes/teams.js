const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getSingleTeam);
router.post('/', isAuthenticated, validation.validateTeam, teamsController.createTeam);
router.put('/:id', isAuthenticated, validation.validateTeam, teamsController.updateTeam);
router.delete('/:id', isAuthenticated, teamsController.deleteTeam);

module.exports = router;