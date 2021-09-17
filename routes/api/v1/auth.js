const express = require('express');
const auth = require('../../../middleware/auth');
const authController = require('../../../controllers/auth.controller');

const router = express.Router();

/**
 * @method POST /api/v1/auth
 * @description Login a user
 * @access Public
 */
router.post('/login', authController.login);

/**
 * @method GET /api/v1/auth/user
 * @description Authenticates a jwt and loads the user
 * @access Public | Auth
 */
router.get('/user', auth, authController.loadUser);

/**
 * @method POST /api/v1/auth/register
 * @description Registers a user
 * @access Public
 */
router.post('/register', authController.register);

module.exports = router;
