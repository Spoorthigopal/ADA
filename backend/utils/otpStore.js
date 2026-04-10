// Stores OTPs temporarily (in-memory for hackathon)
// In production, use Redis or a database
const otpStore = new Map();

function saveOTP(phone, otp) {
  // OTP expires in 5 minutes
  const expiry = Date.now() + 5 * 60 * 1000;
  otpStore.set(phone, { otp, expiry });
}

function verifyOTP(phone, otp) {
  const record = otpStore.get(phone);
  if (!record) return { valid: false, reason: 'OTP not found' };
  if (Date.now() > record.expiry) {
    otpStore.delete(phone);
    return { valid: false, reason: 'OTP expired' };
  }
  if (record.otp !== otp) return { valid: false, reason: 'Wrong OTP' };
  otpStore.delete(phone); // Remove after use
  return { valid: true };
}

module.exports = { saveOTP, verifyOTP };