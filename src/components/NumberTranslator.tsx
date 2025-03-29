import React, { useState, useRef, useEffect } from "react";
import { languages, Language } from "../utils/numToCodes";
import { useToast } from "@/hooks/use-toast";
import CopyButton from "./CopyButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const NumberTranslator: React.FC = () => {
  const { t, i18n } = useTranslation(); // Get the t function and i18n instance
  const [inputText, setInputText] = useState<string>("");
  const [variations, setVariations] = useState<{ tokens: string[]; translation: string; groupingDisplay: string; isCustom?: boolean; isDefault?: boolean }[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [hoveredTranslationIndex, setHoveredTranslationIndex] = useState<number | null>(null);
  const variationsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Get the current language from i18n and find the corresponding language object
  const getCurrentLanguage = (): Language => {
    const currentLangCode = i18n.language.split('-')[0];
    return languages.find(lang => lang.id === currentLangCode) || languages.find(lang => lang.id === "en")!;
  };
  
  // Get the current language object
  const selectedLanguage = getCurrentLanguage();
  
  // Update selected language when i18n language changes
  useEffect(() => {
    // When UI language changes, clear previous translations
    setVariations([]);
  }, [i18n.language]);

  // --- translateToken, expandAndTranslateToken, createDefaultGrouping, generateVariableGroupings, containsSeparators, extractCustomTokens remain the same ---
  // (Code for these functions omitted for brevity)
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
    // Keep original digits including leading zeros for grouping display
    const tokens: string[] = [];
    let i = 0;
    while (i < digits.length) {
      if (i + 1 < digits.length) {
        // Take a pair of digits
        tokens.push(digits.substring(i, i + 2));
        i += 2;
      } else {
        // Take the last single digit
        tokens.push(digits.substring(i, i + 1));
        i += 1;
      }
    }
    // Handle empty input case
    if (tokens.length === 0 && digits.length === 0) {
      return [];
    }
    // If input was only '0' or '00' etc., ensure we have at least '0'
    if (tokens.length === 0 && digits.length > 0 && parseInt(digits, 10) === 0) {
      return ["0"];
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
        title: t('toast.noDigits.title'), // Translate
        description: t('toast.noDigits.description'), // Translate
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
        title: t('toast.emptyInput.title'), // Translate
        description: t('toast.emptyInput.description'), // Translate
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

        let toastDescriptionKey = "";
        const count = newVariations.length;
        const additionalCount = count > 1 ? count - 1 : 0;

        if (customGroupingExists) {
          toastDescriptionKey = 'toast.translationComplete.customDesc';
        } else if (defaultGroupingExists) {
          toastDescriptionKey = 'toast.translationComplete.defaultDesc';
        } else {
          toastDescriptionKey = 'toast.translationComplete.variationsDesc';
        }

        toast({
          title: t('toast.translationComplete.title'), // Translate
          description: t(toastDescriptionKey, { count: additionalCount }), // Translate with count
        });
      } else {
        // Check if the no digits toast was already shown in processInput
        if (inputText.replace(/\D+/g, "").length > 0) {
            toast({
                title: t('toast.noTranslations.title'), // Translate
                description: t('toast.noTranslations.description'), // Translate
                variant: "destructive",
            });
        }
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

  // No longer needed as we use the UI language

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
              <th className="px-2 py-1 text-left font-medium text-accent">{t('translator.table.headerNumber')}</th> {/* Translate */}
              <th className="px-2 py-1 text-left font-medium text-accent">{t('translator.table.headerWord')}</th> {/* Translate */}
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4 text-center">
          {t('translator.title')} {/* Translate */}
        </h1>
        <p className="text-md text-muted-foreground text-center mb-6">
          {t('translator.description')} {/* Translate */}
        </p>

        <div className="space-y-6">
          <div className="relative">
            <Input
              className="h-12 text-base"
              type="text"
              placeholder={t('translator.inputPlaceholder')} // Translate
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label={t('translator.inputAriaLabel')} // Translate
            />
          </div>

          {/* Language selector removed - now using UI language */}

          <button
            className={`w-full h-14 rounded-xl bg-accent text-accent-foreground font-medium text-lg transition-all-custom hover:bg-accent/90 active:scale-[0.98] focus-ring ${isTranslating ? 'animate-pulse-subtle' : ''}`}
            onClick={handleTranslate}
            disabled={isTranslating}
          >
            {isTranslating ? t('translator.buttonTranslating') : t('translator.buttonTranslate')} {/* Translate */}
          </button>
        </div>
      </div>

      {variations.length > 0 && (
        <div
          ref={variationsRef}
          className="glass rounded-2xl p-6 sm:p-8 animate-slide-up"
        >
          <h2 className="text-xl font-semibold mb-6 text-gradient">
            {t('translator.resultsTitle', { count: variations.length })} {/* Translate with count */}
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
                    {t('translator.customSeparatorLabel')} {/* Translate */}
                  </div>
                )}
                {variation.isDefault && (
                  <div className="text-xs font-medium text-accent mb-1">
                    {t('translator.defaultGroupingLabel')} {/* Translate */}
                  </div>
                )}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {t('translator.groupingLabel')}: {variation.groupingDisplay} {/* Translate */}
                </div>

                <div className="flex items-center justify-between relative">
                  <div className="text-lg flex-grow mr-2">
                    {variation.translation}
                  </div>
                  <CopyButton value={variation.translation} />
                </div>

                {hoveredTranslationIndex === index && (
                  <div className="mt-3">
                    {renderNumberWordTable(variation)}
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
              {t('translator.showMoreButton')} {/* Translate */}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NumberTranslator;
