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

export default function CompositionPage() {
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
            Renewable Energy Composition Over Time
          </h3>
          <p className="text-sm text-muted-foreground">
            Watch Solar power emerge from near-zero to become the dominant force.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart data={filteredNational}>
            <defs>
              <linearGradient id="gSolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(210,90%,56%)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(210,90%,56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gWind" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25,95%,55%)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(25,95%,55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gHydro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142,60%,45%)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(142,60%,45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gBiomass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0,75%,55%)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(0,75%,55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gWaste" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(270,60%,60%)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(270,60%,60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis dataKey="year" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
            <YAxis tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
            <RTooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, color: "hsl(215,12%,55%)" }} />
            <Area
              type="monotone"
              dataKey="solar"
              name="Solar"
              stackId="1"
              stroke="hsl(210,90%,56%)"
              fill="url(#gSolar)"
            />
            <Area
              type="monotone"
              dataKey="wind"
              name="Wind"
              stackId="1"
              stroke="hsl(25,95%,55%)"
              fill="url(#gWind)"
            />
            <Area
              type="monotone"
              dataKey="hydro"
              name="Small Hydro"
              stackId="1"
              stroke="hsl(142,60%,45%)"
              fill="url(#gHydro)"
            />
            <Area
              type="monotone"
              dataKey="biomass"
              name="Bio-Mass"
              stackId="1"
              stroke="hsl(0,75%,55%)"
              fill="url(#gBiomass)"
            />
            <Area
              type="monotone"
              dataKey="waste"
              name="Waste to Energy"
              stackId="1"
              stroke="hsl(270,60%,60%)"
              fill="url(#gWaste)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
