import { motion } from "framer-motion";
import { ShoppingCart, Clock, Send, CheckCircle2, AlertTriangle, ArrowRight, User, Package } from "lucide-react";
import { abandonedCarts, customers, products } from "@/data/demo-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function RecoveryFlowsPage() {
  const [selectedCart, setSelectedCart] = useState(abandonedCarts[0]);
  const [recovering, setRecovering] = useState(false);
  const customer = customers.find((c) => c.id === selectedCart.customerId);

  const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
    pending: { color: "text-warning", icon: Clock, label: "Pending Recovery" },
    message_sent: { color: "text-info", icon: Send, label: "Message Sent" },
    recovered: { color: "text-success", icon: CheckCircle2, label: "Recovered" },
  };

  const handleRecover = () => {
    setRecovering(true);
    setTimeout(() => {
      setRecovering(false);
      toast.success("Recovery message sent to " + customer?.name + " via " + customer?.channel);
    }, 1500);
  };

  const cartItems = selectedCart.items.map((item) => {
    const prod = products.find((p) => p.id === item.productId);
    return { ...prod, qty: item.qty };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Cart Recovery Flows</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-powered abandoned cart recovery with personalized messaging</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart list */}
        <div className="space-y-3">
          {abandonedCarts.map((cart) => {
            const c = customers.find((cu) => cu.id === cart.customerId);
            const sc = statusConfig[cart.status];
            const active = selectedCart.id === cart.id;
            return (
              <motion.button key={cart.id} onClick={() => setSelectedCart(cart)}
                initial="hidden" animate="visible" variants={fadeUp}
                className={`w-full text-left glass-card p-4 transition-all ${active ? "ring-2 ring-accent/30" : "hover:shadow-md"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{c?.name}</span>
                  <Badge variant="outline" className={sc.color}><sc.icon className="w-3 h-3 mr-1" />{sc.label}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>₹{cart.total.toLocaleString()}</span>
                  <span>{cart.abandonedAt}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Recovery detail */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">{customer?.avatar}</div>
              <div>
                <h3 className="text-sm font-medium text-foreground">{customer?.name}</h3>
                <p className="text-xs text-muted-foreground">{customer?.segment} · {customer?.channel} · LTV: ₹{customer?.ltv.toLocaleString()}</p>
              </div>
            </div>

            <h4 className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Cart Items</h4>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item?.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">{item?.image}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item?.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item?.qty} · ₹{item?.price?.toLocaleString()}</p>
                  </div>
                  {item?.stock && item.stock < 15 && (
                    <Badge variant="outline" className="text-destructive border-destructive/20 text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Low stock
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/10">
              <span className="text-sm text-foreground font-medium">Total</span>
              <span className="text-lg font-serif text-foreground">₹{selectedCart.total.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* AI Recovery decision */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h3 className="font-serif text-lg text-foreground mb-3">🧠 AI Recovery Strategy</h3>
            <div className="space-y-2 mb-4">
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <span className="text-muted-foreground">Channel: </span>
                <span className="text-foreground font-medium">{customer?.channel}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <span className="text-muted-foreground">Strategy: </span>
                <span className="text-foreground font-medium">Personalized reminder + 10% discount + urgency (low stock)</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <span className="text-muted-foreground">Timing: </span>
                <span className="text-foreground font-medium">Send now (optimal engagement window)</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border/50 mb-4">
              <p className="text-xs text-muted-foreground mb-1">AI-Generated Message Preview</p>
              <p className="text-sm text-foreground italic">
                "Hi {customer?.name?.split(" ")[0]}! 👋 You left {cartItems.length} amazing item{cartItems.length > 1 ? "s" : ""} in your cart.
                {cartItems.some((i) => i?.stock && i.stock < 15) ? " Stock is running low!" : ""}
                {" "}Use code COMEBACK10 for 10% off. Complete your purchase → shop.convocart.ai/cart"
              </p>
            </div>

            <Button onClick={handleRecover} disabled={recovering} className="gradient-accent text-primary-foreground border-0 w-full sm:w-auto">
              {recovering ? "Sending..." : "Send Recovery Message"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Timeline */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="font-serif text-lg text-foreground mb-4">Recovery Timeline</h3>
            <div className="space-y-4">
              {[
                { time: "2h ago", event: "Cart abandoned", icon: ShoppingCart, color: "text-warning" },
                { time: "1h 55m ago", event: "Abandonment detected by AI", icon: AlertTriangle, color: "text-accent" },
                { time: "1h 50m ago", event: "AI analyzed customer context & fatigue risk", icon: User, color: "text-info" },
                { time: "Now", event: "Recovery message ready to send", icon: Send, color: "text-success" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 ${step.color}`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{step.event}</p>
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
