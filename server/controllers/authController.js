const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { hashPassword } = require('../utils/passwordUtils');
const { check, validationResult } = require('express-validator');
const User = require("../models/user");

exports.registerUser = [
    check('name').notEmpty().withMessage('Name is required'),
    check('username').isEmail().withMessage('Username must be a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {
        try {
            const {name, username, password} = req.body;
            console.log("We are here"); 
            if (!username || !password || !name) {
                throw { status: 400, message: 'Username and password are required' };
            }

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw { status: 400, message: 'Username already exists' };
            }

            const hashedPassword = await hashPassword(password);

            const user = new User({name, username, password: hashedPassword, cars: [] });
            await user.save();
            const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '3d' });

            res.status(200).json({ message: 'User registered successfully.', jwtToken, user });
        } catch (error) {
            console.error(error);
            res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
        }
    }
];
    

exports.loginUser = async (req, res) => {
    const {name, username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw { status: 401, message: 'Authentication failed' };
        }
        const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '3d' });

        res.status(200).json({ message: 'Login successful', jwtToken, user});
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
};
