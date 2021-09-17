const { Request, Response, NextFunction } = require('express');
const bcrypt = require('bcryptjs');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @description Loads a user from the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const loadUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(error);
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
		return res.status(400).json({ msg: 'Please enter all fields' });
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
					user: {
						id: validUser._id,
						name: validUser.name,
						email: validUser.email,
					},
				});
			} else {
				return res.status(400).json({ msg: 'Invalid credentials' });
			}
		} else {
			return res.status(400).json({ msg: 'User does not exist' });
		}
	} catch (error) {
		return res.status(500).json();
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
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	try {
		const userAlreadyExists = await User.findOne({ email });

		if (userAlreadyExists) {
			return res.status(400).json({ msg: 'User already exists' });
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

			return res.status(201).json({ token, user });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports = {
	login,
	loadUser,
	register,
};
