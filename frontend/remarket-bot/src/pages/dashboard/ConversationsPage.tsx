import { motion } from "framer-motion";
import { conversations, customers } from "@/data/demo-data";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockMessages = [
  { from: "customer", text: "Hi, I left some items in my cart yesterday. Are they still available?" },
  { from: "ai", text: "Hi Ananya! 👋 Yes, your items are still in stock. You had the Organic Cotton Tee (×2) and Running Sneakers Pro in your cart. Would you like to complete your purchase? I can apply a 10% discount for you!" },
  { from: "customer", text: "Oh that sounds great! Yes please apply the discount." },
  { from: "ai", text: "Done! 🎉 I've applied a 10% discount to your cart. Your new total is ₹7,737. Here's your checkout link: checkout.convocart.ai/a1s2d3. Happy shopping!" },
  { from: "customer", text: "Thanks! I'll complete the order now." },
];

export default function ConversationsPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const cust = customers.find((c) => c.id === selected.customerId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Conversations</h1>
        <p className="text-sm text-muted-foreground mt-1">Unified inbox across all channels</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
        {/* List */}
        <div className="glass-card p-3 overflow-y-auto">
          {conversations.map((conv) => {
            const c = customers.find((cu) => cu.id === conv.customerId);
            const active = selected.id === conv.id;
            return (
              <button key={conv.id} onClick={() => setSelected(conv)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left mb-1 transition-all ${
                  active ? "bg-accent/10 border border-accent/20" : "hover:bg-muted/50"
                }`}>
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-medium shrink-0">{c?.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{c?.name}</span>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="text-[10px] px-1 py-0">{conv.channel}</Badge>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                </div>
                {conv.unread && <div className="w-2 h-2 rounded-full bg-accent shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Chat */}
        <div className="lg:col-span-2 glass-card flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">{cust?.avatar}</div>
            <div>
              <div className="text-sm font-medium text-foreground">{cust?.name}</div>
              <div className="text-xs text-muted-foreground">{selected.channel} · {cust?.segment}</div>
            </div>
            <Badge variant="outline" className="ml-auto text-xs">{selected.status}</Badge>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {mockMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`flex ${msg.from === "customer" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "customer"
                    ? "bg-muted text-foreground rounded-bl-sm"
                    : "gradient-accent text-primary-foreground rounded-br-sm"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <Input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
            <Button size="icon" className="gradient-accent text-primary-foreground border-0 shrink-0"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
