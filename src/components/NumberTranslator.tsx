
import React, { useState, useRef, useEffect } from "react";
import { languages, Language } from "../utils/numToCodes";
import { useToast } from "@/hooks/use-toast";
import { Globe } from "lucide-react";

const NumberTranslator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [variations, setVariations] = useState<{ tokens: string[]; translation: string; groupingDisplay: string; isCustom?: boolean }[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const variationsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translateToken = (token: string): string => {
    // 2-digit translation
    if (token.length === 2) {
      return selectedLanguage.dictionary[token] || `???(${token})`;
    } else if (token.length === 1) {
      const paddedToken = token.padStart(2, "0");
      return selectedLanguage.dictionary[paddedToken] || `???(${token})`;
    } else {
      // Handle longer tokens by splitting them
      if (token.length % 2 !== 0) {
        const firstDigit = token.slice(0, 1);
        const rest = token.slice(1);
        return translateToken(firstDigit) + " " + translateToken(rest);
      } else {
        const first = token.slice(0, 2);
        const rest = token.slice(2);
        if (rest.length === 0) {
          return translateToken(first);
        }
        return translateToken(first) + " " + translateToken(rest);
      }
    }
  };

  const generateVariableGroupings = (digits: string): string[][] => {
    let results: string[][] = [];
    
    const generateCombinations = (index: number, currentGrouping: string[] = []) => {
      if (index === digits.length) {
        results.push([...currentGrouping]);
        return;
      }
      
      // Single digit
      currentGrouping.push(digits[index]);
      generateCombinations(index + 1, currentGrouping);
      currentGrouping.pop();
      
      // Two digits
      if (index + 1 < digits.length) {
        currentGrouping.push(digits.slice(index, index + 2));
        generateCombinations(index + 2, currentGrouping);
        currentGrouping.pop();
      }
    };
    
    generateCombinations(0);
    return results;
  };

  const containsSeparators = (input: string): boolean => {
    return /[-\s.,;:|/\\]/.test(input);
  };

  const extractCustomTokens = (input: string): string[] => {
    const cleanedInput = input.replace(/[^\d\-\s.,;:|/\\]/g, "");
    return cleanedInput.split(/[-\s.,;:|/\\]+/).filter(token => token.length > 0);
  };

  const processInput = (raw: string) => {
    let variationsList = [];
    
    const hasSeparators = containsSeparators(raw);
    const digitsOnly = raw.replace(/\D+/g, "");
    
    if (digitsOnly.length === 0) {
      toast({
        title: "No digits found",
        description: "Please enter some numbers to translate",
        variant: "destructive",
      });
      return [];
    }
    
    if (hasSeparators) {
      const customTokens = extractCustomTokens(raw);
      if (customTokens.length > 0) {
        const translation = customTokens.map(translateToken).join(" ");
        const groupingDisplay = customTokens.join("-");
        variationsList.push({ 
          tokens: customTokens, 
          translation, 
          groupingDisplay,
          isCustom: true
        });
      }
    }
    
    const groupings = generateVariableGroupings(digitsOnly);
    
    const autoVariationsList = groupings.map((tokens) => {
      const translation = tokens.map(translateToken).join(" ");
      const groupingDisplay = tokens.join("-");
      return { 
        tokens, 
        translation, 
        groupingDisplay,
        isCustom: false
      };
    });
    
    autoVariationsList.sort((a, b) => {
      const aUnknown = (a.translation.match(/\?\?\?/g) || []).length;
      const bUnknown = (b.translation.match(/\?\?\?/g) || []).length;
      
      if (aUnknown !== bUnknown) return aUnknown - bUnknown;
      
      return a.translation.length - b.translation.length;
    });
    
    variationsList = [...variationsList, ...autoVariationsList];
    
    return variationsList;
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input is empty",
        description: "Please enter some numbers to translate",
        variant: "destructive",
      });
      return;
    }
    
    setIsTranslating(true);
    
    setTimeout(() => {
      const newVariations = processInput(inputText);
      
      if (newVariations.length > 0) {
        setVariations(newVariations);
        setDisplayCount(Math.min(10, newVariations.length));
        
        const customGroupingExists = newVariations.some(v => v.isCustom === true);
        
        toast({
          title: "Translation complete",
          description: customGroupingExists 
            ? `Using your custom separators for the first translation. Found ${newVariations.length - 1} additional variations.`
            : `Found ${newVariations.length} possible variations`,
        });
      } else {
        toast({
          title: "No translations found",
          description: "Try a different input",
          variant: "destructive",
        });
      }
      
      setIsTranslating(false);
    }, 600);
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => Math.min(prev + 10, variations.length));
  };
  
  useEffect(() => {
    if (variations.length > 0 && variationsRef.current) {
      variationsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [variations]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTranslate();
    }
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setVariations([]);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:px-6">
      <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-8 text-center">
          Number Translator
        </h1>
        
        <div className="space-y-6">
          <div className="relative">
            <input
              className="w-full h-14 px-5 rounded-xl border-2 border-secondary bg-white text-foreground text-lg placeholder:text-muted-foreground focus-ring transition-all-custom"
              type="text"
              placeholder="Enter numbers (use - . , | / or spaces as separators)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Enter numbers to translate"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="relative inline-block">
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-accent" />
                <select 
                  value={selectedLanguage.id}
                  onChange={(e) => {
                    const language = languages.find(lang => lang.id === e.target.value);
                    if (language) handleLanguageChange(language);
                  }}
                  className="bg-transparent pr-8 py-1 focus:outline-none text-foreground cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <button
            className={`w-full h-14 rounded-xl bg-accent text-accent-foreground font-medium text-lg transition-all-custom hover:bg-accent/90 active:scale-[0.98] focus-ring ${isTranslating ? 'animate-pulse-subtle' : ''}`}
            onClick={handleTranslate}
            disabled={isTranslating}
          >
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>
      
      {variations.length > 0 && (
        <div 
          ref={variationsRef}
          className="glass rounded-2xl p-6 sm:p-8 animate-slide-up"
        >
          <h2 className="text-xl font-semibold mb-6 text-gradient">
            Translation Variations ({variations.length} found)
          </h2>
          
          <div className="space-y-4">
            {variations.slice(0, displayCount).map((variation, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-xl ${variation.isCustom 
                  ? 'bg-accent/10 border-2 border-accent animate-pulse-once' 
                  : 'bg-secondary border border-border'} animate-fade-in transition-all-custom hover:shadow-md`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {variation.isCustom && (
                  <div className="text-xs font-medium text-accent mb-1">
                    Using your custom separators
                  </div>
                )}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Grouping: {variation.groupingDisplay}
                </div>
                <div className="text-lg font-medium">
                  {variation.translation}
                </div>
              </div>
            ))}
          </div>
          
          {displayCount < variations.length && (
            <button
              className="mt-6 w-full py-3 rounded-xl border border-border bg-white text-foreground font-medium transition-all-custom hover:bg-secondary focus-ring"
              onClick={handleShowMore}
            >
              Show More Variations
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NumberTranslator;
