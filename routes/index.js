const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/matches', require('./matches'));
router.use('/stadiums', require('./stadiums'));
router.use('/teams', require('./teams'));
router.use('/users', require('./users'));

module.exports = router;