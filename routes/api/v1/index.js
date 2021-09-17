const router = require('express').Router();

router.use('/customers', require('./customers'));
router.use('/auth', require('./auth'));

module.exports = router;
