import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HelpCircle, Github } from "lucide-react";
import { useTranslation } from 'react-i18next'; // Import useTranslation

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
  const { t, i18n } = useTranslation(); // Get t function and i18n instance

  // Function to change language
  const handleLangChange = (langCode: string) => {
    i18n.changeLanguage(langCode); // Use i18n to change language
  };

  // Get the base language code (e.g., 'en' from 'en-US')
  const currentLangCode = i18n.language.split('-')[0];

  return (
    // Use white background, increased padding, keep bottom border
    <nav className="w-full bg-white py-4 mb-6 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
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
                    : "opacity-70 hover:opacity-100 hover:scale-105" // Dim unselected, slight grow on hover
                }`}
                aria-label={`Select language: ${lang.name}`} // Use full name for accessibility
                title={lang.name} // Add tooltip with language name
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
            className="flex items-center space-x-1 px-3 py-1 rounded-md transition-colors text-foreground hover:text-primary"
            aria-label="GitHub Repository"
          >
            <Github size={18} />
            <span className="sr-only">GitHub</span>
          </a>

          {/* Help Link */}
          <Link
            to="/help"
            // Simplified link styling
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors text-foreground hover:text-primary ${
              location.pathname === "/help" ? "text-primary font-medium" : "" // Subtle active state
            }`}
          >
            <HelpCircle size={18} />
            <span>{t('navHelp')}</span> {/* Translate Help text */}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
