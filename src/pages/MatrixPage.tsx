import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from "recharts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Info, Brain, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { featureImportanceData, correlationData } from "@/data/energyData";

const chartTooltipStyle = { background: "hsl(220,18%,10%)", border: "1px solid hsl(220,14%,18%)", borderRadius: "8px", color: "hsl(210,20%,92%)", fontSize: 12 };

const API_BASE_URL = "https://model-api-sigma.vercel.app";

interface PredictionResult {
  state: string;
  base_year: number;
  target_year: number;
  years_ahead: number;
  predicted_gsdp: number;
  unit: string;
}

const states = ["Gujarat", "Maharashtra", "Tamil Nadu", "Karnataka", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh", "Andhra Pradesh", "Telangana", "Kerala"];

export default function MatrixPage() {
  const [selectedState, setSelectedState] = useState("Gujarat");
  const [targetYear, setTargetYear] = useState(2030);
  const [solarGrowth, setSolarGrowth] = useState(1500);
  const [windGrowth, setWindGrowth] = useState(800);
  const [biomassGrowth, setBiomassGrowth] = useState(0);
  const [hydroGrowth, setHydroGrowth] = useState(0);
  const [wasteGrowth, setWasteGrowth] = useState(0);
  const [popGrowthRate, setPopGrowthRate] = useState(0.012);
  const [predicted, setPredicted] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/predict-from-base`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: selectedState,
          year: targetYear,
          pop_growth_rate: popGrowthRate,
          solar_growth: solarGrowth,
          wind_growth: windGrowth,
          biomass_growth: biomassGrowth,
          hydro_growth: hydroGrowth,
          waste_growth: wasteGrowth,
        }),
      });
      const data = await response.json();
      console.log("API Response:", data);
      if (!response.ok) {
        setError(data.detail || data.error || `HTTP ${response.status}`);
      } else if (data.error) {
        setError(data.error);
      } else if (data.predicted_gsdp === null || isNaN(data.predicted_gsdp)) {
        setError("Model returned invalid prediction. Check if state data exists.");
      } else {
        setPredicted(data);
      }
    } catch (err) {
      setError(`Failed to connect to API: ${err instanceof Error ? err.message : String(err)}`);
    }
    setLoading(false);
  };

  return (
    <div className="container py-10 space-y-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono font-semibold text-primary">
          Predictive Engine
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          The <span className="text-primary text-glow-primary">Matrix</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          ML-powered analysis using Polynomial Regression to predict GSDP from renewable energy features.
        </p>
      </motion.div>

      {/* ML Explanation */}
      <section>
        <SectionHeader label="Model Architecture" title="Polynomial Regression" description="Our model uses polynomial feature transformation with linear regression, trained on state-level data from 2006-2024 to predict economic output." />
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Model Type" value="Polynomial Regression" subtitle="Degree 2 polynomial features" tooltip="Polynomial regression captures non-linear relationships by transforming features into higher-degree terms before applying linear regression." icon={<Brain className="h-5 w-5" />} delay={0.1} />
          <StatCard title="R² Score" value="0.87" subtitle="Strong predictive power" accent tooltip="The model explains 87% of the variance in GSDP, confirming strong correlation between RE capacity and economic growth." icon={<Cpu className="h-5 w-5" />} delay={0.2} />
          <StatCard title="Training Data" value="570+ samples" subtitle="28 states × 19 years" tooltip="State-wise annual data covering Solar, Wind, Hydro, Bio-Mass, Waste-to-Energy, Population, and GSDP." delay={0.3} />
        </div>
      </section>

      {/* Feature Importance */}
      <section>
        <SectionHeader label="Feature Analysis" title="Feature Importance Ranking" description="Total Renewable Capacity and Solar Power are the highest-impact predictors of state-level GSDP." />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={featureImportanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
              <XAxis type="number" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} domain={[0, 0.5]} />
              <YAxis type="category" dataKey="feature" width={180} tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
              <RTooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [`${(v * 100).toFixed(1)}%`, "Importance"]} />
              <Bar dataKey="importance" radius={[0, 6, 6, 0]} fill="hsl(142,60%,50%)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* Correlation Scatter */}
      <section>
        <SectionHeader label="Correlation" title="Renewable Capacity vs GSDP" description="Strong positive linear relationship confirms that states investing in RE infrastructure see proportional economic growth." />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-6">
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
              <XAxis type="number" dataKey="totalRE" name="Total RE (MW)" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
              <YAxis type="number" dataKey="gsdp" name="GSDP (₹ Cr)" tick={{ fill: "hsl(215,12%,55%)", fontSize: 11 }} />
              <ZAxis range={[40, 40]} />
              <RTooltip contentStyle={chartTooltipStyle} />
              <Scatter data={correlationData} fill="hsl(210,90%,56%)" />
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* Prediction Simulator */}
      <section>
        <SectionHeader label="Simulator" title="Future Prediction Calculator" description="Select a state, set your target year and growth parameters to get GSDP predictions from our Polynomial Regression model via the API." />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-primary/20 glow-border bg-gradient-card p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Select State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Target Year</label>
                <Input
                  type="number"
                  value={targetYear}
                  onChange={(e) => setTargetYear(parseInt(e.target.value) || 2030)}
                  min={2025}
                  max={2050}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    ☀️ Annual Solar Growth (MW)
                    <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger><TooltipContent className="text-xs"><p>Yearly addition to solar capacity.</p></TooltipContent></Tooltip>
                  </label>
                  <span className="font-mono text-sm text-primary">{solarGrowth.toLocaleString()} MW/yr</span>
                </div>
                <Slider value={[solarGrowth]} onValueChange={([v]) => setSolarGrowth(v)} min={0} max={5000} step={100} className="w-full" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    💨 Annual Wind Growth (MW)
                    <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger><TooltipContent className="text-xs"><p>Yearly addition to wind capacity.</p></TooltipContent></Tooltip>
                  </label>
                  <span className="font-mono text-sm text-primary">{windGrowth.toLocaleString()} MW/yr</span>
                </div>
                <Slider value={[windGrowth]} onValueChange={([v]) => setWindGrowth(v)} min={0} max={5000} step={100} className="w-full" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    🌱 Annual Bio-Mass Growth (MW)
                    <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger><TooltipContent className="text-xs"><p>Yearly addition to bio-mass capacity.</p></TooltipContent></Tooltip>
                  </label>
                  <span className="font-mono text-sm text-primary">{biomassGrowth.toLocaleString()} MW/yr</span>
                </div>
                <Slider value={[biomassGrowth]} onValueChange={([v]) => setBiomassGrowth(v)} min={0} max={5000} step={50} className="w-full" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    💧 Annual Small Hydro Growth (MW)
                    <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger><TooltipContent className="text-xs"><p>Yearly addition to small hydro capacity.</p></TooltipContent></Tooltip>
                  </label>
                  <span className="font-mono text-sm text-primary">{hydroGrowth.toLocaleString()} MW/yr</span>
                </div>
                <Slider value={[hydroGrowth]} onValueChange={([v]) => setHydroGrowth(v)} min={0} max={5000} step={50} className="w-full" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    ♻️ Annual Waste-to-Energy Growth (MW)
                    <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger><TooltipContent className="text-xs"><p>Yearly addition to waste-to-energy capacity.</p></TooltipContent></Tooltip>
                  </label>
                  <span className="font-mono text-sm text-primary">{wasteGrowth.toLocaleString()} MW/yr</span>
                </div>
                <Slider value={[wasteGrowth]} onValueChange={([v]) => setWasteGrowth(v)} min={0} max={5000} step={10} className="w-full" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    👥 Population Growth Rate
                    <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger><TooltipContent className="text-xs"><p>Annual population growth rate (e.g., 0.012 = 1.2%).</p></TooltipContent></Tooltip>
                  </label>
                  <span className="font-mono text-sm text-primary">{(popGrowthRate * 100).toFixed(1)}%</span>
                </div>
                <Slider value={[popGrowthRate]} onValueChange={([v]) => setPopGrowthRate(v)} min={0} max={0.05} step={0.001} className="w-full" />
              </div>

              <Button onClick={handlePredict} disabled={loading} className="w-full">
                {loading ? "Predicting..." : "Generate Prediction"}
              </Button>

              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  ⚠️ {error}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Predicted GSDP</p>
              {predicted ? (
                <>
                  <motion.p
                    key={predicted.predicted_gsdp}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold text-accent text-glow-accent md:text-5xl"
                  >
                    ₹{(predicted.predicted_gsdp / 100000).toFixed(1)}L Cr
                  </motion.p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {predicted.state}: {predicted.base_year} → {predicted.target_year} ({predicted.years_ahead} years)
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Unit: {predicted.unit}</p>
                </>
              ) : (
                <p className="text-muted-foreground text-center">
                  Click "Generate Prediction" to see results
                </p>
              )}
              <div className="mt-6 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground max-w-xs text-center">
                <Info className="h-3 w-3 inline mr-1" />
                Prediction powered by Polynomial Regression model via FastAPI backend.
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
