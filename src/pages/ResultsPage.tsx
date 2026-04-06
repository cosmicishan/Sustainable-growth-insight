import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ArrowUpRight, ShieldCheck, AlertTriangle, Lightbulb, TrendingUp, Leaf, Factory, Recycle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const insights = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "The Growth Pivot",
    description: "India's GSDP transitioned into a high-velocity phase around 2010, coinciding with the launch of the National Solar Mission. This marks a deliberate policy-to-growth inflection point.",
    significance: "Confirms that strategic policy intervention (National Solar Mission 2010) directly catalyzed economic acceleration.",
    color: "hsl(142,60%,50%)",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "The V-Shaped Recovery & Decoupling",
    description: "India's GSDP showed a V-shaped recovery post-2020, while renewable energy capacity continued its upward trajectory without interruption. Green infrastructure has become 'recession-proof.'",
    significance: "Renewable energy investments are decoupled from short-term market volatility — a critical indicator for long-term infrastructure planning.",
    color: "hsl(210,90%,56%)",
  },
  {
    icon: <ArrowUpRight className="h-5 w-5" />,
    title: "The 2022 Inflection Point",
    description: "Gujarat and Karnataka show a distinct 'vertical breakout' starting in 2022. This isn't incremental growth — it's a structural shift in how these states power their industrial bases.",
    significance: "Massive spikes in RE capacity in 2022–2024 act as lead indicators for subsequent industrial economic surges.",
    color: "hsl(45,90%,55%)",
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "The Gujarat Surge",
    description: "Gujarat leads India with ~37,500 MW as of 2024, showing a nearly vertical growth trajectory. The state's capacity more than doubled from 17,500 MW (2022) in just two years.",
    significance: "Gujarat's aggressive solar deployment creates a blueprint for other states seeking rapid clean energy industrialization.",
    color: "hsl(25,95%,55%)",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "The Solar-Wind Engine",
    description: "Together, Solar (39.9%) and Wind (43.4%) constitute 83.3% of India's renewable energy profile. This dual-source concentration shapes the entire sector.",
    significance: "Portfolio concentration risk: over-reliance on two sources makes the energy mix vulnerable to technology-specific disruptions.",
    color: "hsl(142,60%,45%)",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Zonal Renewable Hegemony",
    description: "South and West zones hold over 900,000 MW combined capacity. This asymmetry creates a two-speed India — zones with green competitive advantage vs. those without.",
    significance: "Businesses in South/West zones benefit from greener supply chains, while East and North-East states need urgent policy focus.",
    color: "hsl(270,60%,60%)",
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "The Stagnant Segments",
    description: "Waste-to-Energy (0.2%) and Small Hydro (6.3%) show a flat-line trend across 18 years. These are 'frozen' segments that haven't scaled despite available resources.",
    significance: "Urgent policy intervention needed to diversify beyond Solar and Wind — especially Waste-to-Energy for sustainable urban growth.",
    color: "hsl(0,75%,55%)",
  },
  {
    icon: <Recycle className="h-5 w-5" />,
    title: "Source Specialization & Geographic Lock",
    description: "While Solar and Wind scale nationally, Small Hydro remains locked to hilly terrains (Himachal, Uttarakhand) and Bio-Mass to agricultural belts (Maharashtra, UP).",
    significance: "Geographic constraints mean these niche sources cannot be the foundation of a national strategy — but remain vital for regional energy security.",
    color: "hsl(190,80%,50%)",
  },
];

export default function ResultsPage() {
  return (
    <div className="container py-10 space-y-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono font-semibold text-primary">
          Research Findings
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Key <span className="text-primary text-glow-primary">Insights</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Critical findings from our data-driven analysis of India's renewable energy landscape and its economic impact.
        </p>
      </motion.div>

      {/* Insights Grid */}
      <section>
        <SectionHeader label="Findings" title="Research-Backed Insights" description="Each insight is derived from statistical analysis, ML modeling, and 19 years of state-level data." />
        <div className="grid gap-6 md:grid-cols-2">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 shrink-0 rounded-lg flex items-center justify-center" style={{ background: insight.color + "15", color: insight.color }}>
                  {insight.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-foreground">{insight.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-start gap-1.5">
                      <Tooltip>
                        <TooltipTrigger><Info className="h-3 w-3 text-primary mt-0.5 shrink-0" /></TooltipTrigger>
                        <TooltipContent className="text-xs max-w-xs"><p>This finding is backed by statistical analysis of the 2006-2024 dataset.</p></TooltipContent>
                      </Tooltip>
                      <p className="text-xs text-foreground/80"><span className="font-semibold text-primary">Research Significance: </span>{insight.significance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future GSDP Visualization */}
      <section>
        <SectionHeader label="Projections" title="Future GSDP Trajectory" description="ML-powered predictions showing the economic impact of renewable energy expansion through 2035." />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-accent/20 glow-border bg-gradient-card p-8 flex flex-col items-center"
        >
          <div className="relative w-full max-w-4xl">
            <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-xl" />
            <img
              src="/future_gsdp.png"
              alt="Future GSDP Predictions Chart"
              className="relative w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            <span>Predictions generated using Polynomial Regression model trained on 2006-2024 state-level data</span>
          </div>
        </motion.div>
      </section>

      {/* Conclusion */}
      <section>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="rounded-xl border border-primary/20 glow-border bg-gradient-card p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">Conclusion</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our analysis conclusively demonstrates that renewable energy capacity is a <span className="text-primary font-semibold">strong positive predictor</span> of state-level economic growth in India.
            The Random Forest model (R² = 0.87) identifies Total Renewable Capacity, Solar Power, and Population as the top three predictors of GSDP.
            States that aggressively scaled their renewable infrastructure — particularly Gujarat, Karnataka, and Maharashtra —
            have positioned themselves as both energy leaders and economic powerhouses, creating a virtuous cycle of
            <span className="text-accent font-semibold"> green growth</span> that is resilient to macroeconomic shocks.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
