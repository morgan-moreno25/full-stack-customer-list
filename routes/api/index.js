const express = require('express');

const customerRouter = require('./customers');
const userRouter = require('./users');

// Initialize base router
const router = express.Router();

// Add sub-routes
router.use('/customers', customerRouter);
router.use('/users', userRouter);


// Export base router
module.exports = router;