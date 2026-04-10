import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, MessageSquare, ShoppingCart, Zap, DollarSign, Radio, ShieldOff, ArrowRight, Bot } from "lucide-react";
import { kpiData, chartData, conversations, customers, campaigns } from "@/data/demo-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const kpis = [
  { key: "totalMessagesSent", label: "Messages Sent", icon: MessageSquare, color: "text-accent" },
  { key: "cartRecoveryRate", label: "Cart Recovery", icon: ShoppingCart, color: "text-success" },
  { key: "conversionRate", label: "Conversion Rate", icon: Zap, color: "text-info" },
  { key: "aiResolutionRate", label: "AI Resolution", icon: Bot, color: "text-accent" },
  { key: "activeCampaigns", label: "Active Campaigns", icon: Radio, color: "text-warning" },
  { key: "revenueInfluenced", label: "Revenue Influenced", icon: DollarSign, color: "text-success" },
  { key: "channelEngagement", label: "Engagement", icon: TrendingUp, color: "text-info" },
  { key: "messageSuppression", label: "Suppressed", icon: ShieldOff, color: "text-muted-foreground" },
];

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time overview of your conversational commerce performance</p>
      </div>

      {/* KPIs */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const data = kpiData[kpi.key as keyof typeof kpiData];
          const isUp = data.trend === "up";
          return (
            <motion.div key={kpi.key} variants={fadeUp} className="glass-card-hover p-4">
              <div className="flex items-center justify-between mb-3">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                <div className={`flex items-center gap-1 text-xs ${isUp ? "text-success" : "text-destructive"}`}>
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {data.change}
                </div>
              </div>
              <div className="text-2xl font-serif text-foreground">{data.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{kpi.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="font-serif text-lg text-foreground mb-4">Message Performance</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData.weekly}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(28, 55%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(28, 55%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(33, 20%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(25, 12%, 50%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(25, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(33,20%,88%)", background: "hsl(36,33%,97%)" }} />
              <Area type="monotone" dataKey="sent" stroke="hsl(28, 55%, 45%)" fill="url(#colorSent)" strokeWidth={2} />
              <Area type="monotone" dataKey="converted" stroke="hsl(145, 45%, 40%)" fill="none" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-serif text-lg text-foreground mb-4">Channel Performance</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData.channelPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(33, 20%, 88%)" />
              <XAxis dataKey="channel" tick={{ fontSize: 12, fill: "hsl(25, 12%, 50%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(25, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(33,20%,88%)", background: "hsl(36,33%,97%)" }} />
              <Bar dataKey="engagement" fill="hsl(28, 55%, 45%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="conversion" fill="hsl(145, 45%, 40%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-foreground">Recent Conversations</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/conversations")} className="text-xs text-accent">View all <ArrowRight className="w-3 h-3 ml-1" /></Button>
          </div>
          <div className="space-y-3">
            {conversations.slice(0, 4).map((conv) => {
              const cust = customers.find((c) => c.id === conv.customerId);
              return (
                <div key={conv.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground">{cust?.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{cust?.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{conv.channel}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-foreground">Active Campaigns</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/campaigns")} className="text-xs text-accent">View all <ArrowRight className="w-3 h-3 ml-1" /></Button>
          </div>
          <div className="space-y-3">
            {campaigns.filter((c) => c.status === "Active").map((camp) => (
              <div key={camp.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-success shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{camp.name}</div>
                  <p className="text-xs text-muted-foreground">{camp.type} · {camp.channel} · {camp.converted} conversions</p>
                </div>
                <span className="text-xs text-success font-medium">₹{(camp.revenue / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Smart Recommendations */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-5">
        <h3 className="font-serif text-lg text-foreground mb-4">🧠 Smart Recommendations</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Send cart recovery to 34 users", desc: "High-intent users abandoned carts in last 2 hours", action: "Launch Recovery" },
            { title: "Suppress promo to Discount Seekers", desc: "Fatigue risk is high — wait 48 hours before next campaign", action: "View Details" },
            { title: "Re-engage 12 inactive VIPs", desc: "VIP customers haven't purchased in 15+ days", action: "Create Campaign" },
          ].map((rec) => (
            <div key={rec.title} className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <h4 className="text-sm font-medium text-foreground mb-1">{rec.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{rec.desc}</p>
              <Button variant="outline" size="sm" className="text-xs h-7">{rec.action}</Button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
