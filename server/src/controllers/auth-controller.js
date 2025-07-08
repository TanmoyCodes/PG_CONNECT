const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {                                       
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
        };
        // Optionally, you can send a token or session cookie here
        // For example, using JWT (not implemented in this snippet)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict', // Adjust as necessary
        });
        

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    registerUser,
};
