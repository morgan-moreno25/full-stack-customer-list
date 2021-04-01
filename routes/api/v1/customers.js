const express = require('express');
const auth = require('../../middleware/auth');
const customerController = require('../../controllers/customer.controller');

const router = express.Router();

/**
 * @method GET /api/v1/customers
 * @description Gets all customers
 * @access Public
 */
router.get('/', customerController.getAllCustomers);

/**
 * @method POST /api/v1/customers
 * @descripion Creates a new customer
 * @access Public | Auth
 */
router.post('/', auth, customerController.createCustomer);

/**
 * @method PUT /api/v1/customers/:id
 * @description Updates a single customer
 * @access Public | Auth
 */
router.put('/:id', auth, customerController.updateCustomer);

/**
 * @method DELETE /api/v1/customers/:id
 * @description Deletes a single customer
 * @access Public | Auth
 */
router.delete('/:id', auth, customerController.deleteOneCustomer);

module.exports = router;
