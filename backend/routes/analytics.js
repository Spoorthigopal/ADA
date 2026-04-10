const express = require('express');
const router = express.Router();

// POST /api/analytics/event
// Logs an analytics event
router.post('/event', async (req, res) => {
  try {
    const { eventType, customerId, channel, metadata } = req.body;
    
    // In production, save to Supabase
    // For hackathon, we just acknowledge it
    console.log('Analytics event:', { eventType, customerId, channel, metadata });
    
    res.json({ success: true, message: 'Event logged' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/analytics/summary
// Returns mock analytics data for demo
router.get('/summary', (req, res) => {
  res.json({
    success: true,
    data: {
      totalMessagesSent: 12847,
      cartRecoveryRate: 34.2,
      conversionRate: 8.7,
      aiResolutionRate: 91.3,
      activeCampaigns: 6,
      revenueInfluenced: 284500,
      messageSuppressionsRate: 22.1,
      channelBreakdown: {
        whatsapp: 45,
        sms: 35,
        instagram: 20
      },
      weeklyMessages: [
        { day: 'Mon', sent: 1240, opened: 890, converted: 108 },
        { day: 'Tue', sent: 1680, opened: 1120, converted: 146 },
        { day: 'Wed', sent: 1420, opened: 980, converted: 121 },
        { day: 'Thu', sent: 1890, opened: 1340, converted: 165 },
        { day: 'Fri', sent: 2100, opened: 1560, converted: 183 },
        { day: 'Sat', sent: 2340, opened: 1780, converted: 204 },
        { day: 'Sun', sent: 1177, opened: 890, converted: 98 }
      ]
    }
  });
});

module.exports = router;