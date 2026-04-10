import { motion } from "framer-motion";
import { Bot, Send, User, ArrowRight, Tag, Package, RotateCcw, Clock, Headphones } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Message = { from: "user" | "ai"; text: string; intent?: string };

const presetQueries = [
  "Where is my order #4523?",
  "Can I return the silk scarf?",
  "Do you have size M in denim jacket?",
  "Any offer on shoes?",
  "Can I exchange this?",
  "How long is delivery?",
];

const aiResponses: Record<string, { reply: string; intent: string }> = {
  "Where is my order #4523?": { reply: "Your order #4523 is currently out for delivery! 🚚 It was shipped on April 8th and the estimated delivery is today by 6 PM. You can track it live here: track.convocart.ai/4523", intent: "Order Tracking" },
  "Can I return the silk scarf?": { reply: "Yes, absolutely! The Silk Scarf Collection is eligible for return within 15 days of delivery. I can initiate a return for you right now. Would you like a refund or store credit?", intent: "Return Request" },
  "Do you have size M in denim jacket?": { reply: "Great choice! 🧥 Yes, the Denim Jacket Classic is available in size M. We have 18 units in stock. Would you like me to add it to your cart?", intent: "Product Inquiry" },
  "Any offer on shoes?": { reply: "You're in luck! 👟 The Running Sneakers Pro is currently part of our 'Step Up' offer — flat 20% off for the next 48 hours. Original price: ₹5,999, now ₹4,799. Want me to apply it?", intent: "Discount Inquiry" },
  "Can I exchange this?": { reply: "Of course! I can help you with an exchange. Could you share the order number and the product you'd like to exchange? I'll check available options for you.", intent: "Exchange Request" },
  "How long is delivery?": { reply: "Standard delivery takes 3-5 business days to most cities. For metro areas (Mumbai, Delhi, Bangalore), we offer express delivery in 1-2 days for ₹99 extra. Which city should I check for you?", intent: "Delivery Info" },
};

export default function AISupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "ai", text: "Hi! 👋 I'm ConvoCart AI Support. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (query: string) => {
    const userMsg: Message = { from: "user", text: query };
    const resp = aiResponses[query] || {
      reply: "I understand your query. Let me look into that for you. A support specialist will be with you shortly!",
      intent: "General Inquiry",
    };
    const aiMsg: Message = { from: "ai", text: resp.reply, intent: resp.intent };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">AI Support Assistant</h1>
        <p className="text-sm text-muted-foreground mt-1">Intelligent customer support with instant resolution</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2 glass-card flex flex-col h-[600px]">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">ConvoCart AI Assistant</div>
              <div className="text-xs text-success">Online · Avg resolution: 45s</div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%]">
                  <div className={`rounded-2xl px-4 py-2.5 text-sm ${
                    msg.from === "user"
                      ? "bg-accent text-accent-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.intent && (
                    <div className="mt-1 flex items-center gap-1">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">🎯 {msg.intent}</Badge>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-success border-success/20">✓ AI Resolved</Badge>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border">
            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
              {presetQueries.slice(0, 3).map((q) => (
                <button key={q} onClick={() => handleSend(q)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors">
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask a question..." value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input && handleSend(input)} className="flex-1" />
              <Button size="icon" onClick={() => input && handleSend(input)} className="gradient-accent text-primary-foreground border-0 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-4">
            <h3 className="font-serif text-sm text-foreground mb-3">Quick Queries</h3>
            <div className="space-y-1.5">
              {presetQueries.map((q) => (
                <button key={q} onClick={() => handleSend(q)}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-muted/50 text-muted-foreground transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-serif text-sm text-foreground mb-3">Resolution Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">AI Resolution Rate</span><span className="text-foreground font-medium">87.3%</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Avg Response Time</span><span className="text-foreground font-medium">1.2s</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Escalation Rate</span><span className="text-foreground font-medium">12.7%</span></div>
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Customer Satisfaction</span><span className="text-foreground font-medium">4.8/5</span></div>
            </div>
          </div>
          <div className="glass-card p-4">
            <Button variant="outline" className="w-full text-xs" size="sm">
              <Headphones className="w-3.5 h-3.5 mr-1.5" /> Escalate to Human
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
