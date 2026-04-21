import { motion } from "framer-motion";
import StateComparison from "@/components/StateComparison";
import DataTable from "@/components/DataTable";

export default function StateComparisonPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container py-8 space-y-8"
    >
      <StateComparison />
      <DataTable />
    </motion.div>
  );
}
