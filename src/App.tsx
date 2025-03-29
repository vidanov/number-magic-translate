import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { useTranslation } from 'react-i18next';

const queryClient = new QueryClient();

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-white py-4 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
        <a 
          href="https://vidanov.com/blog" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          {t('Alexey Vidanov')}
        </a>
      </div>
    </footer>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/help" element={<Help />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
