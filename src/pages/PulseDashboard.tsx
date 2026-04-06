import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, TrendingUp, Zap, Sun } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import AnimatedCounter from "@/components/AnimatedCounter";
import StateComparison from "@/components/StateComparison";
import DataTable from "@/components/DataTable";
import { nationalTimeSeriesData, energyMixData, stateTimeSeriesData, zoneData } from "@/data/energyData";
import { BarChart, Bar } from "recharts";
import { useYearFilter } from "@/contexts/YearFilterContext";

const stateColors: Record<string, string> = {
  Gujarat: "#3b82f6",
  Karnataka: "#f59e0b",
  Maharashtra: "#22c55e",
  Rajasthan: "#ef4444",
  TamilNadu: "#8b5cf6",
};

const chartTooltipStyle = { background: "hsl(220,18%,10%)", border: "1px solid hsl(220,14%,18%)", borderRadius: "8px", color: "hsl(210,20%,92%)", fontSize: 12 };

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20 },
};

const sectionVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PulseDashboard() {
  const { yearRange } = useYearFilter();

  const filteredNational = useMemo(
    () => nationalTimeSeriesData.filter((d) => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );
  const filteredState = useMemo(
    () => stateTimeSeriesData.filter((d) => d.year >= yearRange[0] && d.year <= yearRange[1]),
    [yearRange]
  );

  const latestData = filteredNational[filteredNational.length - 1];
  const earliestData = filteredNational[0];
  const growthMultiple = earliestData ? Math.round(latestData.total / earliestData.total) : 1;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="container py-10 space-y-16">
      {/* Hero */}
      <motion.div variants={sectionVariants} className="text-center">
        <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono font-semibold text-primary">
          Research Dashboard · {yearRange[0]}–{yearRange[1]}
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          SustainaGrowth <span className="text-primary text-glow-primary">India</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          A Data-Driven Analysis of Renewable Energy Installations & Their Impact on India's Economic Growth
        </p>
      </motion.div>

      {/* Key Stats with Animated Counters */}
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
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className={`relative rounded-xl border p-5 ${stat.accent ? "border-primary/30 glow-border bg-gradient-card" : "border-border bg-card"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.title}</p>
                <div className={`mt-2 text-2xl font-bold ${stat.accent ? "text-primary text-glow-primary" : "text-foreground"}`}>
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                {stat.icon && <div className="text-primary">{stat.icon}</div>}
                {stat.tooltip && (
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs"><p>{stat.tooltip}</p></TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Energy Mix Ring */}
      <motion.section variants={sectionVariants}>
        <SectionHeader label="Energy Profile" title="India's Renewable Energy Mix" description="Solar and Wind form the dominant twin-engines powering India's green transition." />
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={energyMixData} cx="50%" cy="50%" innerRadius={80} outerRadius={130} paddingAngle={3} dataKey="value" stroke="none">
                  {energyMixData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
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

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-foreground">Capacity by Zone</h3>
              <Tooltip>
                <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs"><p>South & West zones create a "Renewable Hegemony" with over 900,000 MW combined.</p></TooltipContent>
              </Tooltip>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                <XAxis dataKey="zone" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
                <RTooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="capacity" fill="hsl(210,90%,56%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.section>

      {/* V-Recovery Chart */}
      <motion.section variants={sectionVariants}>
        <SectionHeader label="Growth Trajectory" title="The V-Recovery: GSDP & Renewable Capacity" description="India's GSDP transitioned into a high-velocity phase around 2010. The 2020 dip was followed by a stronger surge." />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6">
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
              <Area yAxisId="left" type="monotone" dataKey="total" name="Total RE (MW)" stroke="hsl(142,60%,50%)" fill="url(#gradTotal)" strokeWidth={2} />
              <Area yAxisId="right" type="monotone" dataKey="gsdp" name="GSDP (₹ Cr)" stroke="hsl(45,90%,55%)" fill="url(#gradGsdp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.section>

      {/* State Comparison Tool (NEW) */}
      <StateComparison />

      {/* Composition Over Time */}
      <motion.section variants={sectionVariants}>
        <SectionHeader label="Composition" title="Renewable Energy Composition Over Time" description="Watch Solar power emerge from near-zero to become the dominant force." />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredNational}>
              <defs>
                <linearGradient id="gSolar" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(210,90%,56%)" stopOpacity={0.6} /><stop offset="95%" stopColor="hsl(210,90%,56%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="gWind" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(25,95%,55%)" stopOpacity={0.6} /><stop offset="95%" stopColor="hsl(25,95%,55%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="gHydro" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(142,60%,45%)" stopOpacity={0.6} /><stop offset="95%" stopColor="hsl(142,60%,45%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="gBiomass" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(0,75%,55%)" stopOpacity={0.6} /><stop offset="95%" stopColor="hsl(0,75%,55%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="gWaste" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(270,60%,60%)" stopOpacity={0.6} /><stop offset="95%" stopColor="hsl(270,60%,60%)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
              <XAxis dataKey="year" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
              <RTooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: "hsl(215,12%,55%)" }} />
              <Area type="monotone" dataKey="solar" name="Solar" stackId="1" stroke="hsl(210,90%,56%)" fill="url(#gSolar)" />
              <Area type="monotone" dataKey="wind" name="Wind" stackId="1" stroke="hsl(25,95%,55%)" fill="url(#gWind)" />
              <Area type="monotone" dataKey="hydro" name="Small Hydro" stackId="1" stroke="hsl(142,60%,45%)" fill="url(#gHydro)" />
              <Area type="monotone" dataKey="biomass" name="Bio-Mass" stackId="1" stroke="hsl(0,75%,55%)" fill="url(#gBiomass)" />
              <Area type="monotone" dataKey="waste" name="Waste to Energy" stackId="1" stroke="hsl(270,60%,60%)" fill="url(#gWaste)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.section>

      {/* Data Table (NEW) */}
      <DataTable />
    </motion.div>
  );
}
