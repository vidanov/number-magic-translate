
import React, { useState, useRef, useEffect } from "react";
import { numToWord2, numToWord3 } from "../utils/numToCodes";
import { useToast } from "@/hooks/use-toast";

const NumberTranslator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [variations, setVariations] = useState<{ tokens: string[]; translation: string; groupingDisplay: string }[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [useThreeDigits, setUseThreeDigits] = useState<boolean>(true);
  const variationsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translateToken = (token: string): string => {
    if (token.length === 2 || (token.length <= 2 && !useThreeDigits)) {
      const paddedToken = token.padStart(2, "0");
      return numToWord2[paddedToken] || `???(${token})`;
    } else if (token.length === 3 && useThreeDigits) {
      return numToWord3[token] || `???(${token})`;
    } else if (token.length === 1) {
      const paddedToken = token.padStart(2, "0");
      return numToWord2[paddedToken] || `???(${token})`;
    } else if (!useThreeDigits) {
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
    return `???(${token})`;
  };

  // Function to generate all possible groupings including single digits
  const generateVariableGroupings = (digits: string): string[][] => {
    let results: string[][] = [];
    
    const generateCombinations = (index: number, currentGrouping: string[] = []) => {
      if (index === digits.length) {
        results.push([...currentGrouping]);
        return;
      }
      
      // Try adding a single digit
      currentGrouping.push(digits[index]);
      generateCombinations(index + 1, currentGrouping);
      currentGrouping.pop();
      
      // Try adding a 2-digit group if possible
      if (index + 1 < digits.length) {
        currentGrouping.push(digits.slice(index, index + 2));
        generateCombinations(index + 2, currentGrouping);
        currentGrouping.pop();
      }
      
      // Try adding a 3-digit group if enabled and possible
      if (useThreeDigits && index + 2 < digits.length) {
        currentGrouping.push(digits.slice(index, index + 3));
        generateCombinations(index + 3, currentGrouping);
        currentGrouping.pop();
      }
    };
    
    generateCombinations(0);
    return results;
  };

  const generateGroupings = (digits: string): string[][] => {
    let results: string[][] = [];
    
    if (!useThreeDigits) {
      const segments: string[] = [];
      let i = 0;
      
      if (digits.length % 2 !== 0) {
        segments.push(digits.slice(0, 1));
        i = 1;
      }
      
      while (i < digits.length) {
        segments.push(digits.slice(i, i + 2));
        i += 2;
      }
      
      results.push(segments);
      return results;
    }
    
    const helper = (index: number, current: string[]) => {
      if (index === digits.length) {
        results.push([...current]);
        return;
      }
      if (index + 2 <= digits.length) {
        current.push(digits.slice(index, index + 2));
        helper(index + 2, current);
        current.pop();
      }
      if (index + 3 <= digits.length && useThreeDigits) {
        current.push(digits.slice(index, index + 3));
        helper(index + 3, current);
        current.pop();
      }
    };
    helper(0, []);
    return results;
  };

  const processInput = (raw: string) => {
    const digitsOnly = raw.replace(/\D+/g, "");
    
    if (digitsOnly.length === 0) {
      toast({
        title: "No digits found",
        description: "Please enter some numbers to translate",
        variant: "destructive",
      });
      return [];
    }
    
    // Use the variable groupings function to get all possible combinations
    const groupings = generateVariableGroupings(digitsOnly);
    
    const variationsList = groupings.map((tokens) => {
      const translation = tokens.map(translateToken).join(" ");
      const groupingDisplay = tokens.join("-");
      return { tokens, translation, groupingDisplay };
    });
    
    variationsList.sort((a, b) => {
      // First sort by number of "???" in the translation (fewer is better)
      const aUnknown = (a.translation.match(/\?\?\?/g) || []).length;
      const bUnknown = (b.translation.match(/\?\?\?/g) || []).length;
      
      if (aUnknown !== bUnknown) return aUnknown - bUnknown;
      
      // Then sort by translation length (shorter is better)
      return a.translation.length - b.translation.length;
    });
    
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
        toast({
          title: "Translation complete",
          description: `Found ${newVariations.length} possible variations`,
        });
      } else {
        toast({
          title: "No translations found",
          description: "Try a different input or enable 3-digit codes",
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
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 sm:px-6">
      <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-8 text-center">
          Number Translator
        </h1>
        
        <div className="space-y-6">
          <div className="relative">
            <input
              className="w-full h-14 px-5 rounded-xl border-2 border-secondary bg-white text-foreground text-lg placeholder:text-muted-foreground focus-ring transition-all-custom"
              type="text"
              placeholder="Enter numbers..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Enter numbers to translate"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="use-three-digits"
              checked={useThreeDigits}
              onChange={(e) => setUseThreeDigits(e.target.checked)}
              className="rounded border-secondary text-accent h-5 w-5 focus:ring-2 focus:ring-accent"
            />
            <label htmlFor="use-three-digits" className="text-foreground cursor-pointer select-none">
              Use 3-digit codes in translation
            </label>
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
                className="p-5 rounded-xl bg-secondary border border-border animate-fade-in transition-all-custom hover:shadow-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
