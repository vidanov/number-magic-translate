import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HelpCircle, Github } from "lucide-react";
import { useTranslation } from 'react-i18next';

// Define available languages
const availableLanguages = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "ru", flag: "🇷🇺", name: "Русский" }
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Function to change language
  const handleLangChange = (langCode: string) => {
    // Get the current path without the language prefix
    const currentPath = location.pathname.replace(/^\/[a-z]{2}/, '');
    // If the path is empty or just '/', use '/'
    const newPath = currentPath === '' ? '/' : currentPath;
    
    // Navigate to the new path with the selected language
    navigate(`/${langCode}${newPath}`, { replace: true });
  };

  // Get the current language from the URL, ensuring it's a valid language code
  const currentLangCode = availableLanguages.find(lang => 
    location.pathname.startsWith(`/${lang.code}/`) || 
    location.pathname === `/${lang.code}`
  )?.code || 'en';

  return (
    // Use white background, increased padding, keep bottom border
    <nav className="w-full bg-white py-4 mb-6 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link
          to={`/${currentLangCode}`}
          // Keep title styling, ensure it stands out
          className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
        >
          {t('appTitle')} {/* Translate title */}
        </Link>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLangChange(lang.code)}
                // Use i18n.language for selected state
                className={`p-1 rounded transition-all duration-200 ${
                  currentLangCode === lang.code
                    ? "ring-2 ring-primary ring-offset-1 scale-110" // Highlight selected
                    : "hover:bg-gray-100" // Dim unselected, slight grow on hover
                }`}
                aria-label={`Switch to ${lang.name}`} // Use full name for accessibility
              >
                <span className="text-xl">{lang.flag}</span>
              </button>
            ))}
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/vidanov/number-magic-translate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Help Link */}
          <Link
            to={`/${currentLangCode}/help`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
