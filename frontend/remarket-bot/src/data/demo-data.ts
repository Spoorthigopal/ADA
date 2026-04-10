export const customers = [
  { id: "c1", name: "Ananya Sharma", phone: "+919876543210", email: "ananya@email.com", segment: "VIP", ltv: 12400, lastActive: "2h ago", avatar: "AS", channel: "WhatsApp" },
  { id: "c2", name: "Rahul Mehta", phone: "+919876543211", email: "rahul@email.com", segment: "Cart Abandoner", ltv: 3200, lastActive: "1d ago", avatar: "RM", channel: "SMS" },
  { id: "c3", name: "Priya Patel", phone: "+919876543212", email: "priya@email.com", segment: "Frequent Buyer", ltv: 8900, lastActive: "30m ago", avatar: "PP", channel: "Instagram" },
  { id: "c4", name: "Vikram Singh", phone: "+919876543213", email: "vikram@email.com", segment: "New User", ltv: 450, lastActive: "3d ago", avatar: "VS", channel: "WhatsApp" },
  { id: "c5", name: "Meera Joshi", phone: "+919876543214", email: "meera@email.com", segment: "Discount Seeker", ltv: 2100, lastActive: "5h ago", avatar: "MJ", channel: "SMS" },
  { id: "c6", name: "Arjun Reddy", phone: "+919876543215", email: "arjun@email.com", segment: "High Intent", ltv: 6700, lastActive: "15m ago", avatar: "AR", channel: "WhatsApp" },
  { id: "c7", name: "Kavitha Nair", phone: "+919876543216", email: "kavitha@email.com", segment: "Repeat Buyer", ltv: 15200, lastActive: "1h ago", avatar: "KN", channel: "Instagram" },
  { id: "c8", name: "Deepak Gupta", phone: "+919876543217", email: "deepak@email.com", segment: "Inactive", ltv: 800, lastActive: "14d ago", avatar: "DG", channel: "SMS" },
];

export const products = [
  { id: "p1", name: "Organic Cotton Tee", price: 1299, category: "Apparel", image: "👕", stock: 45 },
  { id: "p2", name: "Leather Crossbody Bag", price: 3499, category: "Accessories", image: "👜", stock: 12 },
  { id: "p3", name: "Running Sneakers Pro", price: 5999, category: "Footwear", image: "👟", stock: 8 },
  { id: "p4", name: "Silk Scarf Collection", price: 1899, category: "Accessories", image: "🧣", stock: 30 },
  { id: "p5", name: "Denim Jacket Classic", price: 4299, category: "Apparel", image: "🧥", stock: 18 },
  { id: "p6", name: "Bamboo Sunglasses", price: 2199, category: "Accessories", image: "🕶️", stock: 25 },
  { id: "p7", name: "Yoga Mat Premium", price: 2499, category: "Wellness", image: "🧘", stock: 40 },
  { id: "p8", name: "Stainless Water Bottle", price: 999, category: "Wellness", image: "🍶", stock: 60 },
];

export const abandonedCarts = [
  { id: "ac1", customerId: "c2", items: [{ productId: "p3", qty: 1 }, { productId: "p1", qty: 2 }], total: 8597, abandonedAt: "2 hours ago", status: "pending", urgency: "high" },
  { id: "ac2", customerId: "c5", items: [{ productId: "p2", qty: 1 }], total: 3499, abandonedAt: "45 minutes ago", status: "message_sent", urgency: "medium" },
  { id: "ac3", customerId: "c4", items: [{ productId: "p6", qty: 1 }, { productId: "p8", qty: 1 }], total: 3198, abandonedAt: "1 day ago", status: "recovered", urgency: "low" },
  { id: "ac4", customerId: "c8", items: [{ productId: "p5", qty: 1 }, { productId: "p4", qty: 1 }], total: 6198, abandonedAt: "6 hours ago", status: "pending", urgency: "high" },
];

export const campaigns = [
  { id: "cm1", name: "Summer Sale Recovery", type: "Cart Recovery", status: "Active", sent: 1240, delivered: 1198, opened: 876, clicked: 432, converted: 89, revenue: 234500, channel: "WhatsApp" },
  { id: "cm2", name: "New Arrival Alert", type: "Promotional", status: "Active", sent: 3400, delivered: 3280, opened: 2100, clicked: 890, converted: 210, revenue: 567000, channel: "SMS" },
  { id: "cm3", name: "Win-back Inactive Users", type: "Re-engagement", status: "Paused", sent: 800, delivered: 756, opened: 320, clicked: 98, converted: 23, revenue: 45000, channel: "Instagram" },
  { id: "cm4", name: "VIP Exclusive Offers", type: "Loyalty", status: "Active", sent: 450, delivered: 445, opened: 410, clicked: 380, converted: 156, revenue: 890000, channel: "WhatsApp" },
  { id: "cm5", name: "Festival Season Bundle", type: "Promotional", status: "Scheduled", sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0, revenue: 0, channel: "Multi-channel" },
];

export const supportTickets = [
  { id: "st1", customerId: "c1", query: "Where is my order #4523?", intent: "Order Tracking", status: "Resolved", resolvedBy: "AI", time: "2m" },
  { id: "st2", customerId: "c3", query: "Can I return the silk scarf?", intent: "Return Request", status: "Resolved", resolvedBy: "AI", time: "1m" },
  { id: "st3", customerId: "c6", query: "Do you have size M in denim jacket?", intent: "Product Inquiry", status: "Open", resolvedBy: "Pending", time: "-" },
  { id: "st4", customerId: "c7", query: "Any discount on sneakers?", intent: "Discount Inquiry", status: "Resolved", resolvedBy: "AI", time: "30s" },
  { id: "st5", customerId: "c2", query: "How long is delivery to Mumbai?", intent: "Delivery Info", status: "Resolved", resolvedBy: "AI", time: "45s" },
  { id: "st6", customerId: "c5", query: "Can I exchange this for another color?", intent: "Exchange Request", status: "Escalated", resolvedBy: "Human", time: "8m" },
];

export const segments = [
  { id: "s1", name: "Cart Abandoners", count: 342, trend: "+12%", color: "hsl(var(--destructive))", description: "Users who left items in cart without checkout", campaignFit: "Recovery" },
  { id: "s2", name: "Frequent Buyers", count: 1205, trend: "+8%", color: "hsl(var(--success))", description: "Purchased 3+ times in last 30 days", campaignFit: "Loyalty" },
  { id: "s3", name: "High Intent Users", count: 567, trend: "+23%", color: "hsl(var(--accent))", description: "Browsed 5+ products, high engagement score", campaignFit: "Conversion" },
  { id: "s4", name: "Discount Seekers", count: 890, trend: "-3%", color: "hsl(var(--warning))", description: "Only purchase during sales or with coupons", campaignFit: "Promotional" },
  { id: "s5", name: "New Users", count: 234, trend: "+45%", color: "hsl(var(--info))", description: "Signed up in last 7 days", campaignFit: "Onboarding" },
  { id: "s6", name: "Inactive Users", count: 456, trend: "-15%", color: "hsl(var(--muted-foreground))", description: "No activity in last 30 days", campaignFit: "Re-engagement" },
  { id: "s7", name: "VIP Customers", count: 89, trend: "+5%", color: "hsl(var(--primary))", description: "Top 5% by lifetime value", campaignFit: "Exclusive" },
  { id: "s8", name: "Repeat Buyers", count: 678, trend: "+11%", color: "hsl(var(--bronze))", description: "Purchased 2+ times total", campaignFit: "Cross-sell" },
];

export const kpiData = {
  totalMessagesSent: { value: "48.2K", change: "+12.3%", trend: "up" },
  cartRecoveryRate: { value: "34.7%", change: "+5.2%", trend: "up" },
  conversionRate: { value: "8.9%", change: "+1.4%", trend: "up" },
  aiResolutionRate: { value: "87.3%", change: "+3.1%", trend: "up" },
  activeCampaigns: { value: "12", change: "+2", trend: "up" },
  revenueInfluenced: { value: "₹18.4L", change: "+22%", trend: "up" },
  channelEngagement: { value: "72.4%", change: "+4.8%", trend: "up" },
  messageSuppression: { value: "23.1%", change: "+8.5%", trend: "up" },
};

export const chartData = {
  weekly: [
    { day: "Mon", sent: 420, delivered: 405, opened: 310, converted: 45 },
    { day: "Tue", sent: 380, delivered: 370, opened: 290, converted: 52 },
    { day: "Wed", sent: 510, delivered: 498, opened: 380, converted: 67 },
    { day: "Thu", sent: 460, delivered: 445, opened: 340, converted: 58 },
    { day: "Fri", sent: 590, delivered: 572, opened: 450, converted: 82 },
    { day: "Sat", sent: 340, delivered: 330, opened: 260, converted: 38 },
    { day: "Sun", sent: 280, delivered: 270, opened: 200, converted: 29 },
  ],
  channelPerformance: [
    { channel: "WhatsApp", engagement: 78, conversion: 12, volume: 45 },
    { channel: "SMS", engagement: 62, conversion: 8, volume: 35 },
    { channel: "Instagram", engagement: 85, conversion: 15, volume: 20 },
  ],
};

export const conversations = [
  { id: "cv1", customerId: "c1", channel: "WhatsApp", lastMessage: "Thanks! I'll complete the order now.", time: "2m ago", unread: false, status: "resolved" },
  { id: "cv2", customerId: "c6", channel: "WhatsApp", lastMessage: "Do you have this in black?", time: "5m ago", unread: true, status: "active" },
  { id: "cv3", customerId: "c3", channel: "Instagram", lastMessage: "Love the new collection! 😍", time: "15m ago", unread: false, status: "active" },
  { id: "cv4", customerId: "c2", channel: "SMS", lastMessage: "When will my order arrive?", time: "1h ago", unread: true, status: "pending" },
  { id: "cv5", customerId: "c7", channel: "WhatsApp", lastMessage: "Applied the code, thanks!", time: "3h ago", unread: false, status: "resolved" },
];
