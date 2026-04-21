import { Link, useLocation, Navigate } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import jsPDF from "jspdf";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
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
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-full bg-background">
        {/* Left Sidebar */}
        <Sidebar collapsible="icon" className="border-r border-border">
          <SidebarHeader className="border-b border-border/50 pb-4">
            <Link to="/" className="flex items-center gap-2 px-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="sidebar-title text-sm font-bold tracking-tight text-foreground">
                SustainaGrowth
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            {/* Dashboard Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={item.label}
                        >
                          <Link to={item.path} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* Analysis Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Analysis</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {analysisNavItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={item.label}
                        >
                          <Link to={item.path} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* Pipeline Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Pipeline</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {pipelineNavItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={item.label}
                        >
                          <Link to={item.path} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Activity className="h-4 w-4 mr-2" />
                  <span>About</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  <span>Export PDF</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col">
          {/* Horizontal Menubar */}
          <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden border-t border-border"
                >
                  <nav className="p-4 space-y-2">
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    {mainNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Button
                          variant={
                            location.pathname === item.path ? "default" : "ghost"
                          }
                          className="w-full justify-start"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}

                    <SidebarSeparator />

                    <SidebarGroupLabel>Analysis</SidebarGroupLabel>
                    {analysisNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Button
                          variant={
                            location.pathname === item.path ? "default" : "ghost"
                          }
                          className="w-full justify-start"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}

                    <SidebarSeparator />

                    <SidebarGroupLabel>Pipeline</SidebarGroupLabel>
                    {pipelineNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Button
                          variant={
                            location.pathname === item.path ? "default" : "ghost"
                          }
                          className="w-full justify-start"
                          size="sm"
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        downloadPDF();
                        setMobileOpen(false);
                      }}
                      className="w-full border-primary/30 text-primary"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto">{children}</main>

          {/* Footer */}
          <footer className="border-t border-border/50 py-6 px-4">
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
