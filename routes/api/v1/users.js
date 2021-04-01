const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

/**
 * @method POST /api/v1/users
 * @description Creates a new user
 * @access Public
 */
router.post('/', userController.register);

module.exports = router;
