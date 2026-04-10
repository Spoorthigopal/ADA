import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, ShieldOff, AlertTriangle, TrendingDown, Activity, Brain } from "lucide-react";
import { customers } from "@/data/demo-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const fatigueProfiles = [
  { customerId: "c1", engagementScore: 92, fatigueRisk: 12, relevanceScore: 95, decision: "SEND", reason: "High engagement, relevant offer, no recent messages" },
  { customerId: "c2", engagementScore: 34, fatigueRisk: 78, relevanceScore: 40, decision: "SUPPRESS", reason: "Ignored last 3 messages, low engagement, high fatigue risk" },
  { customerId: "c3", engagementScore: 88, fatigueRisk: 15, relevanceScore: 82, decision: "SEND", reason: "Active buyer, interested in category, fresh engagement" },
  { customerId: "c5", engagementScore: 45, fatigueRisk: 65, relevanceScore: 30, decision: "SUPPRESS", reason: "Only responds to discounts, too many promos sent this week" },
  { customerId: "c6", engagementScore: 76, fatigueRisk: 28, relevanceScore: 88, decision: "SEND", reason: "High intent user, browsing actively, cart has items" },
  { customerId: "c8", engagementScore: 15, fatigueRisk: 90, relevanceScore: 20, decision: "SUPPRESS", reason: "Inactive 14 days, no opens, high opt-out risk" },
];

export default function FatigueEnginePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Message Fatigue Prevention</h1>
        <p className="text-sm text-muted-foreground mt-1">Smart suppression engine that keeps engagement high and opt-outs low</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Messages Suppressed Today", value: "127", icon: ShieldOff, color: "text-warning" },
          { label: "Avg Fatigue Score", value: "34.2", icon: Activity, color: "text-accent" },
          { label: "Opt-out Prevention", value: "98.2%", icon: ShieldCheck, color: "text-success" },
          { label: "Engagement Protected", value: "89.7%", icon: Brain, color: "text-info" },
        ].map((card) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <card.icon className={`w-4 h-4 ${card.color} mb-2`} />
            <div className="text-xl font-serif text-foreground">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Rules */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <h3 className="font-serif text-lg text-foreground mb-4">🧠 Suppression Rules</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "User ignored previous 2+ messages → suppress",
            "No generic promos if engagement < 30%",
            "Frequency cap: max 3 messages / 48 hours",
            "Only send if relevance score > 60",
            "Prioritize transactional over promotional",
            "Suppress if fatigue risk > 70%",
          ].map((rule) => (
            <div key={rule} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <span className="text-foreground">{rule}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Customer evaluations */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg text-foreground">Customer Fatigue Evaluations</h3>
        {fatigueProfiles.map((prof, i) => {
          const cust = customers.find((c) => c.id === prof.customerId);
          const isSend = prof.decision === "SEND";
          return (
            <motion.div key={prof.customerId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 min-w-[180px]">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">{cust?.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{cust?.name}</p>
                    <p className="text-xs text-muted-foreground">{cust?.segment}</p>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                    <Progress value={prof.engagementScore} className="h-2" />
                    <p className="text-xs text-foreground mt-1">{prof.engagementScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Fatigue Risk</p>
                    <Progress value={prof.fatigueRisk} className="h-2" />
                    <p className="text-xs text-foreground mt-1">{prof.fatigueRisk}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Relevance</p>
                    <Progress value={prof.relevanceScore} className="h-2" />
                    <p className="text-xs text-foreground mt-1">{prof.relevanceScore}%</p>
                  </div>
                </div>
                <div className="sm:text-right min-w-[120px]">
                  <Badge className={isSend ? "bg-success/10 text-success border-0" : "bg-warning/10 text-warning border-0"}>
                    {isSend ? <ShieldCheck className="w-3 h-3 mr-1" /> : <ShieldOff className="w-3 h-3 mr-1" />}
                    {prof.decision}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">{prof.reason}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
