import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Responsables from "./pages/Responsables";
import Estudiantes from "./pages/Estudiantes";
import Cartera from "./pages/Cartera";
import Pagos from "./pages/Pagos";
import Mensajeria from "./pages/Mensajeria";
import Colegios from "./pages/Colegios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/responsables" element={<Responsables />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/cartera" element={<Cartera />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/mensajeria" element={<Mensajeria />} />
          <Route path="/colegios" element={<Colegios />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
