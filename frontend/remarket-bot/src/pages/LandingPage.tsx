import { motion } from "framer-motion";
import { ArrowRight, Play, MessageSquare, ShoppingCart, Brain, BarChart3, Shield, Zap, Users, TrendingUp, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const features = [
  { icon: ShoppingCart, title: "Cart Recovery", desc: "Automatically detect abandoned carts and send personalized recovery messages at the perfect moment." },
  { icon: Brain, title: "AI Messaging Engine", desc: "Context-aware AI decides the right message, channel, and timing for every customer interaction." },
  { icon: Shield, title: "Fatigue Prevention", desc: "Smart suppression engine prevents message overload, keeping engagement high and opt-outs low." },
  { icon: MessageSquare, title: "Multi-Channel", desc: "Unified conversations across WhatsApp, SMS, and Instagram with full context preservation." },
  { icon: BarChart3, title: "Smart Analytics", desc: "Real-time insights on conversions, engagement, and revenue influenced by every message." },
  { icon: Users, title: "AI Support", desc: "Instant AI-powered customer support that resolves 87% of queries without human intervention." },
];

const metrics = [
  { value: "34.7%", label: "Cart Recovery Rate" },
  { value: "87%", label: "AI Resolution Rate" },
  { value: "3.2x", label: "Revenue Uplift" },
  { value: "68%", label: "Less Message Fatigue" },
];

const testimonials = [
  { name: "Priya Kapoor", role: "Head of Growth, StyleBox", quote: "ConvoCart AI recovered ₹18L in abandoned carts in just the first month. The AI messaging is incredibly smart.", rating: 5 },
  { name: "Amit Desai", role: "CEO, FreshKart", quote: "Our customer support costs dropped 60% after implementing the AI assistant. It handles queries better than we expected.", rating: 5 },
  { name: "Sneha Iyer", role: "Marketing Lead, UrbanCraft", quote: "The fatigue prevention engine is genius. Our opt-out rates dropped to nearly zero while conversions went up.", rating: 5 },
];

const steps = [
  { num: "01", title: "Connect Your Store", desc: "Integrate with your ecommerce platform in minutes." },
  { num: "02", title: "AI Learns Your Customers", desc: "Our engine analyzes behavior, preferences, and engagement patterns." },
  { num: "03", title: "Smart Messages Deploy", desc: "Personalized messages go out on the right channel at the right time." },
  { num: "04", title: "Watch Revenue Grow", desc: "Track conversions, recovery rates, and ROI in real-time." },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl text-foreground">ConvoCart AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#metrics" className="hover:text-foreground transition-colors">Results</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Log in</Button>
            <Button size="sm" onClick={() => navigate("/signup")} className="gradient-accent text-primary-foreground border-0">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm mb-6">
              <Zap className="w-3.5 h-3.5 text-accent" />
              AI-Powered Conversational Commerce
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground mb-6">
              Turn customer messages into <span className="text-gradient">conversions</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered conversational commerce for smarter ecommerce engagement across WhatsApp, SMS, and Instagram.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/signup")} className="gradient-accent text-primary-foreground border-0 px-8 h-12 text-base">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")} className="px-8 h-12 text-base">
                <Play className="mr-2 w-4 h-4" /> View Demo Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">Your customers are drowning in noise</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-3"><span className="text-destructive mt-1">✕</span> Generic bulk messages get ignored</p>
                <p className="flex items-start gap-3"><span className="text-destructive mt-1">✕</span> Abandoned carts lose ₹2.4L daily</p>
                <p className="flex items-start gap-3"><span className="text-destructive mt-1">✕</span> Support teams waste hours on repetitive queries</p>
                <p className="flex items-start gap-3"><span className="text-destructive mt-1">✕</span> Customers opt out due to message fatigue</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">ConvoCart AI fixes this</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /> Right message, right person, right time</p>
                <p className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /> AI recovers 34.7% of abandoned carts</p>
                <p className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /> 87% of support queries resolved by AI</p>
                <p className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" /> Smart fatigue prevention keeps customers engaged</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl text-foreground mb-4">Everything you need to convert smarter</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">Powerful AI modules that work together to maximize every customer interaction.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="glass-card-hover p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl text-foreground mb-4">How it works</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <motion.div key={s.num} variants={fadeUp} className="text-center">
                <div className="text-4xl font-serif text-accent/30 mb-3">{s.num}</div>
                <h3 className="font-serif text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl text-foreground mb-4">Real results, real impact</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <motion.div key={m.label} variants={fadeUp} className="glass-card p-6 text-center">
                <div className="text-3xl sm:text-4xl font-serif text-gradient mb-2">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl text-foreground mb-4">Trusted by growing brands</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="glass-card p-6">
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-warning text-warning" />)}</div>
                <p className="text-sm text-foreground mb-4 leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl text-foreground mb-6">Ready to turn conversations into conversions?</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8">Start recovering revenue and delighting customers with AI-powered messaging today.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/signup")} className="gradient-accent text-primary-foreground border-0 px-8 h-12">
                Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")} className="px-8 h-12">View Demo</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-serif text-lg">ConvoCart AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Privacy</span><span>Terms</span><span>Support</span>
            </div>
            <p className="text-xs text-muted-foreground">© 2024 ConvoCart AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
