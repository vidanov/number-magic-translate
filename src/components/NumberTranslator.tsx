
import React, { useState, useRef, useEffect } from "react";
import { languages, Language } from "../utils/numToCodes";
import { useToast } from "@/hooks/use-toast";
import { Globe } from "lucide-react";

const NumberTranslator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [variations, setVariations] = useState<{ tokens: string[]; translation: string; groupingDisplay: string; isCustom?: boolean; isDefault?: boolean }[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [hoveredTranslationIndex, setHoveredTranslationIndex] = useState<number | null>(null);
  const variationsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translateToken = (token: string): string => {
    // Remove leading zeros for better translation
    const normalizedToken = token.replace(/^0+/, "") || "0";
    
    if (selectedLanguage.dictionary[normalizedToken]) {
      return selectedLanguage.dictionary[normalizedToken];
    }
    
    if (normalizedToken.length === 1) {
      return selectedLanguage.dictionary[normalizedToken] || `???(${token})`;
    }
    else if (normalizedToken.length === 2) {
      // Check if we have a translation for this 2-digit number
      if (selectedLanguage.dictionary[normalizedToken]) {
        return selectedLanguage.dictionary[normalizedToken];
      }
      
      // If not, split it into individual digits
      const firstDigit = normalizedToken[0];
      const secondDigit = normalizedToken[1];
      
      const firstTranslation = selectedLanguage.dictionary[firstDigit] || `???(${firstDigit})`;
      const secondTranslation = selectedLanguage.dictionary[secondDigit] || `???(${secondDigit})`;
      
      return `${firstTranslation} ${secondTranslation}`;
    } else {
      if (normalizedToken.length % 2 !== 0) {
        const firstDigit = normalizedToken.slice(0, 1);
        const rest = normalizedToken.slice(1);
        return translateToken(firstDigit) + " " + translateToken(rest);
      } else {
        const first = normalizedToken.slice(0, 2);
        const rest = normalizedToken.slice(2);
        if (rest.length === 0) {
          return translateToken(first);
        }
        return translateToken(first) + " " + translateToken(rest);
      }
    }
  };

  const expandAndTranslateToken = (token: string): { digit: string; word: string }[] => {
    const result: { digit: string; word: string }[] = [];
    
    // Remove leading zeros unless it's just "0"
    const normalizedToken = token.replace(/^0+/, "") || "0";
    
    // For tokens with leading zeros like "01", split them properly
    if (token.startsWith("0") && token.length > 1 && token !== normalizedToken) {
      // Handle the leading zeros
      const zeros = token.substring(0, token.length - normalizedToken.length);
      for (const zero of zeros) {
        result.push({
          digit: "0",
          word: selectedLanguage.dictionary["0"] || `???(0)`
        });
      }
      
      // Now handle the rest of the token
      if (normalizedToken !== "0") {
        if (normalizedToken.length <= 2 && selectedLanguage.dictionary[normalizedToken]) {
          result.push({
            digit: normalizedToken,
            word: selectedLanguage.dictionary[normalizedToken]
          });
        } else {
          // If we don't have a direct translation, split it into individual digits
          for (const digit of normalizedToken) {
            result.push({
              digit,
              word: selectedLanguage.dictionary[digit] || `???(${digit})`
            });
          }
        }
      }
      return result;
    }
    
    if (normalizedToken.length <= 2 && selectedLanguage.dictionary[normalizedToken]) {
      result.push({
        digit: token, // Keep original for display
        word: selectedLanguage.dictionary[normalizedToken]
      });
      return result;
    }
    
    // For 2-digit numbers without a direct translation, split them
    if (normalizedToken.length === 2 && !selectedLanguage.dictionary[normalizedToken]) {
      const firstDigit = normalizedToken[0];
      const secondDigit = normalizedToken[1];
      
      result.push({
        digit: firstDigit,
        word: selectedLanguage.dictionary[firstDigit] || `???(${firstDigit})`
      });
      
      result.push({
        digit: secondDigit,
        word: selectedLanguage.dictionary[secondDigit] || `???(${secondDigit})`
      });
      
      return result;
    }
    
    if (normalizedToken.length > 2) {
      if (normalizedToken.length % 2 !== 0) {
        const firstDigit = normalizedToken.slice(0, 1);
        result.push({
          digit: token.startsWith("0") ? token.slice(0, token.length - normalizedToken.length + 1) : firstDigit,
          word: selectedLanguage.dictionary[firstDigit] || `???(${firstDigit})`
        });
        
        for (let i = 1; i < normalizedToken.length; i += 2) {
          if (i + 1 < normalizedToken.length) {
            const pair = normalizedToken.slice(i, i + 2);
            if (selectedLanguage.dictionary[pair]) {
              result.push({
                digit: pair,
                word: selectedLanguage.dictionary[pair]
              });
            } else {
              // If no translation exists for the pair, split it
              result.push({
                digit: normalizedToken[i],
                word: selectedLanguage.dictionary[normalizedToken[i]] || `???(${normalizedToken[i]})`
              });
              result.push({
                digit: normalizedToken[i+1],
                word: selectedLanguage.dictionary[normalizedToken[i+1]] || `???(${normalizedToken[i+1]})`
              });
            }
          } else {
            const lastDigit = normalizedToken.slice(i, i + 1);
            result.push({
              digit: lastDigit,
              word: selectedLanguage.dictionary[lastDigit] || `???(${lastDigit})`
            });
          }
        }
      } else {
        for (let i = 0; i < normalizedToken.length; i += 2) {
          const pair = normalizedToken.slice(i, i + 2);
          if (selectedLanguage.dictionary[pair]) {
            result.push({
              digit: pair,
              word: selectedLanguage.dictionary[pair]
            });
          } else {
            // If no translation exists for the pair, split it
            result.push({
              digit: normalizedToken[i],
              word: selectedLanguage.dictionary[normalizedToken[i]] || `???(${normalizedToken[i]})`
            });
            result.push({
              digit: normalizedToken[i+1],
              word: selectedLanguage.dictionary[normalizedToken[i+1]] || `???(${normalizedToken[i+1]})`
            });
          }
        }
      }
      return result;
    }
    
    // If we have a token like "01", split it into "0" and "1" if needed
    if (token.length === 2 && !selectedLanguage.dictionary[normalizedToken]) {
      const first = token[0];
      const second = token[1];
      
      // Only break it into single digits if we can translate at least one of them
      if (selectedLanguage.dictionary[first] || selectedLanguage.dictionary[second]) {
        if (selectedLanguage.dictionary[first]) {
          result.push({
            digit: first,
            word: selectedLanguage.dictionary[first]
          });
        } else {
          result.push({
            digit: first,
            word: `???(${first})`
          });
        }
        
        if (selectedLanguage.dictionary[second]) {
          result.push({
            digit: second,
            word: selectedLanguage.dictionary[second]
          });
        } else {
          result.push({
            digit: second,
            word: `???(${second})`
          });
        }
        return result;
      }
    }
    
    result.push({
      digit: token,
      word: selectedLanguage.dictionary[normalizedToken] || `???(${token})`
    });
    
    return result;
  };

  const createDefaultGrouping = (digits: string): string[] => {
    // Remove leading zeros from the input
    const normalizedDigits = digits.replace(/^0+/, "") || "0";
    
    const tokens: string[] = [];
    
    if (normalizedDigits.length % 2 !== 0) {
      tokens.push(normalizedDigits[0]);
      
      for (let i = 1; i < normalizedDigits.length; i += 2) {
        if (i + 1 < normalizedDigits.length) {
          tokens.push(normalizedDigits.substring(i, i + 2));
        } else {
          tokens.push(normalizedDigits[i]);
        }
      }
    } else {
      for (let i = 0; i < normalizedDigits.length; i += 2) {
        tokens.push(normalizedDigits.substring(i, i + 2));
      }
    }
    
    return tokens;
  };

  const generateVariableGroupings = (digits: string): string[][] => {
    // Remove leading zeros
    const normalizedDigits = digits.replace(/^0+/, "") || "0";
    
    let results: string[][] = [];
    
    const isDuplicateTranslation = (newGrouping: string[]): boolean => {
      const newTranslation = newGrouping.map(translateToken).join(" ");
      return results.some(existingGrouping => {
        const existingTranslation = existingGrouping.map(translateToken).join(" ");
        return existingTranslation === newTranslation;
      });
    };
    
    const generateCombinations = (index: number, currentGrouping: string[] = []) => {
      if (index === normalizedDigits.length) {
        if (!isDuplicateTranslation(currentGrouping)) {
          results.push([...currentGrouping]);
        }
        return;
      }
      
      // Try using the single digit
      currentGrouping.push(normalizedDigits[index]);
      generateCombinations(index + 1, currentGrouping);
      currentGrouping.pop();
      
      if (index + 1 < normalizedDigits.length) {
        const twoDigits = normalizedDigits.slice(index, index + 2);
        
        // Use two-digit grouping if it has a known translation OR if both individual digits have translations
        const hasKnownPairTranslation = !!selectedLanguage.dictionary[twoDigits];
        const hasIndividualTranslations = !!selectedLanguage.dictionary[twoDigits[0]] && !!selectedLanguage.dictionary[twoDigits[1]];
        
        if (hasKnownPairTranslation || hasIndividualTranslations) {
          currentGrouping.push(twoDigits);
          generateCombinations(index + 2, currentGrouping);
          currentGrouping.pop();
        }
      }
    };
    
    generateCombinations(0);
    
    // Add individual digits as a fallback option
    const allSingleDigits = normalizedDigits.split("");
    if (!isDuplicateTranslation(allSingleDigits)) {
      results.push(allSingleDigits);
    }
    
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
    
    // Remove leading zeros for better translation
    const normalizedDigits = digitsOnly.replace(/^0+/, "") || "0";
    
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
    } else {
      const defaultTokens = createDefaultGrouping(digitsOnly);
      const defaultTranslation = defaultTokens.map(translateToken).join(" ");
      const defaultGroupingDisplay = defaultTokens.join("-");
      
      variationsList.push({
        tokens: defaultTokens,
        translation: defaultTranslation,
        groupingDisplay: defaultGroupingDisplay,
        isDefault: true
      });
    }
    
    const groupings = generateVariableGroupings(digitsOnly);
    
    const translationMap = new Map<string, { tokens: string[]; translation: string; groupingDisplay: string; isCustom?: boolean; isDefault?: boolean }>();
    
    groupings.forEach((tokens) => {
      const translation = tokens.map(translateToken).join(" ");
      const groupingDisplay = tokens.join("-");
      
      const existing = variationsList.find(v => v.translation === translation);
      if (existing) return;
      
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
    
    // Sort by word count first (fewer words first), then by unknown count and length
    autoVariationsList.sort((a, b) => {
      const aWordCount = a.translation.split(" ").length;
      const bWordCount = b.translation.split(" ").length;
      
      if (aWordCount !== bWordCount) return aWordCount - bWordCount;
      
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
        const defaultGroupingExists = newVariations.some(v => v.isDefault === true);
        
        let toastMessage = "";
        if (customGroupingExists) {
          toastMessage = `Using your custom separators for the first translation. Found ${newVariations.length - 1} additional variations.`;
        } else if (defaultGroupingExists) {
          toastMessage = `Showing standard 2-digit grouping first. Found ${newVariations.length - 1} additional variations.`;
        } else {
          toastMessage = `Found ${newVariations.length} possible variations`;
        }
        
        toast({
          title: "Translation complete",
          description: toastMessage,
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

  const renderNumberWordTable = (variation: { tokens: string[]; translation: string }) => {
    const allPairs: { digit: string; word: string }[] = [];
    
    variation.tokens.forEach(token => {
      const expandedPairs = expandAndTranslateToken(token);
      allPairs.push(...expandedPairs);
    });
    
    return (
      <div className="w-full bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-accent/20">
              <th className="px-2 py-1 text-left font-medium text-accent">Number</th>
              <th className="px-2 py-1 text-left font-medium text-accent">Word</th>
            </tr>
          </thead>
          <tbody>
            {allPairs.map((pair, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="px-2 py-1.5 font-mono text-accent/90">{pair.digit}</td>
                <td className="px-2 py-1.5 font-medium">{pair.word}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
                className={`p-5 rounded-xl ${variation.isCustom || variation.isDefault
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
                {variation.isDefault && (
                  <div className="text-xs font-medium text-accent mb-1">
                    Standard 2-digit grouping
                  </div>
                )}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Grouping: {variation.groupingDisplay}
                </div>
                
                {hoveredTranslationIndex === index ? (
                  renderNumberWordTable(variation)
                ) : (
                  <div className="text-lg">
                    {variation.translation}
                  </div>
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
