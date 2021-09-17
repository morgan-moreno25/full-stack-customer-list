const { Request, Response, NextFunction } = require('express');
const Customer = require('../models/Customer');
const CustomError = require('../utils/CustomError');

/**
 * @description Creates a new customer
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const createCustomer = async (req, res, next) => {
	const { firstName, lastName, phoneNumber } = req.body;

	if (!firstName || !lastName || !phoneNumber) {
		return next(new CustomError(400, 'Please enter alll fields'));
	}

	try {
		const newCustomer = new Customer({ firstName, lastName, phoneNumber });

		const customer = await newCustomer.save();

		return res.status(201).json(customer);
	} catch (error) {
		return next(error);
	}
};
/**
 * @description Deletes a single customer
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const deleteOneCustomer = async (req, res, next) => {
	try {
		const validCustomer = await Customer.findById(req.params.id);

		if (validCustomer) {
			const customer = await Customer.findByIdAndDelete(req.params.id);

			return res
				.status(200)
				.json({ msg: 'Deleted successfully', customer });
		} else {
			return next(new CustomError(400, 'User does not exist'));
		}
	} catch (error) {
		return next(error);
	}
};
/**
 * @description Gets all customers
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const getAllCustomers = async (req, res, next) => {
	try {
		const customers = await Customer.find({}).sort({ lastName: 1 });

		return res.status(200).json(customers);
	} catch (error) {
		return next(error);
	}
};
/**
 * @description Updates a single customer
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const updateCustomer = async (req, res, next) => {
	const { firstName, lastName, phoneNumber } = req.body;

	if (!firstName || !lastName || !phoneNumber) {
		return next(new CustomError(400, 'Please include all fields'));
	}

	try {
		const customer = await Customer.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					firstName,
					lastName,
					phoneNumber,
				},
			},
			{ new: true }
		);
		if (customer) {
			return res.status(200).json(customer);
		} else {
			return next(new CustomError(400, 'Customer does not exist'));
		}
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	createCustomer,
	deleteOneCustomer,
	getAllCustomers,
	updateCustomer,
};
