import React, { useState, useRef, useEffect } from "react";
import { languages, Language } from "../utils/numToCodes";
import { useToast } from "@/hooks/use-toast";
import { Globe, Lightbulb, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NumberTranslator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [variations, setVariations] = useState<{ tokens: string[]; translation: string; groupingDisplay: string; isCustom?: boolean }[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [hoveredTranslationIndex, setHoveredTranslationIndex] = useState<number | null>(null);
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);
  const variationsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translateToken = (token: string): string => {
    if (token.length === 1) {
      return selectedLanguage.dictionary[token] || 
             selectedLanguage.dictionary[token.padStart(2, "0")] || 
             `???(${token})`;
    }
    else if (token.length === 2) {
      return selectedLanguage.dictionary[token] || `???(${token})`;
    } else {
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
    
    const isDuplicateTranslation = (newGrouping: string[]): boolean => {
      const newTranslation = newGrouping.map(translateToken).join(" ");
      return results.some(existingGrouping => {
        const existingTranslation = existingGrouping.map(translateToken).join(" ");
        return existingTranslation === newTranslation;
      });
    };
    
    const generateCombinations = (index: number, currentGrouping: string[] = []) => {
      if (index === digits.length) {
        if (!isDuplicateTranslation(currentGrouping)) {
          results.push([...currentGrouping]);
        }
        return;
      }
      
      currentGrouping.push(digits[index]);
      generateCombinations(index + 1, currentGrouping);
      currentGrouping.pop();
      
      if (index + 1 < digits.length) {
        const twoDigits = digits.slice(index, index + 2);
        
        if (twoDigits === "00" && index + 2 <= digits.length) {
          currentGrouping.push(twoDigits);
          generateCombinations(index + 2, currentGrouping);
          currentGrouping.pop();
        } 
        else {
          currentGrouping.push(twoDigits);
          generateCombinations(index + 2, currentGrouping);
          currentGrouping.pop();
        }
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
    
    const translationMap = new Map<string, { tokens: string[]; translation: string; groupingDisplay: string; isCustom: boolean }>();
    
    groupings.forEach((tokens) => {
      const translation = tokens.map(translateToken).join(" ");
      const groupingDisplay = tokens.join("-");
      
      if (!translationMap.has(translation)) {
        translationMap.set(translation, { 
          tokens, 
          translation, 
          groupingDisplay,
          isCustom: false
        });
      }
    });
    
    const autoVariationsList = Array.from(translationMap.values());
    
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

  const renderNumberWordMapping = (variation: { tokens: string[]; translation: string }) => {
    return (
      <div className="absolute left-full ml-2 top-0 w-56 bg-white/95 backdrop-blur border border-accent/30 rounded-xl p-3 shadow-lg z-50 overflow-auto max-h-[200px]">
        <h4 className="text-sm font-semibold mb-2 text-accent">Number-to-Word Mapping</h4>
        <div className="space-y-1">
          {variation.tokens.map((token, idx) => {
            const word = translateToken(token);
            return (
              <div key={idx} className="flex items-center text-sm">
                <span className="bg-accent/10 text-accent font-mono px-2 py-0.5 rounded mr-2 w-10 text-center">{token}</span>
                <ChevronRight className="h-3 w-3 text-muted-foreground mr-1" />
                <span className="font-medium">{word}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHighlightedTranslation = (variation: { tokens: string[]; translation: string }, variationIndex: number) => {
    const words = variation.translation.split(" ");
    
    const wordToTokenMap = new Map<number, string>();
    
    let wordIndex = 0;
    variation.tokens.forEach(token => {
      const translatedToken = translateToken(token);
      const wordCount = translatedToken.split(" ").length;
      
      for (let i = 0; i < wordCount; i++) {
        wordToTokenMap.set(wordIndex + i, token);
      }
      
      wordIndex += wordCount;
    });
    
    const tokenColors = new Map<string, string>();
    const colorPalette = [
      "bg-red-100 hover:bg-red-200",
      "bg-blue-100 hover:bg-blue-200",
      "bg-green-100 hover:bg-green-200",
      "bg-yellow-100 hover:bg-yellow-200",
      "bg-purple-100 hover:bg-purple-200",
      "bg-pink-100 hover:bg-pink-200",
      "bg-indigo-100 hover:bg-indigo-200",
      "bg-orange-100 hover:bg-orange-200",
      "bg-teal-100 hover:bg-teal-200",
      "bg-cyan-100 hover:bg-cyan-200",
    ];
    
    variation.tokens.forEach((token, index) => {
      tokenColors.set(token, colorPalette[index % colorPalette.length]);
    });
    
    return (
      <div className="flex flex-wrap gap-1">
        {words.map((word, index) => {
          const token = wordToTokenMap.get(index);
          const color = token ? tokenColors.get(token) : "";
          const isCurrentVariationHovered = hoveredTranslationIndex === variationIndex;
          const isWordHighlighted = isCurrentVariationHovered && hoveredWordIndex === index;
          
          return (
            <TooltipProvider key={index} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span 
                    className={`px-1 py-0.5 rounded transition-colors cursor-pointer font-medium ${color || "bg-gray-100 hover:bg-gray-200"} ${isWordHighlighted ? "ring-2 ring-accent" : ""}`}
                    onMouseEnter={() => {
                      setHoveredTranslationIndex(variationIndex);
                      setHoveredWordIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredWordIndex(null);
                    }}
                  >
                    {word}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="font-mono text-xs bg-foreground text-white px-2 py-1">
                  <div className="flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" />
                    <span>Number: {token}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    );
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
                  : 'bg-secondary border border-border'} animate-fade-in transition-all-custom hover:shadow-md relative group`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredTranslationIndex(index)}
                onMouseLeave={() => setHoveredTranslationIndex(null)}
              >
                {variation.isCustom && (
                  <div className="text-xs font-medium text-accent mb-1">
                    Using your custom separators
                  </div>
                )}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Grouping: {variation.groupingDisplay}
                </div>
                <div className="text-lg">
                  {renderHighlightedTranslation(variation, index)}
                </div>
                
                {hoveredTranslationIndex === index && (
                  renderNumberWordMapping(variation)
                )}
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
