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
          "item5": { "title": "Praktische Anwendungen", "desc": "Nützlich zum Merken von Telefonnummern, PINs, wichtigen Daten und historischen Fakten" }
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
          "title": "No se encontraron traducciones",
          "description": "Intente una entrada diferente o verifique el sistema de idioma seleccionado"
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
            "p1": "Cada dígito (0-9) está asociado con sonidos consonánticos específicos. Al agregar vocales entre estas consonantes, podemos crear palabras memorables que representen números."
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
          "item1": { "title": "Memoria Migliorata", "desc": "Converte numeri astratti in parole concrete e visualizzabili" },
          "item2": { "title": "Ritenzione a Lungo Termine", "desc": "Le immagini create dalle parole sono più facili da ricordare delle sequenze di cifre" },
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
          "item4": "Date storiche",
          "item5": "Costanti matematiche"
        },
        "tryItButton": "Provalo Tu Stesso",
        "footer": {
          "blogLink": "Visita Vidanov.com/blog"
        }
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
          "item4": { "title": "Умственная тренировка", "desc": "Обеспечивает отличную умственную нагрузку и может улучшить общую когнитивную функцию" },
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
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'es', 'fr', 'it', 'ru'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path'],
      lookupFromPathIndex: 1,
      caches: [],
      checkWhitelist: true
    }
  });

export default i18n;