const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Helper to get the target phone (uses DEMO_PHONE as fallback)
function getPhone(requestPhone) {
  return requestPhone || process.env.DEMO_PHONE;
}

// POST /api/messages/cart-reminder
router.post('/cart-reminder', async (req, res) => {
  try {
    const { phone, userName, cartItems, totalAmount } = req.body;
    
    const itemList = cartItems 
      ? cartItems.map(i => i.name).join(', ')
      : 'some items';
    
    const message = `Hi ${userName || 'there'} 👋 You left ${itemList} in your cart! Complete your purchase now and get 10% off with code COMEBACK10. 🛒 Shop now: https://convocart.ai/cart`;

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: getPhone(phone)
    });

    res.json({ 
      success: true, 
      message: 'Cart reminder sent!',
      preview: message
    });

  } catch (error) {
    console.error('Cart reminder error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/messages/offer
router.post('/offer', async (req, res) => {
  try {
    const { phone, userName, offerDetails } = req.body;
    
    const message = `Hey ${userName || 'there'}! 🎉 Exclusive deal just for you: ${offerDetails || 'Get 20% off your next order!'} Use code: CONVOCART20. Valid for 24 hours only. Don't miss out! 🔥`;

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: getPhone(phone)
    });

    res.json({ 
      success: true, 
      message: 'Offer sent!',
      preview: message
    });

  } catch (error) {
    console.error('Offer error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/messages/order-confirmation
router.post('/order-confirmation', async (req, res) => {
  try {
    const { phone, userName, orderId, items, total } = req.body;
    
    const message = `✅ Order confirmed, ${userName || 'there'}! Your order #${orderId || 'CC' + Date.now().toString().slice(-6)} has been placed successfully. Total: ₹${total || '0'}. We'll send tracking info soon. Thank you for shopping! 🛍️`;

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: getPhone(phone)
    });

    res.json({ 
      success: true, 
      message: 'Order confirmation sent!',
      preview: message
    });

  } catch (error) {
    console.error('Order confirmation error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/messages/send-custom
router.post('/send-custom', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message text required' });
    }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: getPhone(phone)
    });

    res.json({ success: true, message: 'Message sent!' });

  } catch (error) {
    console.error('Custom message error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;