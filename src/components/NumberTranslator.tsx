import React, { useState, useRef, useEffect } from "react";
import { languages, Language } from "../utils/numToCodes";
import { useToast } from "@/hooks/use-toast";
import CopyButton from "./CopyButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const NumberTranslator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { number } = useParams();
  const [inputText, setInputText] = useState<string>(number || "");
  const [variations, setVariations] = useState<{ tokens: string[]; translation: string; groupingDisplay: string; isCustom?: boolean; isDefault?: boolean }[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [hoveredTranslationIndex, setHoveredTranslationIndex] = useState<number | null>(null);
  const variationsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [selectedTranslation, setSelectedTranslation] = useState<{ number: string; translation: string } | null>(null);
  const [flashcardMeaning, setFlashcardMeaning] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  
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

  // Handle URL parameter changes
  useEffect(() => {
    if (number) {
      setInputText(number);
      handleTranslate();
    }
  }, [number]);

  // Update URL when translations are generated
  useEffect(() => {
    if (inputText && variations.length > 0) {
      const currentLang = i18n.language.split('-')[0];
      navigate(`/${currentLang}/translate/${encodeURIComponent(inputText)}`, { replace: true });
    }
  }, [inputText, variations, i18n.language, navigate]);

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

    // Clean the input by removing all non-digit characters except separators
    const cleanedInput = raw.replace(/[^\d\-\s.,;:|/\\]/g, "");
    const hasSeparators = containsSeparators(cleanedInput);
    const digitsOnly = cleanedInput.replace(/\D+/g, "");

    if (digitsOnly.length === 0) {
      toast({
        title: t('toast.noDigits.title'),
        description: t('toast.noDigits.description'),
        variant: "destructive",
      });
      return [];
    }

    // Remove leading zeros for better translation
    const normalizedDigits = digitsOnly.replace(/^0+/, "") || "0";

    if (hasSeparators) {
      const customTokens = extractCustomTokens(cleanedInput);
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
        title: t('toast.emptyInput.title'),
        description: t('toast.emptyInput.description'),
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    try {
      const processedInput = processInput(inputText);
      if (!processedInput || processedInput.length === 0) {
        toast({
          title: t('toast.noDigits.title'),
          description: t('toast.noDigits.description'),
          variant: "destructive",
        });
        return;
      }

      setVariations(processedInput);
      setDisplayCount(3);

      // Show success toast
      toast({
        title: t('toast.translationComplete.title'),
        description: t('toast.translationComplete.customDesc', { count: processedInput.length }),
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Error",
        description: "An error occurred while translating the number.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // Clear variations when input changes
    setVariations([]);
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

  const handleSaveAsFlashcard = (number: string, translation: string) => {
    setSelectedTranslation({ number, translation });
    setFlashcardMeaning("");
    setIsSaveDialogOpen(true);
  };

  const saveFlashcard = () => {
    if (!selectedTranslation || !flashcardMeaning.trim()) return;

    const newCard: Flashcard = {
      id: crypto.randomUUID(),
      number: selectedTranslation.number,
      translation: selectedTranslation.translation,
      meaning: flashcardMeaning.trim(),
      language: i18n.language,
      nextReview: Date.now(),
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      isFirstDay: true,
      minutesInterval: 0
    };

    const existingCards = JSON.parse(localStorage.getItem('flashcards') || '[]');
    localStorage.setItem('flashcards', JSON.stringify([...existingCards, newCard]));

    toast({
      title: t('flashcards.saveCardSuccess'),
      description: t('flashcards.cardAddedToStudy')
    });

    setIsSaveDialogOpen(false);
    setSelectedTranslation(null);
    setFlashcardMeaning("");
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
              <th className="px-2 py-1 text-left font-medium text-accent">{t('translator.table.headerNumber')}</th>
              <th className="px-2 py-1 text-left font-medium text-accent">{t('translator.table.headerWord')}</th>
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
          {t('translator.title')}
        </h1>
        <p className="text-md text-muted-foreground text-center mb-6">
          {t('translator.description')}
        </p>

        <div className="space-y-6">
          <div className="relative">
            <Input
              className="h-12 text-base"
              type="text"
              placeholder={t('translator.inputPlaceholder')}
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              aria-label={t('translator.inputAriaLabel')}
            />
          </div>

          <button
            className={`w-full h-14 rounded-xl bg-accent text-accent-foreground font-medium text-lg transition-all-custom hover:bg-accent/90 active:scale-[0.98] focus-ring ${isTranslating ? 'animate-pulse-subtle' : ''}`}
            onClick={handleTranslate}
            disabled={isTranslating}
          >
            {isTranslating ? t('translator.buttonTranslating') : t('translator.buttonTranslate')}
          </button>
        </div>
      </div>

      {variations.length > 0 && (
        <div
          ref={variationsRef}
          className="glass rounded-2xl p-6 sm:p-8 animate-slide-up"
        >
          <h2 className="text-xl font-semibold mb-6 text-gradient">
            {t('translator.resultsTitle', { count: variations.length })}
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
                    {t('translator.customSeparatorLabel')}
                  </div>
                )}
                {variation.isDefault && (
                  <div className="text-xs font-medium text-accent mb-1">
                    {t('translator.defaultGroupingLabel')}
                  </div>
                )}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {t('translator.groupingLabel')}: {variation.groupingDisplay}
                </div>

                <div className="flex items-center justify-between relative">
                  <div className="text-lg flex-grow mr-4 min-w-0">
                    {variation.translation}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4 opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSaveAsFlashcard(inputText, variation.translation)}
                      className="text-muted-foreground hover:text-accent h-8 w-8"
                      aria-label={t('flashcards.saveCard')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(variation.translation);
                        toast({
                          title: t('toast.copied.title'),
                          description: t('toast.copied.description'),
                        });
                      }}
                      className="text-muted-foreground hover:text-accent h-8 w-8"
                      aria-label={t('translator.copyAriaLabel')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </Button>
                  </div>
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
              {t('translator.showMoreButton')}
            </button>
          )}
        </div>
      )}

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('flashcards.saveCardTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('flashcards.enterMeaningPrompt')}</Label>
              <Input
                value={flashcardMeaning}
                onChange={(e) => setFlashcardMeaning(e.target.value)}
                placeholder={t('flashcards.enterMeaningPrompt')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && flashcardMeaning.trim()) {
                    saveFlashcard();
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSaveDialogOpen(false)}
              >
                {t('flashcards.cancel')}
              </Button>
              <Button
                onClick={saveFlashcard}
                disabled={!flashcardMeaning.trim()}
              >
                {t('flashcards.save')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NumberTranslator;
