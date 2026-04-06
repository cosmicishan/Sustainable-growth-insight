import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  accent?: boolean;
  delay?: number;
}

export default function StatCard({ title, value, subtitle, tooltip, icon, accent, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative rounded-xl border p-5 ${accent ? "border-primary/30 glow-border bg-gradient-card" : "border-border bg-card"}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className={`mt-2 text-2xl font-bold ${accent ? "text-primary text-glow-primary" : "text-foreground"}`}>{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          {tooltip && (
            <Tooltip>
              <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs"><p>{tooltip}</p></TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </motion.div>
  );
}
