const UserController = (() => {
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const config = require('../utils/config');
    const User = require('../models/User');

    const register = async (req, res, next) => {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ msg: 'Please enter all fields' });
        };

        try{
            const userAlreadyExists = await User.findOne({ username });

            if(userAlreadyExists){
                return res.status(400).json({ msg: 'User already exists' });
            }else{
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                const newUser = new User({
                    name,
                    email,
                    password: hash,
                });

                const user = await newUser.save();

                const token = await jwt.sign({ id: user._id }, config.SECRET, { expiresIn: 3600 });

                return res.status(201).json({ token, user });
            };
        }catch(error){
            return res.status(500).json(error);
        };
    };

    return {
        register,
    };
})();

module.exports = UserController;