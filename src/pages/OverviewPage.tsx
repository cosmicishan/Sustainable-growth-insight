import { useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, Legend } from "recharts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Zap, Sun, TrendingUp } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { nationalTimeSeriesData } from "@/data/energyData";
import { useYearFilter } from "@/contexts/YearFilterContext";

const chartTooltipStyle = {
  background: "hsl(220,18%,10%)",
  border: "1px solid hsl(220,14%,18%)",
  borderRadius: "8px",
  color: "hsl(210,20%,92%)",
  fontSize: 12,
};

export default function OverviewPage() {
  const { yearRange } = useYearFilter();

  const filteredNational = useMemo(
    () => nationalTimeSeriesData.filter((d) => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  const latestData = filteredNational[filteredNational.length - 1];
  const earliestData = filteredNational[0];
  const growthMultiple = earliestData ? Math.round(latestData.total / earliestData.total) : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container py-8 space-y-8"
    >
      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: `Total RE Capacity (${yearRange[1]})`,
            value: latestData.total,
            prefix: "",
            suffix: " MW",
            subtitle: `${growthMultiple}x growth since ${yearRange[0]}`,
            accent: true,
            tooltip: "India's installed renewable energy capacity has grown exponentially, driven primarily by Solar and Wind.",
            icon: <Zap className="h-5 w-5" />,
          },
          {
            title: "Solar + Wind Share",
            value: 83.3,
            prefix: "",
            suffix: "%",
            decimals: 1,
            subtitle: "The twin-engine dominance",
            tooltip: "Solar (39.9%) and Wind (43.4%) together form the backbone of India's renewable energy infrastructure.",
            icon: <Sun className="h-5 w-5" />,
          },
          {
            title: `Gujarat (${yearRange[1]})`,
            value: 37500,
            prefix: "",
            suffix: " MW",
            subtitle: "Vertical surge since 2022",
            tooltip: "Gujarat shows a nearly vertical growth trajectory in the last two years.",
          },
          {
            title: "GSDP Growth",
            value: latestData.gsdp / 100000,
            prefix: "₹",
            suffix: "L Cr",
            decimals: 1,
            subtitle: "V-shaped recovery post-2020",
            tooltip: "India's GSDP showed a V-shaped recovery post-2020.",
            icon: <TrendingUp className="h-5 w-5" />,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`relative rounded-xl border p-5 ${
              stat.accent
                ? "border-primary/30 glow-border bg-gradient-card"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </p>
                <div
                  className={`mt-2 text-2xl font-bold ${
                    stat.accent ? "text-primary text-glow-primary" : "text-foreground"
                  }`}
                >
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                {stat.icon && (
                  <div className="text-primary">{stat.icon}</div>
                )}
                {stat.tooltip && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      <p>{stat.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* V-Recovery Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            The V-Recovery: GSDP & Renewable Capacity
          </h3>
          <p className="text-sm text-muted-foreground">
            India's GSDP transitioned into a high-velocity phase around 2010. The 2020 dip was followed by a stronger surge.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
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
      </motion.div>
    </motion.div>
  );
}
