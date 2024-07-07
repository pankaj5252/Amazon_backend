const express = require('express');
const User = require('../modals/user');
const router = express.Router();

// Register user
router.post(
    '/',
    async (req, res) => {
        const { name, mobile, password } = req.body;
        try {
            const existingUser = await User.findOne({ $or: [{ mobile }] });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this Mobile Number already exists' });
            }
            const user = new User({
                name,
                mobile,
                password
            });

            await user.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user' });
        }
    }
);

// Get Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

module.exports = router;