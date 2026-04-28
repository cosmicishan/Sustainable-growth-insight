import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Brain,
  Map,
  FileText,
  Download,
  Menu,
  X,
  ChevronRight,
  LayoutDashboard,
  Settings,
  PieChart,
  TrendingUp,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import jsPDF from "jspdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard, section: "Dashboard" },
  { path: "/energy-mix", label: "Energy Mix", icon: PieChart, section: "Dashboard" },
  { path: "/growth-trajectory", label: "Growth Trajectory", icon: TrendingUp, section: "Dashboard" },
  { path: "/state-comparison", label: "State Comparison", icon: Activity, section: "Dashboard" },
  { path: "/composition", label: "Energy Composition", icon: Zap, section: "Dashboard" },
];

const analysisNavItems = [
  { path: "/matrix", label: "Matrix", icon: Brain, section: "Analysis" },
  { path: "/atlas", label: "Atlas", icon: Map, section: "Analysis" },
  { path: "/results", label: "Results", icon: FileText, section: "Analysis" },
];

const pipelineNavItems = [
  { path: "/pipeline", label: "Pipeline", icon: Settings, section: "Pipeline" },
];

function downloadPDF() {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("SustainaGrowth India", 20, 20);
  doc.setFontSize(12);
  doc.text("Research Summary: Renewable Energy & GSDP Analysis", 20, 30);
  doc.setFontSize(10);
  const lines = [
    "",
    "Key Findings:",
    "",
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

const NavItem = ({
  item,
  isActive,
}: {
  item: { path: string; label: string; icon: React.FC<{ className: string }> };
  isActive: boolean;
}) => {
  return (
    <Link to={item.path} className="group relative">
      <div
        className={`
          relative flex items-center gap-3 px-4 py-3 rounded-xl
          transition-all duration-300 ease-out
          ${
            isActive
              ? "bg-primary/15 text-primary shadow-lg"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          }
        `}
      >
        {/* Active glow effect */}
        {isActive && (
          <>
            <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_12px_hsl(142_60%_50%_/_0.6)]" />
          </>
        )}

        {/* Icon with glow when active */}
        <div
          className={`
            relative flex items-center justify-center
            transition-all duration-300
            ${isActive ? "scale-110" : "group-hover:scale-110"}
          `}
        >
          <item.icon
            className={`h-5 w-5 ${isActive ? "drop-shadow-[0_0_8px_hsl(142_60%_50%_/_0.8)]" : ""}`}
          />
        </div>

        {/* Label */}
        <span className="text-sm font-medium tracking-wide">{item.label}</span>
      </div>
    </Link>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getSectionTitle = () => {
    const allItems = [...mainNavItems, ...analysisNavItems, ...pipelineNavItems];
    const currentItem = allItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      return { section: currentItem.section, title: currentItem.label };
    }
    return { section: "Dashboard", title: "Overview" };
  };

  const { section, title } = getSectionTitle();

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] h-screen fixed left-0 top-0 border-r border-white/10 bg-[hsl(220_18%_8%)] backdrop-blur-xl z-50">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-[0_0_20px_hsl(142_60%_50%_/_0.4)]">
            <Activity className="h-5 w-5 text-primary-foreground" />
            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              SustainaGrowth
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
              India Analytics
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* Dashboard Section */}
          <div>
            <div className="flex items-center gap-2 px-4 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-primary/70" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Dashboard
              </span>
            </div>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4" />

          {/* Analysis Section */}
          <div>
            <div className="flex items-center gap-2 px-4 mb-2">
              <Brain className="h-3.5 w-3.5 text-primary/70" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Analysis
              </span>
            </div>
            <div className="space-y-1">
              {analysisNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4" />

          {/* Pipeline Section */}
          <div>
            <div className="flex items-center gap-2 px-4 mb-2">
              <Settings className="h-3.5 w-3.5 text-primary/70" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Pipeline
              </span>
            </div>
            <div className="space-y-1">
              {pipelineNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
                  text-muted-foreground hover:text-foreground hover:bg-white/5
                  transition-all duration-200"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-[hsl(220_18%_10%)] border-white/10"
            >
              <DropdownMenuItem className="text-foreground">
                <Activity className="h-4 w-4 mr-2 text-primary" />
                <span>About</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-foreground"
                onClick={downloadPDF}
              >
                <Download className="h-4 w-4 mr-2 text-primary" />
                <span>Export PDF</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 h-screen w-[280px] bg-[hsl(220_18%_8%)] border-r border-white/10 z-50 overflow-y-auto"
            >
              {/* Mobile Logo */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gradient-accent flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-foreground">SustainaGrowth</h1>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">India Analytics</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Nav */}
              <nav className="p-3 space-y-4">
                <div>
                  <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Dashboard
                  </span>
                  <div className="mt-2 space-y-1">
                    {mainNavItems.map((item) => (
                      <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                        <Button
                          variant={location.pathname === item.path ? "default" : "ghost"}
                          className="w-full justify-start h-11"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Analysis
                  </span>
                  <div className="mt-2 space-y-1">
                    {analysisNavItems.map((item) => (
                      <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                        <Button
                          variant={location.pathname === item.path ? "default" : "ghost"}
                          className="w-full justify-start h-11"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Pipeline
                  </span>
                  <div className="mt-2 space-y-1">
                    {pipelineNavItems.map((item) => (
                      <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                        <Button
                          variant={location.pathname === item.path ? "default" : "ghost"}
                          className="w-full justify-start h-11"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Mobile Footer */}
              <div className="p-3 border-t border-white/10 mt-4">
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => {
                    downloadPDF();
                    setMobileOpen(false);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-[260px] h-screen overflow-hidden">
        {/* Horizontal Header Bar */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-white/5 text-muted-foreground"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {section}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPDF}
                className="hidden md:flex border-primary/30 text-primary hover:bg-primary/10"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Export PDF
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 py-6 px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              SustainaGrowth India — A Data-Driven Analysis of Renewable
              Energy & GSDP
            </p>
            <p className="mt-1 text-xs">
              Research powered by Machine Learning · Random Forest Regressor ·
              Data: 2006–2024
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
