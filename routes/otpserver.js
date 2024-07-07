const twilio = require('twilio');
const express = require('express');
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

let otpStore = {}; // Simple in-memory storage for OTPs

router.post('/send_otp', (req, res) => {
  const { mobile } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStore[mobile] = otp; // Store OTPs

  client.messages.create({
    body: `Your OTP code is ${otp}`,
    to: mobile,
    from: process.env.TWILIO_PHONE_NUMBER
  })
  .then(message => res.send({ success: true, message: 'OTP sent successfully' }))
  .catch(error => res.status(500).send({ success: false, message: error.message }));
});

router.post('/verify_otp', (req, res) => {
  const { mobile, otp } = req.body;

  if (otpStore[mobile] && otpStore[mobile] == otp) {
    delete otpStore[mobile]; // OTP verified, delete from store
    res.send({ success: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).send({ success: false, message: 'Invalid OTP' });
  }
});


module.exports = router;