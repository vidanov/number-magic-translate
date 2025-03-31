import React from "react";
import Navigation from "../components/Navigation";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Settings2, BarChart, Calendar, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Flashcard {
  id: string;
  number: string;
  translation: string;
  meaning: string;
  language: string;
  nextReview: number;
  easeFactor: number;
  interval: number;
  repetitions: number;
  isFirstDay: boolean;
  minutesInterval: number;
}

const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat('default', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(timestamp));
};

const getReviewStatus = (card: Flashcard) => {
  const now = Date.now();
  if (card.nextReview <= now) return "due";
  if (card.nextReview <= now + 24 * 60 * 60 * 1000) return "soon";
  return "later";
};

const Flashcards: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [editMeaning, setEditMeaning] = useState("");
  const [showManagement, setShowManagement] = useState(false);

  // Load cards from localStorage and filter by current language
  useEffect(() => {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      const allCards = JSON.parse(savedCards);
      const languageCards = allCards.filter((card: Flashcard) => card.language === i18n.language);
      setCards(languageCards);
    }
  }, [i18n.language]); // Re-run when language changes

  // Get next card to review (only from current language)
  const getNextCard = () => {
    const now = Date.now();
    return cards.find(card => 
      card.language === i18n.language && card.nextReview <= now
    ) || null;
  };

  // Update current card when cards or language changes
  useEffect(() => {
    setCurrentCard(getNextCard());
    setIsFlipped(false);
    setShowAnswer(false);
  }, [cards, i18n.language]);

  // Save all cards to localStorage (not just current language)
  const saveCardsToStorage = (newCards: Flashcard[]) => {
    const savedCards = localStorage.getItem('flashcards');
    const allCards = savedCards ? JSON.parse(savedCards) : [];
    
    // Replace cards of current language, keep others
    const otherLanguageCards = allCards.filter((card: Flashcard) => card.language !== i18n.language);
    const updatedCards = [...otherLanguageCards, ...newCards];
    
    localStorage.setItem('flashcards', JSON.stringify(updatedCards));
    setCards(newCards); // Only set cards for current language in state
  };

  // Update handleDeleteCard to use new save function
  const handleDeleteCard = (cardId: string) => {
    const newCards = cards.filter(card => card.id !== cardId);
    saveCardsToStorage(newCards);
    
    if (currentCard?.id === cardId) {
      setCurrentCard(getNextCard());
    }
    
    toast({
      title: t('flashcards.cardDeleted'),
    });
  };

  // Update handleSaveEdit to use new save function
  const handleSaveEdit = () => {
    if (!editingCard || !editMeaning.trim()) return;

    const newCards = cards.map(card =>
      card.id === editingCard.id
        ? { ...card, meaning: editMeaning.trim() }
        : card
    );

    saveCardsToStorage(newCards);
    setIsEditing(false);
    setEditingCard(null);
    
    toast({
      title: t('flashcards.cardUpdated'),
    });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(true);
  };

  const handleRating = (quality: number) => {
    if (!currentCard) return;
    const card = { ...currentCard };
    const now = Date.now();
    
    // Calculate how late the review is
    const daysLate = Math.max(0, Math.floor((now - card.nextReview) / (24 * 60 * 60 * 1000)));
    
    // Apply penalty for late reviews (reduce quality based on lateness)
    if (daysLate > 0) {
      // Reduce quality by 1 point per week late, but not below 1
      const penaltyPoints = Math.min(Math.floor(daysLate / 7), quality - 1);
      quality = Math.max(1, quality - penaltyPoints);
      
      // Also reduce ease factor for very late reviews
      if (daysLate > 30) {
        card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
      }
    }

    // Poor response (Again or Hard buttons, or heavily penalized response)
    if (quality < 3) {
      card.isFirstDay = true;
      card.minutesInterval = 5;
      card.repetitions = 0;
      card.interval = 0;
      card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
      card.nextReview = now + 5 * 60 * 1000;
    } else {
      // Good response (quality >= 3)
      if (card.isFirstDay) {
        // Progress through minutes intervals
        if (card.minutesInterval === 0) {
          card.minutesInterval = 5; // First success: 5 minutes
          card.nextReview = now + 5 * 60 * 1000;
        } else if (card.minutesInterval < 10) {
          card.minutesInterval = 10;
          card.nextReview = now + 10 * 60 * 1000;
        } else if (card.minutesInterval < 30) {
          card.minutesInterval = 30;
          card.nextReview = now + 30 * 60 * 1000;
        } else if (card.minutesInterval < 60) {
          card.minutesInterval = 60;
          card.nextReview = now + 60 * 60 * 1000;
        } else {
          // Graduate from first day
          card.isFirstDay = false;
          card.interval = 1;
          card.repetitions = 1;
          card.nextReview = now + 24 * 60 * 60 * 1000; // 1 day
        }
      } else {
        // Regular spaced repetition
        card.repetitions += 1;
        if (card.repetitions === 1) {
          card.interval = 1;
        } else if (card.repetitions === 2) {
          card.interval = 6;
        } else {
          card.interval = Math.round(card.interval * card.easeFactor);
        }
        card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
        card.nextReview = now + card.interval * 24 * 60 * 60 * 1000;
      }
    }

    // Update cards array and save to localStorage
    const newCards = cards.map(c => c.id === card.id ? card : c);
    saveCardsToStorage(newCards);

    // Reset state for next card
    setIsFlipped(false);
    setShowAnswer(false);
    setCurrentCard(getNextCard());

    toast({
      title: t('flashcards.ratingSubmitted'),
      description: daysLate > 0 
        ? t('flashcards.lateReview', { 
            days: daysLate,
            next: card.isFirstDay 
              ? t('flashcards.nextReviewMinutes', { minutes: card.minutesInterval })
              : t('flashcards.nextReview', { days: card.interval })
          })
        : (card.isFirstDay 
            ? t('flashcards.nextReviewMinutes', { minutes: card.minutesInterval })
            : t('flashcards.nextReview', { days: card.interval }))
    });
  };

  const handleEditCard = (card: Flashcard) => {
    setEditingCard(card);
    setEditMeaning(card.meaning);
    setIsEditing(true);
  };

  const saveFlashcard = () => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      number: "",
      translation: "",
      meaning: "",
      language: i18n.language,
      nextReview: Date.now() + 5 * 60 * 1000, // 5 minutes initial interval
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      isFirstDay: true,
      minutesInterval: 5,
    };
    // ... rest of save logic
  };

  // Calculate statistics
  const stats = {
    totalCards: cards.length,
    dueCards: cards.filter(card => getReviewStatus(card) === "due").length,
    soonDue: cards.filter(card => getReviewStatus(card) === "soon").length,
    learningCards: cards.filter(card => card.isFirstDay).length,
    masteredCards: cards.filter(card => card.interval >= 30).length, // 30+ days interval
    averageEase: cards.length ? 
      cards.reduce((sum, card) => sum + card.easeFactor, 0) / cards.length 
      : 0,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gradient">{t('flashcards.title')}</h1>
          <Button
            variant="outline"
            onClick={() => setShowManagement(!showManagement)}
            className="flex items-center gap-2"
          >
            <Settings2 className="h-4 w-4" />
            {t('flashcards.manageCards')}
          </Button>
        </div>

        {showManagement ? (
          <div className="space-y-6">
            {/* Statistics Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>{t('flashcards.statistics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className="h-4 w-4" />
                      <span className="font-medium">{t('flashcards.totalCards')}</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.totalCards}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{t('flashcards.dueCards')}</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-500">{stats.dueCards}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">{t('flashcards.masteredCards')}</span>
                    </div>
                    <p className="text-2xl font-bold text-green-500">{stats.masteredCards}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{t('flashcards.learningCards')}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">{stats.learningCards}</p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        {t('flashcards.masterProgress')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((stats.masteredCards / stats.totalCards) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(stats.masteredCards / stats.totalCards) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        {t('flashcards.averageEase')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {stats.averageEase.toFixed(2)}
                      </span>
                    </div>
                    <Progress 
                      value={(stats.averageEase / 2.5) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cards List with Review Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t('flashcards.manageCards')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cards.map(card => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-grow">
                        <div className="font-medium">{card.number}</div>
                        <div className="text-sm text-muted-foreground">{card.translation}</div>
                        <div className="text-sm mt-1">{card.meaning}</div>
                        <div className="mt-2 text-sm">
                          <div className="flex items-center gap-4">
                            <span className={`flex items-center gap-1 ${
                              getReviewStatus(card) === "due" ? "text-orange-500" : 
                              getReviewStatus(card) === "soon" ? "text-yellow-500" : 
                              "text-green-500"
                            }`}>
                              <Clock className="h-3 w-3" />
                              {card.isFirstDay ? 
                                t('flashcards.nextInMinutes', { minutes: card.minutesInterval }) :
                                formatDate(card.nextReview)
                              }
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <TrendingUp className="h-3 w-3" />
                              {t('flashcards.interval', { 
                                value: card.isFirstDay ? 
                                  t('flashcards.learning') : 
                                  t('flashcards.days', { count: card.interval })
                              })}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <BarChart className="h-3 w-3" />
                              {t('flashcards.ease', { value: card.easeFactor.toFixed(2) })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCard(card)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {!currentCard ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('flashcards.noCards')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{t('flashcards.addMoreCards')}</p>
                      
                      <div className="mt-6 border-t pt-6">
                        <h3 className="font-medium mb-2">{t('flashcards.howToAdd')}</h3>
                        <ol className="space-y-3 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="font-medium text-foreground">1.</span>
                            {t('flashcards.howToStep1')}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium text-foreground">2.</span>
                            {t('flashcards.howToStep2')}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium text-foreground">3.</span>
                            {t('flashcards.howToStep3')}
                          </li>
                        </ol>
                      </div>

                      <div className="mt-6 border-t pt-6">
                        <h3 className="font-medium mb-2">{t('flashcards.aboutSystem')}</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="shrink-0">•</span>
                            {t('flashcards.aboutPoint1')}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="shrink-0">•</span>
                            {t('flashcards.aboutPoint2')}
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="shrink-0">•</span>
                            {t('flashcards.aboutPoint3')}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>{t('flashcards.studySession')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div 
                      className={`relative min-h-[200px] p-6 rounded-lg border cursor-pointer transition-all duration-300 ${
                        isFlipped ? 'bg-accent/10' : 'bg-card'
                      }`}
                      onClick={handleFlip}
                    >
                      <div className="text-center">
                        {isFlipped ? (
                          <>
                            <h3 className="text-2xl font-bold mb-4">
                              {currentCard.number}
                            </h3>
                            <p className="text-xl mb-2">
                              {currentCard.translation}
                            </p>
                            <p className="text-muted-foreground">
                              {currentCard.meaning}
                            </p>
                          </>
                        ) : (
                          <h3 className="text-2xl font-bold">
                            {currentCard.meaning}
                          </h3>
                        )}
                      </div>
                    </div>

                    {showAnswer && (
                      <div className="grid grid-cols-4 gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleRating(1)}
                          className="col-span-1"
                        >
                          {t('flashcards.again')}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRating(2)}
                          className="col-span-1"
                        >
                          {t('flashcards.hard')}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRating(3)}
                          className="col-span-1"
                        >
                          {t('flashcards.good')}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRating(5)}
                          className="col-span-1"
                        >
                          {t('flashcards.easy')}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('flashcards.editCard')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('flashcards.enterMeaning')}</Label>
              <Input
                value={editMeaning}
                onChange={(e) => setEditMeaning(e.target.value)}
                placeholder={t('flashcards.enterMeaning')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveEdit();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleSaveEdit}
              disabled={!editMeaning.trim()}
              className="w-full"
            >
              {t('flashcards.saveChanges')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Flashcards; 