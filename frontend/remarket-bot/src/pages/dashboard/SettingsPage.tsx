import { motion } from "framer-motion";
import { Building2, Palette, Globe, Link2, Key, HelpCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const integrations = [
  { name: "Shopify", status: "Connected", icon: "🛍️" },
  { name: "WooCommerce", status: "Available", icon: "🔌" },
  { name: "Twilio", status: "Connected", icon: "📱" },
  { name: "WhatsApp Business", status: "Connected", icon: "💬" },
  { name: "Instagram Graph API", status: "Available", icon: "📸" },
  { name: "Stripe", status: "Available", icon: "💳" },
  { name: "Razorpay", status: "Connected", icon: "💰" },
  { name: "Mailchimp", status: "Available", icon: "📧" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your workspace and integrations</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 space-y-4">
          <h3 className="font-serif text-lg text-foreground flex items-center gap-2"><Building2 className="w-4 h-4 text-accent" /> Business Profile</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Business Name</Label>
              <Input defaultValue="StyleBox India" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Website</Label>
              <Input defaultValue="https://stylebox.in" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Industry</Label>
              <Input defaultValue="Fashion & Lifestyle" />
            </div>
          </div>
          <Button size="sm" className="gradient-accent text-primary-foreground border-0" onClick={() => toast.success("Settings saved!")}>Save Changes</Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 space-y-4">
          <h3 className="font-serif text-lg text-foreground flex items-center gap-2"><Palette className="w-4 h-4 text-accent" /> Brand Voice</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Tone</Label>
              <Input defaultValue="Friendly, warm, and professional" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Greeting Style</Label>
              <Input defaultValue="Hi {name}! 👋" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Max Messages / Day</Label>
              <Input type="number" defaultValue="3" />
            </div>
          </div>
          <Button size="sm" className="gradient-accent text-primary-foreground border-0" onClick={() => toast.success("Brand voice updated!")}>Update Voice</Button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="font-serif text-lg text-foreground flex items-center gap-2 mb-4"><Link2 className="w-4 h-4 text-accent" /> Integrations</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((int) => (
            <div key={int.name} className="p-4 rounded-lg bg-muted/50 border border-border/50 flex items-center gap-3">
              <span className="text-2xl">{int.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{int.name}</p>
                <Badge variant={int.status === "Connected" ? "default" : "secondary"} className={`text-xs ${int.status === "Connected" ? "bg-success/10 text-success border-0" : ""}`}>
                  {int.status === "Connected" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {int.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <h3 className="font-serif text-lg text-foreground flex items-center gap-2 mb-4"><Key className="w-4 h-4 text-accent" /> API & Webhooks</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">API Key</p>
              <p className="text-xs text-muted-foreground font-mono">sk_live_••••••••••••••4f2a</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Regenerate</Button>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Webhook URL</p>
              <p className="text-xs text-muted-foreground font-mono">https://api.convocart.ai/webhooks/events</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Configure</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
