const express = require('express');
const auth = require('../../middleware/auth');
const customerController = require('../../controllers/customer.controller');

const router = express.Router();

/**
 * @route GET api/customers
 * @info Gets all customer data
 * @access Public
 */
router.get('/', customerController.getAll);

/**
 * @route POST api/cutsomers
 * @info Creates a new customer
 * @access Private
 */
router.post('/', auth, customerController.create);

/**
 * @route PUT api/customers/:id
 * @info Updates a customers info
 * @access Private
 */
router.put('/:id', auth, customerController.update);

/**
 * @route DELETE api/customers/:id
 * @info Deletes a customers info
 * @access Private
 */
router.delete('/:id', auth, customerController.deleteOne);



module.exports = router;