import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Brain, Map, FileText, Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import jsPDF from "jspdf";

const navItems = [
  { path: "/", label: "Pulse", icon: Activity, description: "Dashboard" },
  { path: "/matrix", label: "Matrix", icon: Brain, description: "Predictive Engine" },
  { path: "/atlas", label: "Atlas", icon: Map, description: "Clustering" },
  { path: "/results", label: "Results", icon: FileText, description: "Insights" },
];

function downloadPDF() {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("SustainaGrowth India", 20, 20);
  doc.setFontSize(12);
  doc.text("Research Summary: Renewable Energy & GSDP Analysis", 20, 30);
  doc.setFontSize(10);
  const lines = [
    "", "Key Findings:", "",
    "1. India's renewable capacity grew from ~10,400 MW (2006) to ~154,000 MW (2024).",
    "2. Solar (39.9%) and Wind (43.4%) constitute 83.3% of the energy mix.",
    "3. Gujarat leads with ~37,500 MW as of 2024.",
    "4. South & West zones hold over 900,000 MW combined capacity.",
    "5. Strong positive correlation between Total RE and GSDP (R² > 0.85).",
    "6. Random Forest model identifies Total RE, Solar, and Population as top predictors.",
    "7. V-shaped GSDP recovery post-2020 while RE capacity continued climbing.",
    "8. Waste-to-Energy (0.2%) identified as primary growth opportunity.",
    "9. 2022 inflection point: structural shift in Gujarat and Karnataka.",
    "10. Green infrastructure shown to be recession-proof (decoupling phenomenon).",
  ];
  lines.forEach((line, i) => doc.text(line, 20, 45 + i * 7));
  doc.save("SustainaGrowth_India_Research_Summary.pdf");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-foreground">SustainaGrowth</span>
              <span className="text-sm font-light text-primary ml-1">India</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}
                  >
                    <item.icon className="h-4 w-4 mr-1.5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Button variant="outline" size="sm" onClick={downloadPDF} className="border-primary/30 text-primary hover:bg-primary/10">
              <Download className="h-4 w-4 mr-1.5" />
              Export PDF
            </Button>
          </nav>

          {/* Mobile toggle */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-border p-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <Button variant={location.pathname === item.path ? "default" : "ghost"} className="w-full justify-start" size="sm">
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label} — {item.description}
                </Button>
              </Link>
            ))}
            <Button variant="outline" size="sm" onClick={downloadPDF} className="w-full border-primary/30 text-primary">
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
          </motion.div>
        )}
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>SustainaGrowth India — A Data-Driven Analysis of Renewable Energy & GSDP</p>
          <p className="mt-1 text-xs">Research powered by Machine Learning · Random Forest Regressor · Data: 2006–2024</p>
        </div>
      </footer>
    </div>
  );
}
