const express = require('express');
const auth = require('../../middleware/auth');

const Customer = require('../../models/Customer');

const router = express.Router();

/**
 * @route GET api/customers
 * @info Gets all customer data
 * @access Public
 */
router.get('/', ( req, res ) => {
    Customer.find()
        .sort({ lastName: 1 })
        .then(customers => res.json(customers))
        .catch(err => console.log(err))
});

/**
 * @route POST api/cutsomers
 * @info Creates a new customer
 * @access Private
 */
router.post('/', ( req, res ) => {
    const { firstName, lastName, phoneNumber } = req.body;

    let newCustomer = new Customer({ firstName, lastName, phoneNumber });

    newCustomer.save()
        .then(customer => res.json(customer))
        .catch(err => console.log(err));
});

/**
 * @route PUT api/customers/:id
 * @info Updates a customers info
 * @access Private
 */
router.put('/:id', auth, ( req, res ) => {
    const { firstName, lastName, phoneNumber } = req.body;

    Customer.findByIdAndUpdate(req.params.id, { $set: { firstName, lastName, phoneNumber } })
        .then(customer => res.json({ _id: customer._id, firstName, lastName, phoneNumber, _v: customer._v }))
        .catch(err => res.status(404).json({ msg: "No customer with that id", err }))
});

/**
 * @route DELETE api/customers/:id
 * @info Deletes a customers info
 * @access Private
 */
router.delete('/:id', auth, ( req, res ) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(customer => res.json({ msg: "Deleted Successfully", customer }))
        .catch(err => res.status(404).json({ msg: "No customer with that id", err }))
});



module.exports = router;