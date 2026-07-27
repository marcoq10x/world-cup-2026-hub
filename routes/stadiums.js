const express = require('express');
const router = express.Router();
const stadiumsController = require('../controllers/stadiums');
const validation = require('../middleware/validate');

router.get('/', stadiumsController.getAllStadiums);
router.get('/:id', stadiumsController.getSingleStadium);
router.post('/', validation.validateStadium, stadiumsController.createStadium);
router.put('/:id', validation.validateStadium, stadiumsController.updateStadium);
router.delete('/:id', stadiumsController.deleteStadium);

module.exports = router;