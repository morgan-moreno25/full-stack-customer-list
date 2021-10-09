const { Request, Response, NextFunction } = require('express');
const bcrypt = require('bcryptjs');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../utils/CustomError');

/**
 * @description Loads a user from the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const loadUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return next(
				new CustomError(
					400,
					`User with id ${req.user.id} does not exist`
				)
			);
		}

		return res.status(200).json({ user });
	} catch (error) {
		return next(error);
	}
};
/**
 * @description Login a user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new CustomError(400, 'Please enter all fields'));
	}

	try {
		const validUser = await User.findOne({ email });

		if (validUser) {
			const isMatch = await bcrypt.compare(password, validUser.password);

			if (isMatch) {
				const token = await jwt.sign(
					{ id: validUser._id },
					config.SECRET,
					{ expiresIn: 3600 }
				);

				return res.status(200).json({
					token,
				});
			} else {
				return next(new CustomError(400, 'Invalid email or password'));
			}
		} else {
			return next(new CustomError(400, 'Invalid email or password'));
		}
	} catch (error) {
		return next(error);
	}
};

/**
 * @description Creates a new user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const register = async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return next(new CustomError(400, 'Please enter all fields'));
	}

	try {
		const userAlreadyExists = await User.findOne({ email });

		if (userAlreadyExists) {
			return next(new CustomError(400, 'Email is already in use'));
		} else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const newUser = new User({
				name,
				email,
				password: hash,
			});

			const user = await newUser.save();

			const token = await jwt.sign({ id: user._id }, config.SECRET, {
				expiresIn: 3600,
			});

			return res.status(201).json({ token });
		}
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	login,
	loadUser,
	register,
};
