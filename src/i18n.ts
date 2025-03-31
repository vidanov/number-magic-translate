import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // General UI
      "appTitle": "Number Magic Translate",
      "navHome": "Home",
      "navHelp": "Help",
      "copyButton": "Copy",
      "copiedTooltip": "Copied!",
      "navFlashcards": "Flashcards",

      // Translator Page
      "translator": {
        "title": "Number Translator",
        "description": "Enter a number and we'll translate it into words using a phonetic system. You can use separators like spaces, dashes, commas, etc. to group the digits.",
        "inputPlaceholder": "Enter numbers (e.g., 123-45)...",
        "inputAriaLabel": "Enter numbers to translate",
        "languageSelectorAriaLabel": "Select translation system language",
        "buttonTranslate": "Translate",
        "buttonTranslating": "Translating...",
        "resultsTitle": "Possible Translations ({{count}} found)",
        "customSeparatorLabel": "Using your custom separators",
        "defaultGroupingLabel": "Standard 2-digit grouping",
        "groupingLabel": "Grouping",
        "table": {
          "headerNumber": "Number",
          "headerWord": "Word"
        },
        "showMoreButton": "Show More Variations"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "No digits found",
          "description": "Please enter some numbers to translate"
        },
        "emptyInput": {
          "title": "Input is empty",
          "description": "Please enter some numbers to translate"
        },
        "translationComplete": {
          "title": "Translation complete",
          "customDesc": "Using your custom separators for the first translation. Found {{count}} additional variations.",
          "defaultDesc": "Showing standard 2-digit grouping first. Found {{count}} additional variations.",
          "variationsDesc": "Found {{count}} possible variations"
        },
        "noTranslations": {
          "title": "No translations found",
          "description": "Try a different input or check the selected language system"
        },
        "copied": {
          "title": "Copied!",
          "description": "Text copied to clipboard"
        }
      },

      // Help Page Content (Existing)
      "help": {
        "majorSystem": {
          "title": "Major System Guide",
          "whatIsIt": {
            "heading": "What is the Major System?",
            "p1": "The Major System is a mnemonic technique used to convert numbers into words. It works by converting digits into consonant sounds, which can then be combined with vowels to form memorable words."
          },
          "howItWorks": {
            "heading": "How it Works",
            "p1": "Each digit (0-9) is associated with specific consonant sounds. By adding vowels between these consonants, we can create memorable words that represent numbers."
          }
        },
        "benefits": {
          "heading": "Benefits of Using the Major System",
          "item1": { "title": "Enhanced Memory", "desc": "Converts abstract numbers into concrete, visualizable words" },
          "item2": { "title": "Long-term Retention", "desc": "Images created from words are easier to remember than sequences of digits" },
          "item3": { "title": "Faster Learning", "desc": "Memorize long number sequences in significantly less time" },
          "item4": { "title": "Mental Exercise", "desc": "Provides excellent mental workout and can improve overall cognitive function" },
          "item5": { "title": "Practical Applications", "desc": "Useful for remembering phone numbers, PINs, important dates, and historical facts" }
        },
        "practicalUses": {
          "heading": "Practical Uses",
          "p1": "Memory athletes use this system to memorize:",
          "item1": "Pi to thousands of digits",
          "item2": "Long credit card numbers",
          "item3": "Phone directories",
          "item4": "Historical dates",
          "item5": "Mathematical constants"
        },
        "tryItButton": "Try It Yourself",
        "footer": {
          "blogLink": "Visit Vidanov.com/blog"
        }
      },

      "flashcards": {
        "title": "Flashcards",
        "manageCards": "Manage Cards",
        "studySession": "Study Session",
        "noCards": "No Cards to Review",
        "addMoreCards": "Add more cards from the translator to start studying",
        "again": "Again",
        "hard": "Hard",
        "good": "Good",
        "easy": "Easy",
        "ratingSubmitted": "Rating Submitted",
        "nextReviewMinutes": "Next review in {{minutes}} minutes",
        "nextReview": "Next review in {{days}} days",
        "cardDeleted": "Card Deleted",
        "cardUpdated": "Card Updated",
        "editCard": "Edit Card",
        "enterMeaning": "Enter Meaning",
        "saveChanges": "Save Changes",
        "statistics": "Statistics",
        "totalCards": "Total Cards",
        "dueCards": "Due Now",
        "masteredCards": "Mastered",
        "learningCards": "Learning",
        "masterProgress": "Mastery Progress",
        "averageEase": "Average Ease",
        "nextInMinutes": "Next: {{minutes}}m",
        "interval": "Interval: {{value}}",
        "ease": "Ease: {{value}}",
        "learning": "Learning",
        "days": "{{count}} days",
        "howToAdd": "How to Add Flashcards",
        "howToStep1": "Go to the translator page and enter a number you want to learn",
        "howToStep2": "Click the save icon next to any translation you want to remember",
        "howToStep3": "Add a meaningful description to help you remember the number-word connection",
        "aboutSystem": "About the Learning System",
        "aboutPoint1": "Cards use spaced repetition - you'll see difficult cards more often and easy cards less frequently",
        "aboutPoint2": "New cards start with short intervals (minutes) and gradually increase to days as you learn them",
        "aboutPoint3": "Rate your recall honestly to help the system adjust review timing for optimal learning",
        "saveCardSuccess": "Card Saved!",
        "cardAddedToStudy": "Card has been added to your study deck",
        "lateReview": "Review was {{days}} days late. {{next}}",
        "saveCardTitle": "Save Card",
        "enterMeaningPrompt": "Enter meaning for this number",
        "save": "Save",
        "cancel": "Cancel"
      }
    }
  },
  de: {
    translation: {
      // General UI
      "appTitle": "Nummernmagie Übersetzen",
      "navHome": "Startseite",
      "navHelp": "Hilfe",
      "copyButton": "Kopieren",
      "copiedTooltip": "Kopiert!",
      "navFlashcards": "Karteikarten",

      // Translator Page
      "translator": {
        "title": "Zahlenübersetzer",
        "description": "Geben Sie eine Zahl ein und wir übersetzen sie mithilfe eines phonetischen Systems in Wörter. Sie können Trennzeichen wie Leerzeichen, Bindestriche, Kommas usw. verwenden, um die Ziffern zu gruppieren.",
        "inputPlaceholder": "Zahlen eingeben (z.B. 123-45)...",
        "inputAriaLabel": "Zahlen zur Übersetzung eingeben",
        "languageSelectorAriaLabel": "Sprache des Übersetzungssystems auswählen",
        "buttonTranslate": "Übersetzen",
        "buttonTranslating": "Übersetze...",
        "resultsTitle": "Mögliche Übersetzungen ({{count}} gefunden)",
        "customSeparatorLabel": "Ihre benutzerdefinierten Trennzeichen werden verwendet",
        "defaultGroupingLabel": "Standard-2-Ziffern-Gruppierung",
        "groupingLabel": "Gruppierung",
        "table": {
          "headerNumber": "Zahl",
          "headerWord": "Wort"
        },
        "showMoreButton": "Mehr Varianten anzeigen"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "Keine Ziffern gefunden",
          "description": "Bitte geben Sie Zahlen zur Übersetzung ein"
        },
        "emptyInput": {
          "title": "Eingabe ist leer",
          "description": "Bitte geben Sie Zahlen zur Übersetzung ein"
        },
        "translationComplete": {
          "title": "Übersetzung abgeschlossen",
          "customDesc": "Ihre benutzerdefinierten Trennzeichen für die erste Übersetzung verwendet. {{count}} zusätzliche Varianten gefunden.",
          "defaultDesc": "Standard-2-Ziffern-Gruppierung zuerst angezeigt. {{count}} zusätzliche Varianten gefunden.",
          "variationsDesc": "{{count}} mögliche Varianten gefunden"
        },
        "noTranslations": {
          "title": "Keine Übersetzungen gefunden",
          "description": "Versuchen Sie eine andere Eingabe oder überprüfen Sie das ausgewählte Sprachsystem"
        },
        "copied": {
          "title": "Kopiert!",
          "description": "Text in die Zwischenablage kopiert"
        }
      },

      // Help Page Content (Existing)
      "help": {
        "majorSystem": {
          "title": "Das Major-System verstehen",
          "whatIsIt": {
            "heading": "Was ist das Major-System?",
            "p1": "Das Major-System (auch Major-Methode oder phonetisches Zahlensystem genannt) ist eine Mnemotechnik zur Unterstützung beim Auswendiglernen von Zahlen. Es funktioniert, indem Zahlen in Konsonantenlaute und dann durch Hinzufügen von Vokalen in Wörter umgewandelt werden."
          },
          "howItWorks": {
            "heading": "Wie das System funktioniert",
            "p1": "Jeder Ziffer von 0-9 sind bestimmte Konsonantenlaute zugeordnet:"
          }
        },
        "benefits": {
          "heading": "Vorteile der Verwendung des Major-Systems",
          "item1": { "title": "Verbessertes Gedächtnis", "desc": "Wandelt abstrakte Zahlen in konkrete, visualisierbare Wörter um" },
          "item2": { "title": "Langfristige Speicherung", "desc": "Aus Wörtern erstellte Bilder sind leichter zu merken als Ziffernfolgen" },
          "item3": { "title": "Schnelleres Lernen", "desc": "Lange Zahlenfolgen in deutlich kürzerer Zeit auswendig lernen" },
          "item4": { "title": "Mentales Training", "desc": "Bietet ausgezeichnetes mentales Training und kann die allgemeine kognitive Funktion verbessern" },
          "item5": { "title": "Praktische Anwendungen", "desc": "Nützlich zum Merken von Telefonnummern, PINs, important dates, and historical facts" }
        },
        "practicalUses": {
          "heading": "Praktische Anwendungen",
          "p1": "Gedächtnissportler verwenden dieses System zum Auswendiglernen von:",
          "item1": "Pi auf Tausende von Stellen",
          "item2": "Longen Kreditkartennummern",
          "item3": "Telefonverzeichnissen",
          "item4": "Historischen Daten",
          "item5": "Mathematischen Konstanten"
        },
        "tryItButton": "Probieren Sie es selbst aus",
        "footer": {
          "blogLink": "Visit Vidanov.com/blog"
        }
      },

      "flashcards": {
        "title": "Karteikarten",
        "manageCards": "Karten verwalten",
        "studySession": "Lernsitzung",
        "noCards": "Keine Karten zum Wiederholen",
        "addMoreCards": "Fügen Sie mehr Karten aus dem Übersetzer hinzu, um mit dem Lernen zu beginnen",
        "again": "Wiederholen",
        "hard": "Schwer",
        "good": "Gut",
        "easy": "Einfach",
        "ratingSubmitted": "Bewertung gespeichert",
        "nextReviewMinutes": "Nächste Wiederholung in {{minutes}} Minuten",
        "nextReview": "Nächste Wiederholung in {{days}} Tagen",
        "cardDeleted": "Karte gelöscht",
        "cardUpdated": "Karte aktualisiert",
        "saveCard": "Als Karteikarte speichern",
        "enterMeaning": "Geben Sie die Bedeutung für diese Nummer ein",
        "cardSaved": "Karte erfolgreich gespeichert!",
        "saveCardTitle": "Karte speichern",
        "enterMeaningPrompt": "Bedeutung für diese Nummer eingeben",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "statistics": "Statistiken",
        "totalCards": "Gesamtkarten",
        "dueCards": "Jetzt fällig",
        "masteredCards": "Geschätzt",
        "learningCards": "Lernen",
        "masterProgress": "Meisterschaftsfortschritt",
        "averageEase": "Durchschnittliche Einfachheit",
        "nextInMinutes": "Nächste: {{minutes}}m",
        "interval": "Intervall: {{value}}",
        "ease": "Einfachheit: {{value}}",
        "learning": "Lernen",
        "days": "{{count}} Tage",
        "howToAdd": "Wie man Karteikarten hinzufügt",
        "howToStep1": "Gehen Sie zur Übersetzerseite und geben Sie eine Zahl ein, die Sie lernen möchten",
        "howToStep2": "Klicken Sie auf das Speichersymbol neben der Übersetzung, die Sie sich merken möchten",
        "howToStep3": "Fügen Sie eine aussagekräftige Beschreibung hinzu, die Ihnen hilft, die Verbindung zwischen Zahl und Wort zu merken",
        "aboutSystem": "Über das Lernsystem",
        "aboutPoint1": "Die Karten verwenden gestaffelte Wiederholung - schwierige Karten sehen Sie häufiger, einfache seltener",
        "aboutPoint2": "Neue Karten beginnen mit kurzen Intervallen (Minuten) und steigern sich allmählich zu Tagen, während Sie sie lernen",
        "aboutPoint3": "Bewerten Sie Ihre Erinnerung ehrlich, damit das System die Wiederholungszeiten für optimales Lernen anpassen kann",
        "saveCardSuccess": "Karte gespeichert!",
        "cardAddedToStudy": "Karte wurde zu deinem Lernstapel hinzugefügt",
        "lateReview": "Wiederholung war {{days}} Tage überfällig. {{next}}"
      }
    }
  },
  es: {
    translation: {
      // General UI
      "appTitle": "Traductor Mágico de Números",
      "navHome": "Inicio",
      "navHelp": "Ayuda",
      "copyButton": "Copiar",
      "copiedTooltip": "¡Copiado!",
      "navFlashcards": "Tarjetas",

      // Translator Page
      "translator": {
        "title": "Traductor de Números",
        "description": "Ingrese un número y lo traduciremos a palabras usando un sistema fonético. Puede usar separadores como espacios, guiones, comas, etc. para agrupar los dígitos.",
        "inputPlaceholder": "Ingrese números (ej., 123-45)...",
        "inputAriaLabel": "Ingrese números para traducir",
        "languageSelectorAriaLabel": "Seleccione el idioma del sistema de traducción",
        "buttonTranslate": "Traducir",
        "buttonTranslating": "Traduciendo...",
        "resultsTitle": "Posibles Traducciones ({{count}} encontradas)",
        "customSeparatorLabel": "Usando sus separadores personalizados",
        "defaultGroupingLabel": "Agrupación estándar de 2 dígitos",
        "groupingLabel": "Agrupación",
        "table": {
          "headerNumber": "Número",
          "headerWord": "Palabra"
        },
        "showMoreButton": "Mostrar Más Variaciones"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "No se encontraron dígitos",
          "description": "Por favor ingrese algunos números para traducir"
        },
        "emptyInput": {
          "title": "La entrada está vacía",
          "description": "Por favor ingrese algunos números para traducir"
        },
        "translationComplete": {
          "title": "Traducción completada",
          "customDesc": "Usando sus separadores personalizados para la primera traducción. Se encontraron {{count}} variaciones adicionales.",
          "defaultDesc": "Mostrando agrupación estándar de 2 dígitos primero. Se encontraron {{count}} variaciones adicionales.",
          "variationsDesc": "Se encontraron {{count}} posibles variaciones"
        },
        "noTranslations": {
          "title": "Nose encontraron traducciones",
          "description": "Intente una entrada diferente o verifique el sistema de idioma seleccionado"
        },
        "copied": {
          "title": "Copiado!",
          "description": "Texto copiado al portapapeles"
        }
      },

      // Help Page Content
      "help": {
        "majorSystem": {
          "title": "Guía del Sistema Mayor",
          "whatIsIt": {
            "heading": "¿Qué es el Sistema Mayor?",
            "p1": "El Sistema Mayor es una técnica mnemotécnica utilizada para convertir números en palabras. Funciona convirtiendo dígitos en sonidos consonánticos, que luego se pueden combinar con vocales para formar palabras memorables."
          },
          "howItWorks": {
            "heading": "Cómo Funciona",
            "p1": "Cada dígito (0-9) está asociado con sonidos consonantiques específicos. Al agregar vocales entre estas consonantes, podemos crear palabras memorables que representen números."
          }
        },
        "benefits": {
          "heading": "Beneficios del Sistema Mayor",
          "item1": { "title": "Memoria Mejorada", "desc": "Convierte números abstractos en palabras concretas y visualizables" },
          "item2": { "title": "Retención a Largo Plazo", "desc": "Las imágenes creadas a partir de palabras son más fáciles de recordar que las secuencias de dígitos" },
          "item3": { "title": "Aprendizaje Más Rápido", "desc": "Memorice secuencias largas de números en significativamente menos tiempo" },
          "item4": { "title": "Ejercicio Mental", "desc": "Proporciona un excelente entrenamiento mental y puede mejorar la función cognitiva general" },
          "item5": { "title": "Aplicaciones Prácticas", "desc": "Útil para recordar números de teléfono, PINs, fechas importantes y hechos históricos" }
        },
        "practicalUses": {
          "heading": "Usos Prácticos",
          "p1": "Los atletas de memoria usan este sistema para memorizar:",
          "item1": "Pi hasta miles de dígitos",
          "item2": "Números largos de tarjetas de crédito",
          "item3": "Directorios telefónicos",
          "item4": "Fechas históricas",
          "item5": "Constantes matemáticas"
        },
        "tryItButton": "Pruébalo Tú Mismo",
        "footer": {
          "blogLink": "Visita Vidanov.com/blog"
        }
      },

      "flashcards": {
        "title": "Tarjetas",
        "manageCards": "Gestionar tarjetas",
        "studySession": "Sesión de estudio",
        "noCards": "No hay tarjetas para repasar",
        "addMoreCards": "Añade más tarjetas desde el traductor para empezar a estudiar",
        "again": "De nuevo",
        "hard": "Difícil",
        "good": "Bien",
        "easy": "Fácil",
        "ratingSubmitted": "Calificación guardada",
        "nextReviewMinutes": "Próxima revisión en {{minutes}} minutos",
        "nextReview": "Próxima revisión en {{days}} días",
        "cardDeleted": "Tarjeta eliminada",
        "cardUpdated": "Tarjeta actualizada",
        "editCard": "Editar tarjeta",
        "enterMeaning": "Ingresar significado",
        "saveChanges": "Guardar cambios",
        "saveCard": "Guardar como Tarjeta",
        "saveCardTitle": "Guardar Tarjeta",
        "enterMeaningPrompt": "Ingresar significado para este número",
        "save": "Guardar",
        "cancel": "Cancelar",
        "statistics": "Estadísticas",
        "totalCards": "Tarjetas totales",
        "dueCards": "Por vencer",
        "masteredCards": "Aprendidas",
        "learningCards": "Aprendiendo",
        "masterProgress": "Progreso de maestría",
        "averageEase": "Facilité moyenne",
        "nextInMinutes": "Próximo: {{minutes}}m",
        "interval": "Intervalo: {{value}}",
        "ease": "Facilité: {{value}}",
        "learning": "Aprendiendo",
        "days": "{{count}} días",
        "howToAdd": "Cómo añadir tarjetas",
        "howToStep1": "Ve a la página del traductor e ingresa un número que quieras aprender",
        "howToStep2": "Haz clic en el icono de guardar junto a cualquier traducción que quieras recordar",
        "howToStep3": "Añade una descripción significativa que te ayude a recordar la conexión entre el número y la palabra",
        "aboutSystem": "Sobre el sistema de aprendizaje",
        "aboutPoint1": "Las tarjetas utilizan repetición espaciada - verás les tarjetas difíciles con más frecuencia y les fáciles con menos frecuencia",
        "aboutPoint2": "Las tarjetas nuevas comienzan con intervalos cortos (minutos) y aumentan gradualmente a días mientras las aprendes",
        "aboutPoint3": "Califica tu recuerdo honestamente para ayudar al sistema a ajustar los tiempos de repaso para un aprendizaje óptimo",
        "saveCardSuccess": "¡Tarjeta guardada!",
        "cardAddedToStudy": "La tarjeta se ha añadido a tu mazo de estudio",
        "lateReview": "Review was {{days}} days late. {{next}}"
      }
    }
  },
  fr: {
    translation: {
      // General UI
      "appTitle": "Traducteur Magique de Nombres",
      "navHome": "Accueil",
      "navHelp": "Aide",
      "copyButton": "Copier",
      "copiedTooltip": "Copié !",
      "navFlashcards": "Cartes",

      // Translator Page
      "translator": {
        "title": "Traducteur de Nombres",
        "description": "Entrez un nombre et nous le traduirons en mots en utilisant un système phonétique. Vous pouvez utiliser des séparateurs comme des espaces, des tirets, des virgules, etc. pour regrouper les chiffres.",
        "inputPlaceholder": "Entrez des nombres (ex., 123-45)...",
        "inputAriaLabel": "Entrez des nombres à traduire",
        "languageSelectorAriaLabel": "Sélectionnez la langue du système de traduction",
        "buttonTranslate": "Traduire",
        "buttonTranslating": "Traduction en cours...",
        "resultsTitle": "Traductions Possibles ({{count}} trouvées)",
        "customSeparatorLabel": "Utilisation de vos séparateurs personnalisés",
        "defaultGroupingLabel": "Regroupement standard de 2 chiffres",
        "groupingLabel": "Regroupement",
        "table": {
          "headerNumber": "Nombre",
          "headerWord": "Mot"
        },
        "showMoreButton": "Afficher Plus de Variations"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "Aucun chiffre trouvé",
          "description": "Veuillez entrer des nombres à traduire"
        },
        "emptyInput": {
          "title": "L'entrée est vide",
          "description": "Veuillez entrer des nombres à traduire"
        },
        "translationComplete": {
          "title": "Traduction terminée",
          "customDesc": "Utilisation de vos séparateurs personnalisés pour la première traduction. {{count}} variations supplémentaires trouvées.",
          "defaultDesc": "Affichage du regroupement standard de 2 chiffres en premier. {{count}} variations supplémentaires trouvées.",
          "variationsDesc": "{{count}} variations possibles trouvées"
        },
        "noTranslations": {
          "title": "Aucune traduction trouvée",
          "description": "Essayez une entrée différente ou vérifiez le système de langue sélectionné"
        },
        "copied": {
          "title": "Copié !",
          "description": "Texte copié dans le presse-papiers"
        }
      },

      // Help Page Content
      "help": {
        "majorSystem": {
          "title": "Guide du Système Majeur",
          "whatIsIt": {
            "heading": "Qu'est-ce que le Système Majeur ?",
            "p1": "Le Système Majeur est une technique mnémotechnique utilisée pour convertir des nombres en mots. Il fonctionne en convertissant des chiffres en sons consonantiques, qui peuvent ensuite être combinés avec des voyelles pour former des mots mémorables."
          },
          "howItWorks": {
            "heading": "Comment ça marche",
            "p1": "Chaque chiffre (0-9) est associé à des sons consonantiques spécifiques. En ajoutant des voyelles entre ces consonnes, nous pouvons créer des mots mémorables qui représentent des nombres."
          }
        },
        "benefits": {
          "heading": "Avantages du Système Majeur",
          "item1": { "title": "Mémoire Améliorée", "desc": "Convertit des nombres abstraits en mots concrets et visualisables" },
          "item2": { "title": "Rétention à Long Terme", "desc": "Les images créées à partir des mots sont plus faciles à mémoriser que les séquences de chiffres" },
          "item3": { "title": "Apprentissage Plus Rapide", "desc": "Mémorisez de longues séquences de nombres en beaucoup moins de temps" },
          "item4": { "title": "Exercice Mental", "desc": "Fournit un excellent entraînement mental et peut améliorer la fonction cognitive générale" },
          "item5": { "title": "Applications Pratiques", "desc": "Utile pour mémoriser des numéros de téléphone, des codes PIN, des dates importantes et des faits historiques" }
        },
        "practicalUses": {
          "heading": "Utilisations Pratiques",
          "p1": "Les athlètes de la mémoire utilisent ce système pour mémoriser :",
          "item1": "Pi jusqu'à des milliers de chiffres",
          "item2": "De longs numéros de cartes de crédit",
          "item3": "Des annuaires téléphoniques",
          "item4": "Des dates historiques",
          "item5": "Des constantes mathématiques"
        },
        "tryItButton": "Essayez-le Vous-même",
        "footer": {
          "blogLink": "Visitez Vidanov.com/blog"
        }
      },

      "flashcards": {
        "title": "Cartes mémoire",
        "manageCards": "Gérer les cartes",
        "studySession": "Session d'étude",
        "noCards": "Aucune carte à réviser",
        "addMoreCards": "Ajoutez plus de cartes depuis le traducteur pour commencer à étudier",
        "again": "À revoir",
        "hard": "Difficile",
        "good": "Bien",
        "easy": "Facile",
        "ratingSubmitted": "Évaluation enregistrée",
        "nextReviewMinutes": "Prochaine révision dans {{minutes}} minutes",
        "nextReview": "Prochaine révision dans {{days}} jours",
        "cardDeleted": "Carte supprimée",
        "cardUpdated": "Carte mise à jour",
        "editCard": "Modifier la carte",
        "enterMeaning": "Entrer le sens",
        "saveChanges": "Enregistrer les modifications",
        "saveCard": "Enregistrer comme Carte",
        "saveCardTitle": "Enregistrer Carte",
        "enterMeaningPrompt": "Entrer le sens pour ce nombre",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "statistics": "Statistiques",
        "totalCards": "Cartes totales",
        "dueCards": "À échéance",
        "masteredCards": "Apprises",
        "learningCards": "En cours d'apprentissage",
        "masterProgress": "Progression de maîtrise",
        "averageEase": "Facilité moyenne",
        "nextInMinutes": "Prochaine: {{minutes}}m",
        "interval": "Intervalle: {{value}}",
        "ease": "Facilité: {{value}}",
        "learning": "En cours d'apprentissage",
        "days": "{{count}} jours",
        "saveCardSuccess": "Carte enregistrée !",
        "cardAddedToStudy": "La carte a été ajoutée à votre paquet d'étude",
        "lateReview": "Review was {{days}} days late. {{next}}"
      }
    }
  },
  it: {
    translation: {
      // General UI
      "appTitle": "Traduttore Magico di Numeri",
      "navHome": "Home",
      "navHelp": "Aiuto",
      "copyButton": "Copia",
      "copiedTooltip": "Copiato!",
      "navFlashcards": "Carte",

      // Translator Page
      "translator": {
        "title": "Traduttore di Numeri",
        "description": "Inserisci un numero e lo tradurremo in parole usando un sistema fonetico. Puoi usare separatori come spazi, trattini, virgole, ecc. per raggruppare le cifre.",
        "inputPlaceholder": "Inserisci numeri (es., 123-45)...",
        "inputAriaLabel": "Inserisci numeri da tradurre",
        "languageSelectorAriaLabel": "Seleziona la lingua del sistema di traduzione",
        "buttonTranslate": "Traduci",
        "buttonTranslating": "Traduzione in corso...",
        "resultsTitle": "Possibili Traduzioni ({{count}} trovate)",
        "customSeparatorLabel": "Utilizzo dei tuoi separatori personalizzati",
        "defaultGroupingLabel": "Raggruppamento standard di 2 cifre",
        "groupingLabel": "Raggruppamento",
        "table": {
          "headerNumber": "Numero",
          "headerWord": "Parola"
        },
        "showMoreButton": "Mostra Più Variazioni"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "Nessuna cifra trovata",
          "description": "Inserisci alcuni numeri da tradurre"
        },
        "emptyInput": {
          "title": "L'input è vuoto",
          "description": "Inserisci alcuni numeri da tradurre"
        },
        "translationComplete": {
          "title": "Traduzione completata",
          "customDesc": "Utilizzo dei tuoi separatori personalizzati per la prima traduzione. Trovate {{count}} variazioni aggiuntive.",
          "defaultDesc": "Mostrando il raggruppamento standard di 2 cifre prima. Trovate {{count}} variazioni aggiuntive.",
          "variationsDesc": "Trovate {{count}} possibili variazioni"
        },
        "noTranslations": {
          "title": "Nessuna traduzione trovata",
          "description": "Prova un input diverso o controlla il sistema di lingua selezionato"
        },
        "copied": {
          "title": "Copiato!",
          "description": "Testo copiato nel portapapere"
        }
      },

      // Help Page Content
      "help": {
        "majorSystem": {
          "title": "Guida al Sistema Maggiore",
          "whatIsIt": {
            "heading": "Cos'è il Sistema Maggiore?",
            "p1": "Il Sistema Maggiore è una tecnica mnemonica utilizzata per convertire numeri in parole. Funziona convertendo cifre in suoni consonantici, che possono poi essere combinati con vocali per formare parole memorabili."
          },
          "howItWorks": {
            "heading": "Come Funziona",
            "p1": "Ogni cifra (0-9) è associata a suoni consonantici specifici. Aggiungendo vocali tra queste consonanti, possiamo creare parole memorabili che rappresentano numeri."
          }
        },
        "benefits": {
          "heading": "Vantaggi del Sistema Maggiore",
          "item1": { "title": "Memoria Migliorata", "desc": "Converte numeri astratti in parole concrete e visualizabili" },
          "item2": { "title": "Ritenzione a Lungo Termine", "desc": "Le immagini created dalle parole sono più facili da ricordare delle sequenze di cifre" },
          "item3": { "title": "Apprendimento Più Veloce", "desc": "Memorizza lunghe sequenze di numeri in molto meno tempo" },
          "item4": { "title": "Esercizio Mentale", "desc": "Fornisce un ottimo allenamento mentale e può migliorare la funzione cognitiva generale" },
          "item5": { "title": "Applicazioni Pratiche", "desc": "Utile per ricordare numeri di telefono, PIN, date importanti e fatti storici" }
        },
        "practicalUses": {
          "heading": "Usi Pratici",
          "p1": "Gli atleti della memoria usano questo sistema per memorizzare:",
          "item1": "Pi fino a migliaia di cifre",
          "item2": "Lunghi numeri di carte di credito",
          "item3": "Rubriche telefoniche",
          "item4": "Dat historycznych",
          "item5": "Stałych matematycznych"
        },
        "tryItButton": "Provalo Tu Stesso",
        "footer": {
          "blogLink": "Visita Vidanov.com/blog"
        }
      },

      "flashcards": {
        "title": "Carte",
        "manageCards": "Gestisci carte",
        "studySession": "Sessione di studio",
        "noCards": "Nessuna carta da ripassare",
        "addMoreCards": "Aggiungi più carte dal traduttore per iniziare a studiare",
        "again": "Di nuovo",
        "hard": "Difficile",
        "good": "Bene",
        "easy": "Fácil",
        "ratingSubmitted": "Valutazione salvata",
        "nextReviewMinutes": "Prossima ripetizione tra {{minutes}} minuti",
        "nextReview": "Prossima ripetizione tra {{days}} giorni",
        "cardDeleted": "Carta eliminata",
        "cardUpdated": "Carta aggiornata",
        "editCard": "Modifica carta",
        "enterMeaning": "Inserisci significato",
        "saveChanges": "Salva modifiche",
        "saveCard": "Salva come Carta",
        "saveCardTitle": "Salva Carta",
        "enterMeaningPrompt": "Inserisci significato per questo numero",
        "save": "Salva",
        "cancel": "Annulla",
        "statistics": "Statistiche",
        "totalCards": "Carte totali",
        "dueCards": "Per scadenza",
        "masteredCards": "Imparate",
        "learningCards": "In corso d'apprendimento",
        "masterProgress": "Progressione di maestria",
        "averageEase": "Facilità media",
        "nextInMinutes": "Próximo: {{minutes}}m",
        "interval": "Intervallo: {{value}}",
        "ease": "Facilidade: {{value}}",
        "learning": "In corso d'apprendimento",
        "days": "{{count}} giorni",
        "saveCardSuccess": "Carta salvata!",
        "cardAddedToStudy": "La carta è stata aggiunta al tuo mazzo di studio",
        "lateReview": "Review was {{days}} days late. {{next}}"
      }
    }
  },
  ru: {
    translation: {
      // General UI
      "appTitle": "Магия Чисел",
      "navHome": "Главная",
      "navHelp": "Помощь",
      "copyButton": "Копировать",
      "copiedTooltip": "Скопировано!",
      "navFlashcards": "Карточки",

      // Translator Page
      "translator": {
        "title": "Переводчик Чисел",
        "description": "Введите число, и мы переведем его в слова с помощью фонетической системы. Вы можете использовать разделители, такие как пробелы, тире, запятые и т.д., для группировки цифр.",
        "inputPlaceholder": "Введите числа (например, 123-45)...",
        "inputAriaLabel": "Введите числа для перевода",
        "languageSelectorAriaLabel": "Выберите язык системы перевода",
        "buttonTranslate": "Перевести",
        "buttonTranslating": "Перевожу...",
        "resultsTitle": "Возможные переводы (найдено {{count}})",
        "customSeparatorLabel": "Используются ваши пользовательские разделители",
        "defaultGroupingLabel": "Стандартная группировка по 2 цифры",
        "groupingLabel": "Группировка",
        "table": {
          "headerNumber": "Число",
          "headerWord": "Слово"
        },
        "showMoreButton": "Показать больше вариантов"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "Цифры не найдены",
          "description": "Пожалуйста, введите числа для перевода"
        },
        "emptyInput": {
          "title": "Ввод пуст",
          "description": "Пожалуйста, введите числа для перевода"
        },
        "translationComplete": {
          "title": "Перевод завершен",
          "customDesc": "Используются ваши пользовательские разделители для первого перевода. Найдено {{count}} дополнительных вариантов.",
          "defaultDesc": "Показана стандартная группировка по 2 цифры. Найдено {{count}} дополнительных вариантов.",
          "variationsDesc": "Найдено {{count}} возможных вариантов"
        },
        "noTranslations": {
          "title": "Переводы не найдены",
          "description": "Попробуйте другой ввод или проверьте выбранную языковую систему"
        },
        "copied": {
          "title": "Скопировано!",
          "description": "Текст скопирован в буфер обмена"
        }
      },

      // Help Page
      "help": {
        "majorSystem": {
          "title": "Руководство по БЦК",
          "whatIsIt": {
            "heading": "Что такое БЦК?",
            "p1": "БЦК (Буквенно-Цифровой Код) - это мнемоническая техника, используемая для преобразования чисел в слова. Она работает путем преобразования цифр в согласные звуки, которые затем можно комбинировать с гласными для образования запоминающихся слов."
          },
          "howItWorks": {
            "heading": "Как это работает",
            "p1": "Каждой цифре (0-9) соответствуют определенные согласные звуки. Добавляя гласные между этими согласными, мы можем создавать запоминающиеся слова, представляющие числа."
          },
          "russianSystem": {
            "heading": "Русская система (БЦК - Буквенно-Цифровой Код)",
            "p1": "В русской системе, известной как БЦК (Буквенно-Цифровой Код), используется похожий подход, но адаптированный под кириллицу:",
            "digit0": '"Н", "М" (N, M)',
            "digit1": '"Г", "Ж" (G, ZH)',
            "digit2": '"Д", "Т" (D, T)',
            "digit3": '"К", "Х" (K, KH)',
            "digit4": '"Ч", "Щ" (CH, SHCH)',
            "digit5": '"П", "Б" (P, B)',
            "digit6": '"Ш", "Л" (SH, L)',
            "digit7": '"С", "З" (S, Z)',
            "digit8": '"В", "Ф" (V, F)',
            "digit9": '"Р", "Ц" (R, TS)'
          }
        },
        "benefits": {
          "heading": "Преимущества использования БЦК",
          "item1": { "title": "Улучшенная память", "desc": "Преобразует абстрактные числа в конкретные, визуализируемые слова" },
          "item2": { "title": "Долгосрочное запоминание", "desc": "Образы, созданные из слов, легче запомнить, чем последовательности цифр" },
          "item3": { "title": "Быстрое обучение", "desc": "Запоминание длинных последовательностей чисел за значительно меньшее время" },
          "item4": { "title": "Умственная тренировка", "desc": "Обеспечивает отличный тренинг умственный и может улучшить общую когнитивную функцию" },
          "item5": { "title": "Практическое применение", "desc": "Полезно для запоминания телефонных номеров, PIN-кодов, важных дат и исторических фактов" }
        },
        "practicalUses": {
          "heading": "Практическое применение",
          "p1": "Спортсмены по памяти используют эту систему для запоминания:",
          "item1": "Числа π до тысяч знаков",
          "item2": "Длинных номеров кредитных карт",
          "item3": "Телефонных справочников",
          "item4": "Исторических дат",
          "item5": "Математических констант"
        },
        "tryItButton": "Попробуйте сами",
        "footer": {
          "blogLink": "Посетите Vidanov.com/blog"
        }
      },

      "flashcards": {
        "title": "Карточки",
        "manageCards": "Управление карточками",
        "studySession": "Сессия изучения",
        "noCards": "Нет карточек для повторения",
        "addMoreCards": "Добавьте больше карточек из переводчика, чтобы начать изучение",
        "again": "Снова",
        "hard": "Сложно",
        "good": "Хорошо",
        "easy": "Легко",
        "ratingSubmitted": "Оценка сохранена",
        "nextReviewMinutes": "Следующее повторение через {{minutes}} минут",
        "nextReview": "Следующее повторение через {{days}} дней",
        "cardDeleted": "Карточка удалена",
        "cardUpdated": "Карточка обновлена",
        "editCard": "Редактировать карточку",
        "enterMeaning": "Введите значение",
        "saveChanges": "Сохранить изменения",
        "saveCard": "Сохранить как карточку",
        "saveCardTitle": "Сохранить карточку",
        "enterMeaningPrompt": "Введите значение для этого числа",
        "save": "Сохранить",
        "cancel": "Отмена",
        "statistics": "Статистика",
        "totalCards": "Всего карточек",
        "dueCards": "К выполнению",
        "masteredCards": "Выученные",
        "learningCards": "В процессе изучения",
        "masterProgress": "Прогресс мастерства",
        "averageEase": "Средняя легкость",
        "nextInMinutes": "Следующая: {{minutes}}m",
        "interval": "Интервал: {{value}}",
        "ease": "Легкость: {{value}}",
        "learning": "В процессе изучения",
        "days": "{{count}} дней",
        "saveCardSuccess": "Карточка сохранена!",
        "cardAddedToStudy": "Карточка добавлена в колоду для изучения",
        "lateReview": "Повторение просрочено на {{days}} дней. {{next}}"
      }
    }
  },
  pl: {
    translation: {
      // General UI
      "appTitle": "Magiczne Liczby",
      "navHome": "Strona główna",
      "navHelp": "Pomoc",
      "copyButton": "Kopiuj",
      "copiedTooltip": "Skopiowano!",
      "navFlashcards": "Fiszki",

      // Translator Page
      "translator": {
        "title": "Tłumacz Liczb",
        "description": "Wprowadź liczbę, a my przetłumaczymy ją na słowa używając systemu fonetycznego. Możesz użyć separatorów jak spacje, myślniki, przecinki itp. do grupowania cyfr.",
        "inputPlaceholder": "Wprowadź liczby (np. 123-45)...",
        "inputAriaLabel": "Wprowadź liczby do przetłumaczenia",
        "languageSelectorAriaLabel": "Wybierz język systemu tłumaczenia",
        "buttonTranslate": "Tłumacz",
        "buttonTranslating": "Tłumaczenie...",
        "resultsTitle": "Możliwe tłumaczenia (znaleziono {{count}})",
        "customSeparatorLabel": "Używanie własnych separatorów",
        "defaultGroupingLabel": "Standardowe grupowanie 2-cyfrowe",
        "groupingLabel": "Grupowanie",
        "table": {
          "headerNumber": "Liczba",
          "headerWord": "Słowo"
        },
        "showMoreButton": "Pokaż więcej wariantów"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "Nie znaleziono cyfr",
          "description": "Wprowadź liczby do przetłumaczenia"
        },
        "emptyInput": {
          "title": "Puste pole",
          "description": "Wprowadź liczby do przetłumaczenia"
        },
        "translationComplete": {
          "title": "Tłumaczenie zakończone",
          "customDesc": "Użyto własnych separatorów dla pierwszego tłumaczenia. Znaleziono {{count}} dodatkowych wariantów.",
          "defaultDesc": "Pokazano standardowe grupowanie 2-cyfrowe. Znaleziono {{count}} dodatkowych wariantów.",
          "variationsDesc": "Znaleziono {{count}} możliwych wariantów"
        },
        "noTranslations": {
          "title": "Nie znaleziono tłumaczeń",
          "description": "Spróbuj innego wpisu lub sprawdź wybrany system językowy"
        },
        "copied": {
          "title": "Skopiowano!",
          "description": "Tekst skopiowany do schowka"
        }
      },

      "flashcards": {
        "title": "Fiszki",
        "manageCards": "Zarządzaj fiszkami",
        "studySession": "Sesja nauki",
        "noCards": "Brak fiszek do powtórki",
        "addMoreCards": "Dodaj więcej fiszek z tłumacza, aby rozpocząć naukę",
        "again": "Powtórz",
        "hard": "Trudne",
        "good": "Dobre",
        "easy": "Łatwe",
        "ratingSubmitted": "Ocena zapisana",
        "nextReviewMinutes": "Następna powtórka za {{minutes}} minut",
        "nextReview": "Następna powtórka za {{days}} dni",
        "cardDeleted": "Fiszka usunięta",
        "cardUpdated": "Fiszka zaktualizowana",
        "editCard": "Edytuj fiszkę",
        "enterMeaning": "Wprowadź znaczenie",
        "saveChanges": "Zapisz zmiany",
        "saveCard": "Zapisz jako fiszkę",
        "saveCardTitle": "Zapisz fiszkę",
        "enterMeaningPrompt": "Wprowadź znaczenie dla tej liczby",
        "save": "Zapisz",
        "cancel": "Anuluj",
        "statistics": "Statystyki",
        "totalCards": "Wszystkie fiszki",
        "dueCards": "Do powtórki",
        "masteredCards": "Opanowane",
        "learningCards": "W trakcie nauki",
        "masterProgress": "Postęp opanowania",
        "averageEase": "Średnia łatwość",
        "nextInMinutes": "Następna: {{minutes}}m",
        "interval": "Interwał: {{value}}",
        "ease": "Łatwość: {{value}}",
        "learning": "W trakcie nauki",
        "days": "{{count}} dni",
        "saveCardSuccess": "Fiszka zapisana!",
        "cardAddedToStudy": "Fiszka została dodana do twojej talii",
        "lateReview": "Powtórka spóźniona o {{days}} dni. {{next}}",
        "numberTranslations": {
          "0": ["n", "m"],
          "1": ["t", "d"],
          "2": ["n"],
          "3": ["m"],
          "4": ["r"],
          "5": ["l"],
          "6": ["j", "ż", "sz"],
          "7": ["k", "g"],
          "8": ["f", "w"],
          "9": ["p", "b"],
          "description": "Polski system fonetyczny używa następujących dźwięków spółgłoskowych:",
          "examples": {
            "title": "Przykłady:",
            "items": [
              "0 = n, m (nos, mak)",
              "1 = t, d (tama, dom)",
              "2 = n (noc)",
              "3 = m (most)",
              "4 = r (rak)",
              "5 = l (las)",
              "6 = j, ż, sz (jama, żaba, szum)",
              "7 = k, g (kot, góra)",
              "8 = f, w (fala, woda)",
              "9 = p, b (pies, bat)"
            ]
          }
        },
        "enterNumber": "Wprowadź liczbę",
        "translate": "Tłumacz",
        "clear": "Wyczyść",
        "copy": "Kopiuj",
        "copied": "Skopiowano!",
        "saveAsFlashcard": "Zapisz jako fiszkę"
      },

      "help": {
        "majorSystem": {
          "title": "Przewodnik po Systemie Głównym",
          "whatIsIt": {
            "heading": "Czym jest System Główny?",
            "p1": "System Główny to technika mnemotechniczna używana do zamiany liczb w słowa. Działa poprzez przekształcanie cyfr w dźwięki spółgłoskowe, które następnie można łączyć z samogłoskami, tworząc łatwe do zapamiętania słowa."
          },
          "howItWorks": {
            "heading": "Jak to działa",
            "p1": "Każdej cyfrze (0-9) przypisane są określone dźwięki spółgłoskowe. Dodając samogłoski między te spółgłoski, możemy tworzyć łatwe do zapamiętania słowa reprezentujące liczby."
          }
        },
        "benefits": {
          "heading": "Korzyści z używania Systemu Głównego",
          "item1": { "title": "Lepsza pamięć", "desc": "Zamienia abstrakcyjne liczby in konkretne, łatwe do wyobrażenia słowa" },
          "item2": { "title": "Długotrwałe zapamiętywanie", "desc": "Obrazy stworzone ze słów są łatwiejsze do zapamiętania niż ciągi cyfr" },
          "item3": { "title": "Szybsza nauka", "desc": "Zapamiętuj długie ciągi liczb w znacznie krótszym czasie" },
          "item4": { "title": "Ćwiczenie umysłu", "desc": "Zapewnia doskonały treino mentalny i może poprawić ogólne funkcje poznawcze" },
          "item5": { "title": "Praktyczne zastosowania", "desc": "Przydatne do zapamiętywania numerów telefonów, PIN-ów, ważnych dat i faktów historycznych" }
        },
        "practicalUses": {
          "heading": "Praktyczne zastosowania",
          "p1": "Sportowcy pamięci używają tego systemu do zapamiętywania:",
          "item1": "Liczby Pi do tysięcy miejsc po przecinku",
          "item2": "Długich numerów kart kredytowych",
          "item3": "Książek telefonicznych",
          "item4": "Dat historycznych",
          "item5": "Stałych matematycznych"
        },
        "tryItButton": "Wypróbuj sam",
        "footer": {
          "blogLink": "Odwiedź Vidanov.com/blog"
        }
      }
    }
  },
  pt: {
    translation: {
      // General UI
      "appTitle": "Números Mágicos",
      "navHome": "Início",
      "navHelp": "Ajuda",
      "copyButton": "Copiar",
      "copiedTooltip": "Copiado!",
      "navFlashcards": "Cartões",

      // Translator Page
      "translator": {
        "title": "Tradutor de Números",
        "description": "Digite um número e nós o traduziremos em palavras usando um sistema fonético. Você pode usar separadores como espaços, hífens, vírgulas, etc. para agrupar os dígitos.",
        "inputPlaceholder": "Digite números (ex., 123-45)...",
        "inputAriaLabel": "Digite números para traduzir",
        "languageSelectorAriaLabel": "Selecione o idioma do sistema de tradução",
        "buttonTranslate": "Traduzir",
        "buttonTranslating": "Traduzindo...",
        "resultsTitle": "Traduções Possíveis ({{count}} encontradas)",
        "customSeparatorLabel": "Usando seus separadores personalizados",
        "defaultGroupingLabel": "Agrupamento padrão de 2 dígitos",
        "groupingLabel": "Agrupamento",
        "table": {
          "headerNumber": "Número",
          "headerWord": "Palavra"
        },
        "showMoreButton": "Mostrar Mais Variações"
      },

      // Toast Messages
      "toast": {
        "noDigits": {
          "title": "Nenhum dígito encontrado",
          "description": "Por favor, digite alguns números para traduzir"
        },
        "emptyInput": {
          "title": "Entrada vazia",
          "description": "Por favor, digite alguns números para traduzir"
        },
        "translationComplete": {
          "title": "Tradução concluída",
          "customDesc": "Usando seus separadores personalizados para a primeira tradução. Encontradas {{count}} variações adicionais.",
          "defaultDesc": "Mostrando agrupamento padrão de 2 dígitos primeiro. Encontradas {{count}} variações adicionais.",
          "variationsDesc": "Encontradas {{count}} variações possíveis"
        },
        "noTranslations": {
          "title": "Nenhuma tradução encontrada",
          "description": "Tente uma entrada diferente ou verifique o sistema de idioma selecionado"
        },
        "copied": {
          "title": "Copiado!",
          "description": "Texto copiado para a área de transferência"
        }
      },

      "flashcards": {
        "title": "Cartões",
        "manageCards": "Gerenciar cartões",
        "studySession": "Sessão de estudo",
        "noCards": "Nenhum cartão para revisar",
        "addMoreCards": "Adicione mais cartões do tradutor para começar a estudar",
        "again": "Novamente",
        "hard": "Difícil",
        "good": "Bom",
        "easy": "Fácil",
        "ratingSubmitted": "Avaliação salva",
        "nextReviewMinutes": "Próxima revisão em {{minutes}} minutos",
        "nextReview": "Próxima revisão em {{days}} dias",
        "cardDeleted": "Cartão excluído",
        "cardUpdated": "Cartão atualizado",
        "editCard": "Editar cartão",
        "enterMeaning": "Digite o significado",
        "saveChanges": "Salvar alterações",
        "saveCard": "Salvar como cartão",
        "saveCardTitle": "Salvar cartão",
        "enterMeaningPrompt": "Digite o significado para este número",
        "save": "Salvar",
        "cancel": "Cancelar",
        "statistics": "Estatísticas",
        "totalCards": "Total de cartões",
        "dueCards": "Para revisar",
        "masteredCards": "Dominados",
        "learningCards": "Aprendendo",
        "masterProgress": "Progresso de domínio",
        "averageEase": "Facilidade média",
        "nextInMinutes": "Próximo: {{minutes}}m",
        "interval": "Intervalo: {{value}}",
        "ease": "Facilidade: {{value}}",
        "learning": "Aprendendo",
        "days": "{{count}} dias",
        "saveCardSuccess": "Cartão salvo!",
        "cardAddedToStudy": "O cartão foi adicionado ao seu baralho de estudo",
        "lateReview": "Revisão atrasada em {{days}} dias. {{next}}",
        "numberTranslations": {
          "0": ["s", "z"],
          "1": ["t", "d"],
          "2": ["n"],
          "3": ["m"],
          "4": ["r"],
          "5": ["l"],
          "6": ["ch", "j"],
          "7": ["c", "g"],
          "8": ["f", "v"],
          "9": ["p", "b"],
          "description": "O sistema fonético português usa os seguintes sons consonantais:",
          "examples": {
            "title": "Exemplos:",
            "items": [
              "0 = s, z (sal, zelo)",
              "1 = t, d (tela, dado)",
              "2 = n (nada)",
              "3 = m (mala)",
              "4 = r (rato)",
              "5 = l (lua)",
              "6 = ch, j (chave, janela)",
              "7 = c, g (casa, gato)",
              "8 = f, v (faca, vaca)",
              "9 = p, b (pato, bola)"
            ]
          }
        },
        "enterNumber": "Digite o número",
        "translate": "Traduzir",
        "clear": "Limpar",
        "copy": "Copiar",
        "copied": "Copiado!",
        "saveAsFlashcard": "Salvar como cartão"
      },

      "help": {
        "majorSystem": {
          "title": "Guia do Sistema Principal",
          "whatIsIt": {
            "heading": "O que é o Sistema Principal?",
            "p1": "O Sistema Principal é uma técnica mnemônica usada para converter números em palavras. Funciona convertendo dígitos em sons consonantais, que podem então ser combinados com vogais para formar palavras memoráveis."
          },
          "howItWorks": {
            "heading": "Como funciona",
            "p1": "Cada dígito (0-9) está associado a sons consonantais específicos. Adicionando vogais entre essas consoantes, podemos criar palavras memoráveis que representam números."
          }
        },
        "benefits": {
          "heading": "Benefícios do Sistema Principal",
          "item1": { "title": "Memória aprimorada", "desc": "Converte números abstratos em palavras concretas e visualizáveis" },
          "item2": { "title": "Retenção de longo prazo", "desc": "Imagens criadas a partir de palavras são mais fáceis de lembrar do que sequências de dígitos" },
          "item3": { "title": "Aprendizado mais rápido", "desc": "Memorize longas sequências de números em muito menos tempo" },
          "item4": { "title": "Exercício mental", "desc": "Fornece excelente treino mental e pode melhorar a função cognitiva geral" },
          "item5": { "title": "Aplicações práticas", "desc": "Útil para lembrar números de telefone, PINs, datas importantes e fatos históricos" }
        },
        "practicalUses": {
          "heading": "Usos práticos",
          "p1": "Atletas da memória usam este sistema para memorizar:",
          "item1": "Pi até milhares de dígitos",
          "item2": "Longos números de cartão de crédito",
          "item3": "Listas telefônicas",
          "item4": "Datas históricas",
          "item5": "Constantes matemáticas"
        },
        "tryItButton": "Experimente você mesmo",
        "footer": {
          "blogLink": "Visite Vidanov.com/blog"
        }
      }
    }
  }
};

// Get the saved language or default to 'en'
const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Use the saved language as default
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'es', 'fr', 'it', 'ru', 'pl', 'pt'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'path', 'navigator'],
      lookupLocalStorage: 'preferredLanguage',
      lookupFromPathIndex: 1,
      caches: ['localStorage']
    },
    load: 'languageOnly',
    debug: true
  });

export default i18n;