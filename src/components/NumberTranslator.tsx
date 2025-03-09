
import React, { useState, useRef, useEffect } from "react";
import { numToWord2, numToWord3 } from "../utils/numToCodes";

const NumberTranslator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [variations, setVariations] = useState<{ tokens: string[]; translation: string; groupingDisplay: string }[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const variationsRef = useRef<HTMLDivElement>(null);

  const translateToken = (token: string): string => {
    if (token.length === 2) {
      return numToWord2[token] || numToWord2[token.padStart(2, "0")] || `???(${token})`;
    } else if (token.length === 3) {
      return numToWord3[token] || `???(${token})`;
    }
    return `???(${token})`;
  };

  const generateGroupings = (digits: string): string[][] => {
    let results: string[][] = [];
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
      if (index + 3 <= digits.length) {
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
    const groupings = generateGroupings(digitsOnly);
    
    // Sort by shortest translation length
    const variationsList = groupings.map((tokens) => {
      const translation = tokens.map(translateToken).join(" ");
      const groupingDisplay = tokens.join("-");
      return { tokens, translation, groupingDisplay };
    });
    
    // Sort by translation length (shortest first)
    variationsList.sort((a, b) => a.translation.length - b.translation.length);
    
    return variationsList;
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    // Use setTimeout to allow animation to show
    setTimeout(() => {
      const newVariations = processInput(inputText);
      setVariations(newVariations);
      setDisplayCount(3);
      setIsTranslating(false);
    }, 600);
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + 3);
  };
  
  // Auto-scroll when new variations are added
  useEffect(() => {
    if (variations.length > 0 && variationsRef.current) {
      variationsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [variations]);

  // Handle keyboard submit
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTranslate();
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 sm:px-6">
      <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
        {/* Title with gradient text */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-8 text-center">
          Number Translator
        </h1>
        
        {/* Input + Button */}
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
          
          <button
            className={`w-full h-14 rounded-xl bg-accent text-accent-foreground font-medium text-lg transition-all-custom hover:bg-accent/90 active:scale-[0.98] focus-ring ${isTranslating ? 'animate-pulse-subtle' : ''}`}
            onClick={handleTranslate}
            disabled={isTranslating}
          >
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>
      
      {/* Variations Section */}
      {variations.length > 0 && (
        <div 
          ref={variationsRef}
          className="glass rounded-2xl p-6 sm:p-8 animate-slide-up"
        >
          <h2 className="text-xl font-semibold mb-6 text-gradient">
            Translation Variations
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
