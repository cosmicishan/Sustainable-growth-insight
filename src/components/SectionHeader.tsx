import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
      <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">{label}</span>
      <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
    </motion.div>
  );
}
