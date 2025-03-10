
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, HelpCircle } from "lucide-react";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-accent/10 py-3 mb-6 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-semibold text-accent-foreground hover:text-accent transition-colors"
        >
          Number Translator
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link
            to="/help"
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
              location.pathname === "/help" 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent/20"
            }`}
          >
            <HelpCircle size={18} />
            <span>Help</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
