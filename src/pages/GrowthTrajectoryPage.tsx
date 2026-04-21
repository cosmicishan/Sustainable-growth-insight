import { useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, Legend } from "recharts";
import { nationalTimeSeriesData } from "@/data/energyData";
import { useYearFilter } from "@/contexts/YearFilterContext";

const chartTooltipStyle = {
  background: "hsl(220,18%,10%)",
  border: "1px solid hsl(220,14%,18%)",
  borderRadius: "8px",
  color: "hsl(210,20%,92%)",
  fontSize: 12,
};

export default function GrowthTrajectoryPage() {
  const { yearRange } = useYearFilter();

  const filteredNational = useMemo(
    () => nationalTimeSeriesData.filter((d) => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container py-8"
    >
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            The V-Recovery: GSDP & Renewable Capacity
          </h3>
          <p className="text-sm text-muted-foreground">
            India's GSDP transitioned into a high-velocity phase around 2010. The 2020 dip was followed by a stronger surge.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart data={filteredNational}>
            <defs>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142,60%,50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142,60%,50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradGsdp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(45,90%,55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(45,90%,55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis dataKey="year" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
            <RTooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, color: "hsl(215,12%,55%)" }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="total"
              name="Total RE (MW)"
              stroke="hsl(142,60%,50%)"
              fill="url(#gradTotal)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="gsdp"
              name="GSDP (₹ Cr)"
              stroke="hsl(45,90%,55%)"
              fill="url(#gradGsdp)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
