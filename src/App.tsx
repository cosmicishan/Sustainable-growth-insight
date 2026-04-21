import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { YearFilterProvider } from "@/contexts/YearFilterContext";
import Layout from "@/components/Layout";
import OverviewPage from "@/pages/OverviewPage";
import EnergyMixPage from "@/pages/EnergyMixPage";
import GrowthTrajectoryPage from "@/pages/GrowthTrajectoryPage";
import StateComparisonPage from "@/pages/StateComparisonPage";
import CompositionPage from "@/pages/CompositionPage";
import MatrixPage from "@/pages/MatrixPage";
import AtlasPage from "@/pages/AtlasPage";
import ResultsPage from "@/pages/ResultsPage";
import PipelinePage from "@/pages/PipelinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <YearFilterProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/energy-mix" element={<EnergyMixPage />} />
              <Route path="/growth-trajectory" element={<GrowthTrajectoryPage />} />
              <Route path="/state-comparison" element={<StateComparisonPage />} />
              <Route path="/composition" element={<CompositionPage />} />
              <Route path="/matrix" element={<MatrixPage />} />
              <Route path="/atlas" element={<AtlasPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/pipeline" element={<PipelinePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </YearFilterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
