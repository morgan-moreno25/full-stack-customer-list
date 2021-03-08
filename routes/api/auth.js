const express = require('express');
const auth = require('../../middleware/auth');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

/**
 * @route POST api/auth
 * @info Authorize a user
 * @access Public
 */
router.post('/', authController.login);

/**
 * @route GET api/auth/user
 * @info Get user data
 * @access Private
 */
router.get('/user', auth, authController.loadUser);

module.exports = router;