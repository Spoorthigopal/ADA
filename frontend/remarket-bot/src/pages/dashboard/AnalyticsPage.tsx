import { motion } from "framer-motion";
import { chartData, kpiData } from "@/data/demo-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const pieData = [
  { name: "WhatsApp", value: 45, color: "hsl(145, 45%, 40%)" },
  { name: "SMS", value: 35, color: "hsl(28, 55%, 45%)" },
  { name: "Instagram", value: 20, color: "hsl(280, 50%, 50%)" },
];

const metrics = [
  { label: "Cart Recovery Rate", value: "34.7%", change: "+5.2%" },
  { label: "Click Through Rate", value: "12.3%", change: "+2.1%" },
  { label: "Conversion Rate", value: "8.9%", change: "+1.4%" },
  { label: "Reply Rate", value: "42.6%", change: "+7.3%" },
  { label: "AI Resolution Rate", value: "87.3%", change: "+3.1%" },
  { label: "Revenue Influenced", value: "₹18.4L", change: "+22%" },
  { label: "Opt-out Rate", value: "0.8%", change: "-0.3%" },
  { label: "Best Send Time", value: "6:30 PM", change: "Consistent" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Comprehensive performance insights across all channels</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
            <div className="text-xl font-serif text-foreground">{m.value}</div>
            <p className="text-xs text-success mt-1">{m.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="font-serif text-lg text-foreground mb-4">Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData.weekly}>
              <defs>
                <linearGradient id="colorSent2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(28, 55%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(28, 55%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConv2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 45%, 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 45%, 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(33, 20%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(25, 12%, 50%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(25, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(33,20%,88%)", background: "hsl(36,33%,97%)" }} />
              <Area type="monotone" dataKey="sent" stroke="hsl(28, 55%, 45%)" fill="url(#colorSent2)" strokeWidth={2} />
              <Area type="monotone" dataKey="opened" stroke="hsl(210, 50%, 50%)" fill="none" strokeWidth={2} />
              <Area type="monotone" dataKey="converted" stroke="hsl(145, 45%, 40%)" fill="url(#colorConv2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-serif text-lg text-foreground mb-4">Channel Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" paddingAngle={4} strokeWidth={0}>
                  {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(33,20%,88%)", background: "hsl(36,33%,97%)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            {pieData.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-muted-foreground">{p.name} ({p.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
        <h3 className="font-serif text-lg text-foreground mb-4">Campaign Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={[
            { name: "Summer Sale", sent: 1240, opened: 876, converted: 89 },
            { name: "New Arrival", sent: 3400, opened: 2100, converted: 210 },
            { name: "Win-back", sent: 800, opened: 320, converted: 23 },
            { name: "VIP Exclusive", sent: 450, opened: 410, converted: 156 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(33, 20%, 88%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(25, 12%, 50%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(25, 12%, 50%)" }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(33,20%,88%)", background: "hsl(36,33%,97%)" }} />
            <Bar dataKey="sent" fill="hsl(33, 25%, 88%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="opened" fill="hsl(28, 55%, 45%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="converted" fill="hsl(145, 45%, 40%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
