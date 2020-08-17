const express = require('express');

const customerRouter = require('./customers');
const userRouter = require('./users');
const authRouter = require('./auth');

// Initialize base router
const router = express.Router();

// Add sub-routes
router.use('/customers', customerRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);


// Export base router
module.exports = router;