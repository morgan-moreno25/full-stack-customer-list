const AuthController = (() => {
    const bcrypt = require('bcryptjs');
    const config = require('../utils/config');
    const jwt = require('jsonwebtoken');
    const User = require('../models/User');


    const loadUser = async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            return res.status(200).json(user);
        }catch(error){
            return res.status(500).json(error);
        };
    };
    const login = async (req, res, next) => {
        const { email, password } = req.body;
        var error;
        
        if(!email || !password){
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        try {
            const validUser = await User.findOne({ username });

            if(validUser){
                const isMatch = await bcrypt.compare(password, validUser.password);

                if(isMatch){
                    const token = await jwt.sign({ id: validUser._id }, config.SECRET, { expiresIn: 3600 });

                    return res.status(200).json({
                        token,
                        user: {
                            id: validUser._id,
                            name: validUser.name,
                            email: validUser.email,
                        }
                    });
                }else{
                    return res.status(400).json({ msg: 'Invalid credentials' });
                }
            }else{
                return res.status(400).json({ msg: 'User does not exist' });
            }

        }catch(error){
            return res.status(500).json(error);
        };
    };

    return {
        loadUser,
        login,
    }
})();

module.exports = AuthController;