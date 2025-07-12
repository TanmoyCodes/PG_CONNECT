const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

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
            role,
        });

        await newUser.save();

        // Create JWT token
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite:'None',
            maxAge: 3 * 60 * 60 * 1000, // 3 hours
        });

        const userResponse = { ...newUser._doc };
        delete userResponse.password;

        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            user: userResponse,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const payload = {
            name: user.name,
            email: user.email,
            id: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite:'None',
            maxAge: 12 * 60 * 60 * 1000, // 12 hours
        });

        const userResponse = { ...user._doc };
        delete userResponse.password;

        return res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            user: userResponse,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const checkAdmin = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const userResponse = { ...user._doc };
        delete userResponse.password;

        return res.status(200).json({
            message: 'User is an admin',
            success: true,
            user: userResponse,
        });
    } catch (error) {
        console.error('Error checking admin:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    checkAdmin,
};
