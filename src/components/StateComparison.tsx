import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Checkbox } from "@/components/ui/checkbox";
import SectionHeader from "@/components/SectionHeader";
import { stateTimeSeriesData, topStates2024 } from "@/data/energyData";
import { useYearFilter } from "@/contexts/YearFilterContext";

const allStates = ["Gujarat", "Karnataka", "Maharashtra", "Rajasthan", "TamilNadu"];
const stateLabels: Record<string, string> = { Gujarat: "Gujarat", Karnataka: "Karnataka", Maharashtra: "Maharashtra", Rajasthan: "Rajasthan", TamilNadu: "Tamil Nadu" };
const stateColors: Record<string, string> = {
  Gujarat: "#3b82f6", Karnataka: "#f59e0b", Maharashtra: "#22c55e", Rajasthan: "#ef4444", TamilNadu: "#8b5cf6",
};

const chartTooltipStyle = { background: "hsl(220,18%,10%)", border: "1px solid hsl(220,14%,18%)", borderRadius: "8px", color: "hsl(210,20%,92%)", fontSize: 12 };

export default function StateComparison() {
  const [selected, setSelected] = useState<string[]>(["Gujarat", "Karnataka", "TamilNadu"]);
  const { yearRange } = useYearFilter();

  const toggle = (state: string) => {
    setSelected((prev) =>
      prev.includes(state) ? (prev.length > 1 ? prev.filter((s) => s !== state) : prev) : prev.length < 3 ? [...prev, state] : prev
    );
  };

  const filteredData = useMemo(
    () => stateTimeSeriesData.filter((d) => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  // Build radar data from latest year in range
  const latestYear = filteredData[filteredData.length - 1];
  const radarData = selected.map((s) => ({
    state: stateLabels[s],
    capacity: latestYear?.[s as keyof typeof latestYear] as number || 0,
    // Normalize: growth = (latest - earliest) / earliest * 100
    growth: filteredData.length > 1
      ? Math.round(((latestYear?.[s as keyof typeof latestYear] as number || 0) - (filteredData[0]?.[s as keyof typeof filteredData[0]] as number || 1)) / (filteredData[0]?.[s as keyof typeof filteredData[0]] as number || 1) * 100)
      : 0,
  }));

  return (
    <section>
      <SectionHeader label="Compare" title="State Comparison Tool" description="Select up to 3 states to compare their renewable energy growth trajectories side-by-side." />

      {/* State Selection */}
      <div className="flex flex-wrap gap-3 mb-6">
        {allStates.map((s) => (
          <label
            key={s}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer transition-colors ${
              selected.includes(s) ? "border-primary/40 bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground"
            }`}
          >
            <Checkbox checked={selected.includes(s)} onCheckedChange={() => toggle(s)} />
            <div className="h-2 w-2 rounded-full" style={{ background: stateColors[s] }} />
            {stateLabels[s]}
          </label>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Line Chart */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
              <XAxis dataKey="year" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
              <RTooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {selected.map((s) => (
                <Line key={s} type="monotone" dataKey={s} name={stateLabels[s]} stroke={stateColors[s]} strokeWidth={2.5} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Summary Cards */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-4">
          {radarData.map((r) => (
            <div key={r.state} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground font-medium">{r.state}</p>
              <p className="text-xl font-bold text-foreground mt-1">{r.capacity.toLocaleString()} MW</p>
              <p className="text-xs mt-1">
                <span className={r.growth > 1000 ? "text-primary" : "text-accent"}>+{r.growth}%</span>
                <span className="text-muted-foreground"> growth ({yearRange[0]}–{yearRange[1]})</span>
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
