const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');
const validation = require('../middleware/validate');

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getSingleTeam);
router.post('/', validation.validateTeam, teamsController.createTeam);
router.put('/:id', validation.validateTeam, teamsController.updateTeam);
router.delete('/:id', teamsController.deleteTeam);

module.exports = router;