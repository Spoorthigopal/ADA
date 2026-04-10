import { motion } from "framer-motion";
import { campaigns } from "@/data/demo-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";

export default function CampaignsPage() {
  const statusColor: Record<string, string> = {
    Active: "bg-success/10 text-success border-success/20",
    Paused: "bg-warning/10 text-warning border-warning/20",
    Scheduled: "bg-info/10 text-info border-info/20",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your messaging campaigns</p>
        </div>
        <Button size="sm" className="gradient-accent text-primary-foreground border-0"><Plus className="w-4 h-4 mr-1" /> New Campaign</Button>
      </div>

      <div className="grid gap-4">
        {campaigns.map((camp, i) => (
          <motion.div key={camp.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card-hover p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-foreground">{camp.name}</h3>
                  <Badge variant="outline" className={statusColor[camp.status] || ""}>{camp.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{camp.type} · {camp.channel}</p>
              </div>
              <div className="flex items-center gap-6 text-center">
                <div><div className="text-lg font-serif text-foreground">{camp.sent.toLocaleString()}</div><div className="text-xs text-muted-foreground">Sent</div></div>
                <div><div className="text-lg font-serif text-foreground">{camp.opened.toLocaleString()}</div><div className="text-xs text-muted-foreground">Opened</div></div>
                <div><div className="text-lg font-serif text-success">{camp.converted}</div><div className="text-xs text-muted-foreground">Converted</div></div>
                <div><div className="text-lg font-serif text-foreground">₹{(camp.revenue / 1000).toFixed(0)}K</div><div className="text-xs text-muted-foreground">Revenue</div></div>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0"><MoreHorizontal className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
