const CustomerController = (() => {
    const Customer = require('../models/Customer');

    const create = async (req, res, next) => {
        const { firstName, lastName, phoneNumber } = req.body;

        if(!firstName || !lastName || !phoneNumber){
            return res.status(400).json({ msg: 'Please enter all fields' });
        };

        try{
            const newCustomer = new Customer({ firstName, lastName, phoneNumber });

            const customer = await newCustomer.save();

            return res.status(201).json(customer);
        }catch(error){
            return res.status(500).json(error);
        };
    };
    const deleteOne = async (req, res, next) => {
        try{
            const validCustomer = await Customer.findById(req.params.id);

            if(validCustomer){
                const customer = await Customer.findByIdAndDelete(req.params.id);

                return res.status(200).json({ msg: 'Deleted successfully', customer });
            }else{
                return res.status(400).json({ msg: 'Customer does not exist' });
            }
        }catch(error){
            return res.status(500).json(error);
        };
    };
    const getAll = async (req, res, next) => {
        try {
            const customers = await Customer.find({}).sort({ lastName: 1 });

            return res.status(200).json(customers);
        }catch(error){
            return res.status(500).json(error);
        };
    };
    const update = async (req, res, next) => {
        const { firstName, lastName, phoneNumber } = req.body;

        if(!firstName || !lastName || !phoneNumber){
            return res.status(400).json({ msg: 'Please enter all fields' });
        };

        try {
            const customerDoesExist = await Customer.findById(req.params.id);

            if(customerDoesExist){
                const customer = await Customer.findByIdAndUpdate(req.params.id, { $set: {
                    firstName,
                    lastName,
                    phoneNumber,
                }}, { new: true });

                return res.status(200).json(customer);
            }else{
                return res.status(400).json({ msg: 'Customer does not exist' });
            }
        }catch(error){
            return res.status(500).json(error);
        };
    };

    return {
        create,
        deleteOne,
        getAll,
        update,
    };
})();

module.exports = CustomerController;