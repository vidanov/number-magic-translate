import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Help from "./pages/Help";
import Flashcards from "./pages/Flashcards";
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
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
};

// Separate component for the routes
const AppRoutes = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  useEffect(() => {
    // If we're at the root path, get the saved language
    if (location.pathname === '/') {
      const savedLang = localStorage.getItem('preferredLanguage') || 'en';
      // The language will be handled by the Navigate component
      localStorage.setItem('preferredLanguage', savedLang);
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Redirect root to default language */}
      <Route path="/" element={<Navigate to={`/${localStorage.getItem('preferredLanguage') || 'en'}`} replace />} />
      
      {/* Language-specific routes */}
      <Route path="/:lang" element={<LanguageRoute><Index /></LanguageRoute>} />
      <Route path="/:lang/help" element={<LanguageRoute><Help /></LanguageRoute>} />
      <Route path="/:lang/flashcards" element={<LanguageRoute><Flashcards /></LanguageRoute>} />
      <Route path="/:lang/translate/:number" element={<LanguageRoute><Index /></LanguageRoute>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
