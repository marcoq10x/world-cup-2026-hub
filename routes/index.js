const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/matches', require('./matches'));
router.use('/stadiums', require('./stadiums'));
router.use('/teams', require('./teams'));
router.use('/users', require('./users'));

// GitHub OAuth Login Routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/api-docs');
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/api-docs');
  });
});

module.exports = router;