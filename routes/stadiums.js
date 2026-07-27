const express = require('express');
const router = express.Router();
const stadiumsController = require('../controllers/stadiums');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', stadiumsController.getAllStadiums);
router.get('/:id', stadiumsController.getSingleStadium);
router.post('/', isAuthenticated, validation.validateStadium, stadiumsController.createStadium);
router.put('/:id', isAuthenticated, validation.validateStadium, stadiumsController.updateStadium);
router.delete('/:id', isAuthenticated, stadiumsController.deleteStadium);

module.exports = router;