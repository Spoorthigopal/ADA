require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // In production, replace with your Lovable URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Import routes
const otpRoutes = require('./routes/otp');
const messageRoutes = require('./routes/messages');
const aiRoutes = require('./routes/ai');
const analyticsRoutes = require('./routes/analytics');

// Use routes
app.use('/api/otp', otpRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check — visit this URL to confirm server is running
app.get('/', (req, res) => {
  res.json({ 
    status: 'ConvoCart AI Backend is running! 🚀',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});