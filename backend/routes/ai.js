const express = require('express');
const router = express.Router();

// ─── OpenRouter AI caller ───────────────────────────────────────────────────
async function callAI(prompt) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://convocart.ai',   // your app name (any URL is fine)
      'X-Title': 'ConvoCart AI'                  // shows in OpenRouter dashboard
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free', // 100% free model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7
    })
  });

  const data = await response.json();

  // Safety check in case of API error
  if (!data.choices || data.choices.length === 0) {
    throw new Error(data.error?.message || 'OpenRouter returned no response');
  }

  return data.choices[0].message.content.trim();
}

// ─── POST /api/ai/generate-message ─────────────────────────────────────────
router.post('/generate-message', async (req, res) => {
  try {
    const { customerName, cartItems, browsingHistory, lastPurchase, channel } = req.body;

    const prompt = `You are ConvoCart AI, a smart ecommerce messaging assistant.

Generate a short personalized ${channel || 'SMS'} message for:
- Name: ${customerName || 'Customer'}
- Cart items: ${JSON.stringify(cartItems || [])}
- Recently browsed: ${JSON.stringify(browsingHistory || [])}
- Last purchase: ${lastPurchase || 'None'}

Rules:
- Under 160 characters for SMS
- Warm and human tone, not robotic
- Include a clear CTA
- Add one relevant emoji
- Do not be pushy or spammy

Return ONLY the message text, nothing else.`;

    const message = await callAI(prompt);
    res.json({ success: true, message, channel: channel || 'SMS' });

  } catch (error) {
    console.error('AI generate error:', error.message);
    // Fallback so demo never breaks
    const fallback = `Hi ${req.body.customerName || 'there'}! 👋 You left items in your cart. Complete your purchase with 10% off using code COMEBACK10! 🛒`;
    res.json({ success: true, message: fallback, channel: req.body.channel || 'SMS', source: 'fallback' });
  }
});

// ─── POST /api/ai/support-reply ────────────────────────────────────────────
router.post('/support-reply', async (req, res) => {
  try {
    const { customerQuery, orderStatus, customerName } = req.body;

    const prompt = `You are a friendly AI customer support agent for StyleNest, an ecommerce brand.

Customer: ${customerName || 'Customer'}
Question: "${customerQuery}"
Order status: ${orderStatus || 'No order data available'}

Reply helpfully in under 80 words. Be warm and human. 
If you cannot resolve it, say you will connect them with the support team.`;

    const reply = await callAI(prompt);
    const intent = classifyIntent(customerQuery);

    res.json({
      success: true,
      reply,
      intent,
      escalate: reply.toLowerCase().includes('connect') || reply.toLowerCase().includes('team')
    });

  } catch (error) {
    console.error('Support reply error:', error.message);
    // Smart keyword-based fallback — works without any AI
    const fallback = getFallbackReply(req.body.customerQuery);
    res.json({ success: true, ...fallback, source: 'fallback' });
  }
});

// ─── POST /api/ai/fatigue-check ────────────────────────────────────────────
// Pure rule-based logic — no AI needed here
router.post('/fatigue-check', async (req, res) => {
  try {
    const { messagesSentLast7Days, lastOpened, cartAbandoned, lastReplied } = req.body;

    const messagesCount = messagesSentLast7Days || 0;
    const daysSinceOpen = lastOpened ? daysSince(lastOpened) : 30;

    let fatigueScore = 0;
    let relevanceScore = 100;

    if (messagesCount > 5) fatigueScore += 40;
    else if (messagesCount > 3) fatigueScore += 20;
    else if (messagesCount > 1) fatigueScore += 10;

    if (daysSinceOpen > 14) fatigueScore += 30;
    else if (daysSinceOpen > 7) fatigueScore += 15;

    if (!cartAbandoned) relevanceScore -= 30;
    if (!lastReplied) relevanceScore -= 20;

    const shouldSend = fatigueScore < 50 && relevanceScore > 50;

    res.json({
      success: true,
      fatigueScore,
      relevanceScore,
      engagementScore: Math.max(0, 100 - fatigueScore),
      decision: shouldSend ? 'SEND' : 'SUPPRESS',
      reason: shouldSend
        ? 'Low fatigue risk and high relevance. Good time to engage.'
        : `Fatigue score too high (${fatigueScore}/100). Suppressing to protect engagement.`,
      recommendation: shouldSend
        ? 'Send a personalized cart recovery message now.'
        : 'Wait 3 more days before next contact attempt.'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── POST /api/ai/segment-customer ─────────────────────────────────────────
// Pure rule-based logic — no AI needed here
router.post('/segment-customer', async (req, res) => {
  try {
    const { totalOrders, totalSpent, lastActive, cartAbandoned, avgOrderValue } = req.body;

    let segment = 'new_user';
    const daysSinceActive = lastActive ? daysSince(lastActive) : 999;

    if (totalOrders === 0) segment = 'new_user';
    else if (totalOrders >= 10 && totalSpent >= 50000) segment = 'vip';
    else if (totalOrders >= 5) segment = 'frequent_buyer';
    else if (cartAbandoned) segment = 'cart_abandoner';
    else if (daysSinceActive > 60) segment = 'inactive';
    else if (avgOrderValue < 500) segment = 'discount_seeker';
    else segment = 'regular_buyer';

    const segmentInfo = {
      new_user:       { label: 'New User',        color: 'blue',   action: 'Send welcome offer' },
      vip:            { label: 'VIP Customer',     color: 'gold',   action: 'Send exclusive early access' },
      frequent_buyer: { label: 'Frequent Buyer',   color: 'green',  action: 'Send loyalty reward' },
      cart_abandoner: { label: 'Cart Abandoner',   color: 'orange', action: 'Send cart recovery message' },
      inactive:       { label: 'Inactive User',    color: 'red',    action: 'Send win-back campaign' },
      discount_seeker:{ label: 'Discount Seeker',  color: 'purple', action: 'Send targeted offer' },
      regular_buyer:  { label: 'Regular Buyer',    color: 'teal',   action: 'Send product recommendation' }
    };

    res.json({ success: true, segment, ...segmentInfo[segment] });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function classifyIntent(query) {
  if (!query) return 'General Inquiry';
  const q = query.toLowerCase();
  if (q.includes('order') || q.includes('deliver') || q.includes('track') || q.includes('where')) return 'Order Tracking';
  if (q.includes('return') || q.includes('refund') || q.includes('money back')) return 'Returns & Refunds';
  if (q.includes('size') || q.includes('stock') || q.includes('available')) return 'Product Inquiry';
  if (q.includes('offer') || q.includes('discount') || q.includes('coupon')) return 'Promotions';
  if (q.includes('exchange') || q.includes('swap')) return 'Exchange Request';
  if (q.includes('cancel')) return 'Cancellation';
  if (q.includes('payment') || q.includes('paid') || q.includes('charge')) return 'Payment Issue';
  return 'General Inquiry';
}

function getFallbackReply(query) {
  const intent = classifyIntent(query);
  const replies = {
    'Order Tracking':    { reply: "Your order is on its way! 🚚 You'll receive a tracking link via SMS shortly. Estimated delivery: 2-4 business days.", intent },
    'Returns & Refunds': { reply: "We have a hassle-free 30-day return policy! 📦 Share your order ID and we'll sort it right away.", intent },
    'Product Inquiry':   { reply: "Let me check that! We restock frequently. I can notify you when it's back in stock. 👍", intent },
    'Promotions':        { reply: "Great news! 🎉 Use code CONVOCART20 for 20% off your next order. Valid for 48 hours!", intent },
    'Exchange Request':  { reply: "Happy to help with an exchange! 🔄 Share your order ID and the item you'd like instead.", intent },
    'Cancellation':      { reply: "If your order hasn't shipped, I can cancel it immediately. Share your order ID and I'll check! ✅", intent },
    'Payment Issue':     { reply: "Sorry about that! 💳 If the amount was debited, it'll be refunded within 5-7 business days.", intent },
    'General Inquiry':   { reply: "Thanks for reaching out! 😊 Could you share a bit more detail so I can help you better?", intent }
  };
  return replies[intent] || replies['General Inquiry'];
}

function daysSince(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return Math.floor((now - date) / (1000 * 60 * 60 * 24));
}

module.exports = router;