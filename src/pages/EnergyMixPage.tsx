import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { energyMixData, zoneData } from "@/data/energyData";

const chartTooltipStyle = {
  background: "hsl(220,18%,10%)",
  border: "1px solid hsl(220,14%,18%)",
  borderRadius: "8px",
  color: "hsl(210,20%,92%)",
  fontSize: 12,
};

export default function EnergyMixPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container py-8 space-y-8"
    >
      {/* Energy Mix Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">India's Renewable Energy Mix</h3>
          <p className="text-sm text-muted-foreground">
            Solar and Wind form the dominant twin-engines powering India's green transition.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={energyMixData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {energyMixData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <RTooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [`${value}%`, ""]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {energyMixData.map((e) => (
            <div key={e.name} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: e.color }} />
              {e.name} ({e.value}%)
            </div>
          ))}
        </div>
      </motion.div>

      {/* Capacity by Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Capacity by Zone</h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <p>South & West zones create a "Renewable Hegemony" with over 900,000 MW combined.</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={zoneData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis dataKey="zone" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
            <YAxis tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
            <RTooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="capacity" fill="hsl(210,90%,56%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
