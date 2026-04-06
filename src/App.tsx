import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { YearFilterProvider } from "@/contexts/YearFilterContext";
import Layout from "@/components/Layout";
import PulseDashboard from "@/pages/PulseDashboard";
import MatrixPage from "@/pages/MatrixPage";
import AtlasPage from "@/pages/AtlasPage";
import ResultsPage from "@/pages/ResultsPage";
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
              <Route path="/" element={<PulseDashboard />} />
              <Route path="/matrix" element={<MatrixPage />} />
              <Route path="/atlas" element={<AtlasPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </YearFilterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
