import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HelpCircle, Github, BookOpen, Home } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Define available languages
const availableLanguages = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "pl", flag: "🇵🇱", name: "Polski" },
  { code: "pt", flag: "🇵🇹", name: "Português" }
];

const STORAGE_KEY = 'preferredLanguage';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  // Get current language from URL or localStorage
  const currentLangCode = availableLanguages.find(lang => 
    location.pathname.startsWith(`/${lang.code}/`) || 
    location.pathname === `/${lang.code}`
  )?.code || localStorage.getItem(STORAGE_KEY) || 'en';

  // Effect to handle initial language routing
  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang && !location.pathname.includes(`/${savedLang}/`)) {
      // If we have a saved language but aren't on that language's path,
      // redirect to the saved language
      const newPath = location.pathname === '/' ? `/${savedLang}` : 
        location.pathname.replace(/^\/[a-z]{2}/, `/${savedLang}`);
      navigate(newPath, { replace: true });
    }
  }, []);

  const handleLangChange = async (langCode: string) => {
    // Save the selected language
    localStorage.setItem(STORAGE_KEY, langCode);
    
    // Change the i18n language
    await i18n.changeLanguage(langCode);
    
    // Update the URL
    const currentPath = location.pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = currentPath === '' ? '/' : currentPath;
    navigate(`/${langCode}${newPath}`);
  };

  // Function to check if a path is active
  const isActivePath = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <nav className="w-full bg-white py-4 mb-6 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          {/* Home Link */}
          <Link
            to={`/${currentLangCode}`}
            className={cn(
              "flex items-center space-x-2 text-xl font-semibold transition-colors",
              isActivePath(`/${currentLangCode}`) && !isActivePath('/flashcards') && !isActivePath('/help')
                ? "text-primary"
                : "text-foreground hover:text-primary"
            )}
          >
            <Home className="w-5 h-5" />
            <span>{t('appTitle')}</span>
          </Link>

          {/* Main Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to={`/${currentLangCode}/flashcards`}
              className={cn(
                "flex items-center space-x-2 font-medium transition-colors",
                isActivePath('/flashcards')
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <BookOpen className="w-5 h-5" />
              <span>{t('navFlashcards')}</span>
            </Link>

            <Link
              to={`/${currentLangCode}/help`}
              className={cn(
                "flex items-center space-x-2 font-medium transition-colors",
                isActivePath('/help')
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <HelpCircle className="w-5 h-5" />
              <span>{t('navHelp')}</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2">
                <span className="sr-only">{t("selectLanguage")}</span>
                <span className="mr-2">
                  {availableLanguages.find(lang => lang.code === currentLangCode)?.flag}
                </span>
                <span className="hidden sm:inline">
                  {availableLanguages.find(lang => lang.code === currentLangCode)?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={cn(
                    "cursor-pointer",
                    currentLangCode === lang.code && "bg-accent"
                  )}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* GitHub Link - Styled differently as external link */}
          <a
            href="https://github.com/vidanov/number-magic-translate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors border-l pl-4"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
