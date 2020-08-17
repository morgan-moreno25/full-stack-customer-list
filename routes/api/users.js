const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../../models/User');

/**
 * @route POST api/users
 * @info Register a new user
 * @access Public
 */
router.post('/', ( req, res ) => {
    const { name, email, password } = req.body;

    // Make sure all fields were entered
    if( !name || !email || !password ){
        return res.status(400).json({ msg: "Please enter all fields" });
    };

    // Make sure user doesn't already exist
    User.findOne({ email: email })
        .then(user => {
            // If user already exists, respond accordingly
            if(user) return res.status(400).json({ msg: "User already exists" });

            // Create new user object
            const newUser = new User({ name, email, password });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token: token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                    }
                                });
                            });
                        });
                });
            });

        });

});

module.exports = router;