const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { saveOTP, verifyOTP } = require('../utils/otpStore');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/otp/send
router.post('/send', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number required' });
    }

    const otp = generateOTP();
    saveOTP(phone, otp);

    // Send SMS via Twilio
    await client.messages.create({
      body: `Your ConvoCart AI verification code is: ${otp}. Valid for 5 minutes. Do not share this with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log(`OTP sent to ${phone}: ${otp}`); // Remove in production
    res.json({ success: true, message: 'OTP sent successfully' });

  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
  }
});

// POST /api/otp/verify
router.post('/verify', (req, res) => {
  const { phone, otp } = req.body;
  
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Phone and OTP required' });
  }

  const result = verifyOTP(phone, otp);
  
  if (result.valid) {
    res.json({ 
      success: true, 
      message: 'OTP verified!',
      token: `demo-token-${Date.now()}` // In production, use JWT
    });
  } else {
    res.status(400).json({ success: false, message: result.reason });
  }
});

module.exports = router;