import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Megaphone, MessagesSquare, ShoppingCart, Bot,
  Users, BarChart3, Settings, Shield, Search, Bell, LogOut, Menu, X, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Messaging Engine", icon: MessageSquare, path: "/dashboard/messaging" },
  { label: "Campaigns", icon: Megaphone, path: "/dashboard/campaigns" },
  { label: "Conversations", icon: MessagesSquare, path: "/dashboard/conversations" },
  { label: "Recovery Flows", icon: ShoppingCart, path: "/dashboard/recovery" },
  { label: "AI Support", icon: Bot, path: "/dashboard/support" },
  { label: "Segments", icon: Users, path: "/dashboard/segments" },
  { label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { label: "Preferences", icon: Shield, path: "/dashboard/preferences" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("convocart_user") || '{"name":"Demo User","email":"demo@convocart.ai"}');

  const handleLogout = () => {
    localStorage.removeItem("convocart_user");
    toast.success("Logged out");
    navigate("/");
  };

  const notifications = [
    { title: "Cart recovered!", desc: "Ananya completed her purchase after AI reminder", time: "2m ago" },
    { title: "Campaign launched", desc: "Summer Sale Recovery is now live", time: "15m ago" },
    { title: "High fatigue risk", desc: "Deepak Gupta — message suppressed", time: "1h ago" },
    { title: "Support query resolved", desc: "AI resolved order tracking query in 30s", time: "2h ago" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border shrink-0">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg text-sidebar-foreground">ConvoCart AI</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active ? "bg-sidebar-accent text-sidebar-primary font-medium" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }} className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar z-50 lg:hidden flex flex-col">
              <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="font-serif text-lg">ConvoCart AI</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        active ? "bg-sidebar-accent text-sidebar-primary font-medium" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-sidebar-border">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input className="border-0 bg-transparent h-7 text-sm w-40 lg:w-56 p-0 focus-visible:ring-0" placeholder="Search..." />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} className="absolute right-0 top-12 w-80 glass-card rounded-xl shadow-lg p-4 z-50">
                    <h3 className="font-serif text-sm text-foreground mb-3">Notifications</h3>
                    <div className="space-y-3">
                      {notifications.map((n, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                          <div>
                            <p className="text-foreground font-medium text-xs">{n.title}</p>
                            <p className="text-muted-foreground text-xs">{n.desc}</p>
                            <p className="text-muted-foreground/60 text-xs mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-xs text-primary-foreground font-medium">
                {user.name?.[0]?.toUpperCase() || "D"}
              </div>
              <span className="text-sm text-foreground hidden sm:block">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
