// ============================================
// ConvoCart AI — Backend API Configuration
// Replace the URL below with your Railway URL
// ============================================

export const API_BASE_URL = 'ada-production-5761.up.railway.app';
// Example: 'https://convocart-backend-production.up.railway.app'

// Generic fetch wrapper
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// ============================================
// All API functions your frontend can call
// ============================================
export const api = {
  // --- OTP Auth ---
  sendOTP: (phone: string) =>
    apiCall('/api/otp/send', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  verifyOTP: (phone: string, otp: string) =>
    apiCall('/api/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    }),

  // --- SMS Messages ---
  sendCartReminder: (data: {
    phone?: string;
    userName?: string;
    cartItems?: { name: string }[];
    totalAmount?: number;
  }) =>
    apiCall('/api/messages/cart-reminder', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  sendOffer: (data: {
    phone?: string;
    userName?: string;
    offerDetails?: string;
  }) =>
    apiCall('/api/messages/offer', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  sendOrderConfirmation: (data: {
    phone?: string;
    userName?: string;
    orderId?: string;
    total?: number;
  }) =>
    apiCall('/api/messages/order-confirmation', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // --- AI Features ---
  generateAIMessage: (data: {
    customerName?: string;
    cartItems?: { name: string }[];
    browsingHistory?: string[];
    channel?: string;
  }) =>
    apiCall('/api/ai/generate-message', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getSupportReply: (data: {
    customerQuery: string;
    customerName?: string;
    orderStatus?: string;
  }) =>
    apiCall('/api/ai/support-reply', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  checkFatigue: (data: {
    customerName?: string;
    messagesSentLast7Days?: number;
    lastOpened?: string;
    cartAbandoned?: boolean;
  }) =>
    apiCall('/api/ai/fatigue-check', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // --- Analytics ---
  getAnalytics: () => apiCall('/api/analytics/summary'),

  logEvent: (data: {
    eventType: string;
    customerId?: string;
    channel?: string;
  }) =>
    apiCall('/api/analytics/event', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
