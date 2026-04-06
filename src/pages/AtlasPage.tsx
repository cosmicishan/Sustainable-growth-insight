import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Crown, Target, Compass } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { clusterData } from "@/data/energyData";

// Simplified India map using SVG paths for key states
const statePositions: Record<string, { x: number; y: number; label: string }> = {
  "Jammu & Kashmir": { x: 160, y: 40, label: "J&K" },
  "Himachal Pradesh": { x: 175, y: 85, label: "HP" },
  Punjab: { x: 148, y: 100, label: "PB" },
  Uttarakhand: { x: 210, y: 90, label: "UK" },
  Haryana: { x: 160, y: 120, label: "HR" },
  "Uttar Pradesh": { x: 240, y: 140, label: "UP" },
  Rajasthan: { x: 120, y: 170, label: "RJ" },
  Gujarat: { x: 80, y: 230, label: "GJ" },
  "Madhya Pradesh": { x: 200, y: 220, label: "MP" },
  Maharashtra: { x: 160, y: 290, label: "MH" },
  Chhattisgarh: { x: 260, y: 240, label: "CG" },
  Jharkhand: { x: 310, y: 200, label: "JH" },
  Bihar: { x: 310, y: 165, label: "BR" },
  "West Bengal": { x: 340, y: 210, label: "WB" },
  Odisha: { x: 300, y: 265, label: "OD" },
  Telangana: { x: 210, y: 320, label: "TS" },
  "Andhra Pradesh": { x: 230, y: 360, label: "AP" },
  Karnataka: { x: 165, y: 370, label: "KA" },
  Goa: { x: 130, y: 345, label: "GA" },
  Kerala: { x: 160, y: 430, label: "KL" },
  "Tamil Nadu": { x: 215, y: 420, label: "TN" },
  Assam: { x: 400, y: 140, label: "AS" },
  Meghalaya: { x: 385, y: 160, label: "ML" },
  Tripura: { x: 395, y: 185, label: "TR" },
  Mizoram: { x: 405, y: 200, label: "MZ" },
  Manipur: { x: 420, y: 165, label: "MN" },
  Nagaland: { x: 425, y: 140, label: "NL" },
  "Arunachal Pradesh": { x: 420, y: 110, label: "AR" },
  Sikkim: { x: 355, y: 145, label: "SK" },
};

function getCluster(state: string) {
  if (clusterData.titans.states.includes(state)) return "titans";
  if (clusterData.challengers.states.includes(state)) return "challengers";
  return "frontiers";
}

function getClusterColor(cluster: string) {
  if (cluster === "titans") return "hsl(45,90%,55%)";
  if (cluster === "challengers") return "hsl(210,90%,56%)";
  return "hsl(0,0%,55%)";
}

const clusterIcons = {
  titans: <Crown className="h-5 w-5" />,
  challengers: <Target className="h-5 w-5" />,
  frontiers: <Compass className="h-5 w-5" />,
};

export default function AtlasPage() {
  return (
    <div className="container py-10 space-y-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono font-semibold text-primary">
          Clustering Analysis
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          The <span className="text-primary text-glow-primary">Atlas</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          K-Means clustering reveals three distinct groups of Indian states based on renewable energy capacity and economic profile.
        </p>
      </motion.div>

      {/* Interactive Map */}
      <section>
        <SectionHeader label="India Map" title="State Clusters by Renewable Capacity" description="States are color-coded by cluster: Gold = High-Capacity Leaders, Blue = Developing Adopters, Gray = Emerging/Niche." />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6 overflow-hidden">
          <div className="flex justify-center">
            <svg viewBox="0 0 500 480" className="w-full max-w-2xl">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(220,14%,14%)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="500" height="480" fill="url(#grid)" />

              {/* State dots */}
              {Object.entries(statePositions).map(([state, pos]) => {
                const cluster = getCluster(state);
                const color = getClusterColor(cluster);
                const radius = cluster === "titans" ? 18 : cluster === "challengers" ? 14 : 10;

                return (
                  <g key={state}>
                    {/* Glow */}
                    <circle cx={pos.x} cy={pos.y} r={radius + 4} fill={color} opacity={0.15}>
                      {cluster === "titans" && (
                        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
                      )}
                    </circle>
                    {/* Main circle */}
                    <circle cx={pos.x} cy={pos.y} r={radius} fill={color} opacity={0.8} stroke={color} strokeWidth="1">
                      <title>{state}</title>
                    </circle>
                    {/* Label */}
                    <text x={pos.x} y={pos.y + 3.5} textAnchor="middle" fill="hsl(220,20%,6%)" fontSize="8" fontWeight="700" fontFamily="Space Grotesk">
                      {pos.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Cluster Details */}
      <section>
        <SectionHeader label="Cluster Profiles" title="Three Tiers of Renewable Adoption" />
        <div className="grid gap-6 md:grid-cols-3">
          {(["titans", "challengers", "frontiers"] as const).map((key, i) => {
            const cluster = clusterData[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border bg-card p-6"
                style={{ borderColor: cluster.color + "40" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: cluster.color + "20", color: cluster.color }}>
                    {clusterIcons[key]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{cluster.label}</h3>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full" style={{ background: cluster.color }} />
                      <span className="text-xs text-muted-foreground">{cluster.states.length} states</span>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger className="ml-auto"><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs"><p>{cluster.description}</p></TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.states.map((s) => (
                    <span key={s} className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Zonal Insight */}
      <section>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="rounded-xl border border-accent/20 bg-gradient-card p-8">
          <h3 className="text-lg font-bold text-foreground mb-3">Zonal Asymmetry: The Renewable Hegemony</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The South and West zones aren't just leading — they've created a <span className="text-accent font-semibold">Renewable Hegemony</span>, holding over 900,000 MW combined.
            This creates a competitive economic advantage for businesses operating in these zones due to greener supply chains and lower long-term energy costs.
            The East and North-East, despite their hydro potential, remain significantly underdeveloped in renewable capacity.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
