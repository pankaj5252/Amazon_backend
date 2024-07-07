const express = require('express');
const jwt = require('jsonwebtoken');
const LoginUser = require('../modals/loginUser');
const router = express.Router();

// Secret key for JWT (store it in environment variable in production)
const JWT_SECRET =process.env.JWT_SECRET;

// Login User
router.post(
  '/',
  async (req, res) => {
    const { mobile, password } = req.body;
    console.log({mobile , password})

    try {
      // Attempt to find the user with the provided credentials
      const loginuser = await LoginUser.findOne({ mobile, password });

      console.log(loginuser);
      
      if (loginuser) {
        // Generate JWT
        console.log(loginuser);
        const token = jwt.sign({ id: loginuser._id, username: loginuser.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token , user: loginuser});
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;