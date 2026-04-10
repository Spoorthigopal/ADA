import { motion } from "framer-motion";
import { Shield, Bell, MessageSquare, Lock, Eye, ToggleLeft, Heart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function PreferencesPage() {
  const [prefs, setPrefs] = useState({
    promotional: true, transactional: true, cartRecovery: true, orderUpdates: true,
    personalizedOffers: false, weeklyDigest: true, whatsapp: true, sms: true, instagram: false,
    personalization: true, analytics: true,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Preferences & Privacy</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage communication preferences and data transparency</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 space-y-5">
          <h3 className="font-serif text-lg text-foreground flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Communication Consent</h3>
          {[
            { key: "promotional", label: "Promotional Messages", desc: "Sales, offers, and new product alerts" },
            { key: "transactional", label: "Transactional Messages", desc: "Order confirmations, shipping updates" },
            { key: "cartRecovery", label: "Cart Recovery Reminders", desc: "Personalized reminders for abandoned carts" },
            { key: "orderUpdates", label: "Order Status Updates", desc: "Real-time delivery and order tracking" },
            { key: "personalizedOffers", label: "Personalized Offers", desc: "AI-curated deals based on your interests" },
            { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of new products and deals" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-foreground">{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={prefs[item.key as keyof typeof prefs]} onCheckedChange={() => toggle(item.key as keyof typeof prefs)} />
            </div>
          ))}
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 space-y-5">
            <h3 className="font-serif text-lg text-foreground flex items-center gap-2"><MessageSquare className="w-4 h-4 text-accent" /> Channel Preferences</h3>
            {[
              { key: "whatsapp", label: "WhatsApp" },
              { key: "sms", label: "SMS" },
              { key: "instagram", label: "Instagram DM" },
            ].map((ch) => (
              <div key={ch.key} className="flex items-center justify-between">
                <Label className="text-sm text-foreground">{ch.label}</Label>
                <Switch checked={prefs[ch.key as keyof typeof prefs]} onCheckedChange={() => toggle(ch.key as keyof typeof prefs)} />
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5 space-y-5">
            <h3 className="font-serif text-lg text-foreground flex items-center gap-2"><Lock className="w-4 h-4 text-accent" /> Data & Privacy</h3>
            {[
              { key: "personalization", label: "Personalization", desc: "Allow AI to personalize messaging" },
              { key: "analytics", label: "Usage Analytics", desc: "Help improve the platform" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <Label className="text-sm text-foreground">{item.label}</Label>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={prefs[item.key as keyof typeof prefs]} onCheckedChange={() => toggle(item.key as keyof typeof prefs)} />
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="font-serif text-lg text-foreground flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-accent" /> Our Promise</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ConvoCart AI is built on ethical AI principles. We never sell your data, we respect your communication preferences, 
              and our AI only sends messages when it's genuinely helpful. Every message decision is transparent and explainable.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">GDPR Compliant</Badge>
              <Badge variant="secondary" className="text-xs">Consent-First</Badge>
              <Badge variant="secondary" className="text-xs">Ethical AI</Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
