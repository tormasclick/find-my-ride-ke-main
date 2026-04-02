import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CarsPage from "./pages/CarsPage.tsx";
import TrendingPage from "./pages/TrendingPage.tsx";
import CarDetailPage from "./pages/CarDetailPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import SellPage from "./pages/SellPage.tsx";
import ValueMyCarPage from "./pages/ValueMyCarPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/trending" element={<TrendingPage />} />
          <Route path="/cars/:slug" element={<CarDetailPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/value-my-car" element={<ValueMyCarPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
