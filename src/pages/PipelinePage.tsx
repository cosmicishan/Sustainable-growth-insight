import { motion } from "framer-motion";
import { Settings, Database, Workflow, BarChart3, FileText, ArrowRight } from "lucide-react";

const pipelineSteps = [
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data Ingestion",
    description: "Collect and aggregate state-level renewable energy data from multiple sources including MNRE, CEA, and NITI Aayog.",
    status: "Coming Soon",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Data Processing",
    description: "Clean, normalize, and transform raw data into structured features for ML model consumption.",
    status: "Coming Soon",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Feature Engineering",
    description: "Generate polynomial features, handle categorical encoding, and apply feature scaling.",
    status: "Coming Soon",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Model Training",
    description: "Train Polynomial Regression and Random Forest models on processed features for GSDP prediction.",
    status: "Coming Soon",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Prediction & Analysis",
    description: "Generate predictions, compute feature importance, and produce actionable insights.",
    status: "Coming Soon",
  },
];

export default function PipelinePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container py-8"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Data Pipeline</h2>
          <p className="text-sm text-muted-foreground mt-2">
            End-to-end workflow from raw data to ML-powered insights.
          </p>
        </div>

        <div className="space-y-4">
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <span className="rounded-full bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                    {step.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < pipelineSteps.length - 1 && (
                <ArrowRight className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 h-4 w-4 text-muted-foreground rotate-90 md:left-auto md:right-6 md:translate-x-0 md:rotate-0" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-xl border border-accent/20 bg-gradient-card p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            This pipeline visualization will be implemented in a future update.
            Check back soon for live pipeline status and execution metrics.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
