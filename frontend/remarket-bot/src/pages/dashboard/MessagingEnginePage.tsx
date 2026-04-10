import { motion } from "framer-motion";
import { Brain, Clock, MessageSquare, ShieldCheck, Send, Ban, Sparkles } from "lucide-react";
import { customers } from "@/data/demo-data";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const inputs = [
  "Browsing History", "Cart Activity", "Purchase History", "Category Interest",
  "Message Engagement", "Support History", "Order Status", "Channel Preference",
  "Stock Availability", "Campaign History"
];

export default function MessagingEnginePage() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const decisions = {
    messageType: "Cart Recovery + Personalized Offer",
    bestTime: "6:30 PM (High engagement window)",
    bestChannel: selectedCustomer.channel,
    decision: "SEND",
    cta: "Complete Your Purchase — 15% Off",
    reasoning: [
      "Customer abandoned cart 2 hours ago with high-value items",
      "Previous cart recovery messages had 78% open rate",
      "No messages sent in last 48 hours — fatigue risk is low",
      "Preferred channel is " + selectedCustomer.channel,
      "Stock running low on selected items — urgency is valid",
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">AI Messaging Engine</h1>
        <p className="text-sm text-muted-foreground mt-1">Context-aware intelligence for every message decision</p>
      </div>

      {/* Customer selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {customers.slice(0, 6).map((c) => (
          <button key={c.id} onClick={() => setSelectedCustomer(c)}
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              selectedCustomer.id === c.id ? "bg-accent text-accent-foreground" : "glass-card hover:bg-muted"
            }`}>
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">{c.avatar}</div>
            <span>{c.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="glass-card p-5">
          <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-accent" /> AI Inputs</h3>
          <div className="grid grid-cols-2 gap-3">
            {inputs.map((input) => (
              <div key={input} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-foreground">{input}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground">Customer: <span className="text-foreground font-medium">{selectedCustomer.name}</span></p>
            <p className="text-xs text-muted-foreground">Segment: <Badge variant="secondary" className="text-xs ml-1">{selectedCustomer.segment}</Badge></p>
            <p className="text-xs text-muted-foreground">LTV: <span className="text-foreground">₹{selectedCustomer.ltv.toLocaleString()}</span></p>
            <p className="text-xs text-muted-foreground">Last active: {selectedCustomer.lastActive}</p>
          </div>
        </motion.div>

        {/* Output */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent" /> AI Decision</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm"><MessageSquare className="w-4 h-4 text-accent" /> Message Type</div>
              <span className="text-sm font-medium text-foreground">{decisions.messageType}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-info" /> Best Send Time</div>
              <span className="text-sm font-medium text-foreground">{decisions.bestTime}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm"><Send className="w-4 h-4 text-success" /> Channel</div>
              <span className="text-sm font-medium text-foreground">{decisions.bestChannel}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 text-sm"><ShieldCheck className="w-4 h-4 text-success" /> Decision</div>
              <Badge className="bg-success text-success-foreground">{decisions.decision}</Badge>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Recommended CTA</p>
              <p className="text-sm font-medium text-foreground">{decisions.cta}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Reasoning</p>
            <div className="space-y-1.5">
              {decisions.reasoning.map((r, i) => (
                <p key={i} className="text-xs text-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span> {r}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
