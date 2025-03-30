import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const queryClient = new QueryClient();

// Define available languages
const availableLanguages = ['en', 'de', 'es', 'fr', 'it', 'ru'];

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

const LanguageRoute = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Only change language if it's different from current and is a supported language
    if (lang && i18n.language !== lang && availableLanguages.includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, location.pathname]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              {/* Redirect root to default language */}
              <Route path="/" element={<Navigate to="/en" replace />} />
              
              {/* Language-specific routes */}
              <Route path="/:lang" element={<LanguageRoute><Index /></LanguageRoute>} />
              <Route path="/:lang/help" element={<LanguageRoute><Help /></LanguageRoute>} />
              <Route path="/:lang/translate/:number" element={<LanguageRoute><Index /></LanguageRoute>} />
              
              {/* Catch-all route */}
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
