import { motion } from "framer-motion";
import { segments } from "@/data/demo-data";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, TrendingDown, Target } from "lucide-react";

export default function SegmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Customer Segments</h1>
        <p className="text-sm text-muted-foreground mt-1">Intelligent audience grouping for targeted campaigns</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {segments.map((seg, i) => {
          const isUp = seg.trend.startsWith("+");
          return (
            <motion.div key={seg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                <div className={`flex items-center gap-1 text-xs ${isUp ? "text-success" : "text-destructive"}`}>
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {seg.trend}
                </div>
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1">{seg.name}</h3>
              <div className="flex items-center gap-1 text-2xl font-serif text-foreground mb-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                {seg.count.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mb-3">{seg.description}</p>
              <Badge variant="secondary" className="text-xs"><Target className="w-3 h-3 mr-1" />{seg.campaignFit}</Badge>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
