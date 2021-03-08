const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();


/**
 * @route POST api/users
 * @info Register a new user
 * @access Public
 */
router.post('/', userController.register);

module.exports = router;