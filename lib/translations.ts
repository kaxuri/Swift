type TranslationKey =
  // General
  | "loading"
  | "quizConfiguration"
  | "customizeQuizSettings"
  | "quizSettings"
  | "general"
  | "database"
  | "testType"
  | "footer1"
  | "footer2"
  | "generalSettings"
  | "databaseSettings"
  | "testTypeSettings"
  | "settingsCategories"
  | "wordQuiz"
  | "wordQuizDescription"
  | "sentenceQuiz"
  | "sentenceQuizDescription"
  | "mixedQuiz"
  | "mixedQuizDescription"
  | "startWordQuiz"
  | "startSentenceQuiz"
  | "startMixedQuiz"
  | "chooseQuizType"
  | "start"
  | "typingAnswers"
  | "typingAnswersDescription"
  | "trueFalse"
  | "trueFalseDescription"
  | "multipleChoice"
  | "multipleChoiceDescription"
  | "mixed"
  | "mixedDescription"
  | "wordQuestionCount"
  | "sentenceQuestionCount"
  | "wordQuestionCountAria"
  | "sentenceQuestionCountAria"
  | "selectLanguages"
  | "sourceLanguage"
  | "targetLanguage"
  | "selectSourceLanguage"
  | "selectTargetLanguage"
  | "customDatabase"
  | "noDatabase"
  | "useCustomDatabase"
  | "useBuiltInDatabase"
  | "usingCustomDatabase"
  | "noDatabaseMessage"
  | "noDatabaseAvailable"
  | "importDatabaseMessage"
  | "browseSets"
  | "importDatabase"
  | "importDatabaseFile"
  | "importCustomDatabase"
  | "selectJsonFile"
  | "importWarning"
  | "selectJsonFileToImport"
  | "close"
  | "goToDatabaseCreator"
  | "databaseCreator"
  | "readySets"
  | "deleteCustomDatabase"
  | "deleteDatabase"
  | "importSuccess"
  | "importError"
  | "databaseDeleted"
  | "noQuizzesAvailable"
  | "importDatabaseToStart"
  | "downloadReadySets"
  | "createOwnDatabase"
  | "settingsSummary"
  | "languages"
  | "wordCount"
  | "sentenceCount"
  | "custom"
  | "german"
  | "english"
  | "polish"
  // Homepage
  | "copyright"
  | "learnLanguages"
  | "effectively"
  | "and"
  | "enjoyably"
  | "appDescription"
  | "startLearning"
  | "settings"
  | "languageLearning"
  | "whyChooseSwift"
  | "appDesignedFor"
  | "multilingualism"
  | "multilingualism_desc"
  | "differentLearningModes"
  | "differentLearningModes_desc"
  | "differentLearningMethods"
  | "differentLearningMethods_desc"
  | "progressTracking"
  | "progressTracking_desc"
  | "startNow"
  | "chooseYourLearningMethod"
  | "customizeLearningMethod"
  | "wordQuizHomepage"
  | "sentenceQuizHomepage"
  | "mixedQuizHomepage"
  | "readyForLanguageAdventure"
  | "joinUsers"
  | "startLearningNow"
  // Navigation
  | "home"
  | "quiz"
  | "learn"
  | "sets"
  | "creator"
  | "statistics"
  | "closeMenu"
  | "openMenu"
  // Footer
  | "modernLanguageApp"
  | "application"
  | "tools"
  | "contact"
  | "homePage"
  | "allRightsReserved"
  // Database Creator
  | "databaseCreatorTitle"
  | "databaseCreatorDesc"
  | "databaseMetadata"
  | "databaseMetadataDesc"
  | "databaseName"
  | "author"
  | "difficultyLevel"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "databaseDescription"
  | "exportDatabase"
  | "resetDatabase"
  | "confirmReset"
  | "resetConfirmDesc"
  | "cancel"
  | "yesResetDatabase"
  | "addNewWord"
  | "addNewWordDesc"
  | "editWord"
  | "editWordDesc"
  | "sourceWord"
  | "targetTranslation"
  | "category"
  | "difficulty"
  | "easy"
  | "medium"
  | "hard"
  | "saveChanges"
  | "addWord"
  | "wordList"
  | "wordListDesc"
  | "actions"
  | "noWordsAddedDesc"
  | "addNewSentence"
  | "addNewSentenceDesc"
  | "editSentence"
  | "editSentenceDesc"
  | "sourceSentence"
  | "sentenceList"
  | "sentenceListDesc"
  | "noSentencesAddedDesc"
  // Quiz Pages
  | "loadingQuiz"
  | "preparingQuestions"
  | "preparingWords"
  | "preparingSentences"
  | "preparingMixedQuestions"
  | "quizResults"
  | "perfect"
  | "greatJob"
  | "goodJob"
  | "keepPracticing"
  | "restartQuiz"
  | "backToHome"
  | "question"
  | "of"
  | "score"
  | "exitQuiz"
  | "typeTranslation"
  | "checkAnswer"
  | "correctAnswer"
  | "hide"
  | "show"
  | "correct"
  | "incorrect"
  | "checkCorrectAnswer"
  | "next"
  | "viewResults"
  | "nextSentence"
  | "isTranslationCorrect"
  | "true"
  | "false"
  // Exit Dialog
  | "confirmExit"
  | "exitWarning"
  | "cancelExit"
  | "confirmExitButton"
  // Stats Page
  | "yourLearningStats"
  | "clearStats"
  | "noStatsData"
  | "noStatsDesc"
  | "completedQuizzes"
  | "averageScore"
  | "averageScoreDesc"
  | "words"
  | "sentences"
  | "practicedWords"
  | "practicedSentences"
  | "overview"
  | "charts"
  | "history"
  | "bestResults"
  | "yourBestAchievements"
  | "bestScore"
  | "worstScore"
  | "byQuizType"
  | "translationDirection"
  | "comparisonByDirection"
  | "quizTypeDistribution"
  | "translationDirectionDistribution"
  | "quizHistory"
  | "last10Quizzes"
  | "noQuizHistory"
  // Learn Page
  | "loadingMaterials"
  | "preparingLearningMaterials"
  | "searchWords"
  | "searchSentences"
  | "selectCategory"
  | "allCategories"
  | "sortBy"
  | "noWordsFound"
  | "tryChangingSearch"
  | "noSentencesFound"
  // Flashcards
  | "noFlashcardsAvailable"
  | "selectFlashcardType"
  | "loadFlashcards"
  | "flashcardType"
  | "wordsAndSentences"
  | "known"
  | "free"
  | "learning"
  | "new"
  | "word"
  | "sentence"
  | "clickToSeeTranslation"
  | "translation"
  | "clickToGoBack"
  | "swipeRightKnown"
  | "swipeLeftLearning"
  // Sets Page
  | "setsAvailableSoon"
  | "setsComingSoon"
  | "goToCreator"

type TranslationParams = {
  [key: string]: string | number
}

const translations: Record<string, Record<string, string>> = {
  pl: {
    // General
    loading: "Ładowanie...",
    free:"100% Darmowy",
    quizConfiguration: "Konfiguracja quizu",
    customizeQuizSettings: "Dostosuj ustawienia quizu do swoich potrzeb i rozpocznij naukę",
    quizSettings: "Ustawienia quizu",
    general: "Ogólne",
    database: "Baza danych",
    testType: "Typ testu",
    generalSettings: "Ustawienia ogólne",
    footer1:"Stworzone z",
    footer2:"Przez Kaxuri ",
    databaseSettings: "Ustawienia bazy danych",
    testTypeSettings: "Ustawienia typu testu",
    settingsCategories: "Kategorie ustawień",
    wordQuiz: "Quiz ze słowami",
    wordQuizDescription: "Ćwicz {count} słów i rozwijaj swoje słownictwo w wybranym języku",
    sentenceQuiz: "Quiz ze zdaniami",
    sentenceQuizDescription: "Ćwicz {count} zdań i popraw swoją znajomość gramatyki",
    mixedQuiz: "Quiz mieszany",
    mixedQuizDescription: "Mieszanka {wordCount} słów i {sentenceCount} zdań w losowej kolejności",
    startWordQuiz: "Rozpocznij quiz ze słowami",
    startSentenceQuiz: "Rozpocznij quiz ze zdaniami",
    startMixedQuiz: "Rozpocznij quiz mieszany",
    chooseQuizType: "Wybierz rodzaj quizu",
    start: "Rozpocznij",
    typingAnswers: "Wpisywanie odpowiedzi",
    typingAnswersDescription: "Wpisuj tłumaczenia samodzielnie",
    trueFalse: "Prawda/Fałsz",
    trueFalseDescription: "Oceń czy tłumaczenie jest poprawne",
    multipleChoice: "Wybór odpowiedzi",
    multipleChoiceDescription: "Wybierz poprawne tłumaczenie z listy",
    mixed: "Mieszany",
    mixedDescription: "Różne typy pytań w jednym teście",
    wordQuestionCount: "Liczba pytań ze słowami",
    sentenceQuestionCount: "Liczba pytań ze zdaniami",
    wordQuestionCountAria: "Liczba pytań ze słowami (max: {max})",
    sentenceQuestionCountAria: "Liczba pytań ze zdaniami (max: {max})",
    selectLanguages: "Wybierz języki",
    sourceLanguage: "Język źródłowy",
    targetLanguage: "Język docelowy",
    selectSourceLanguage: "Wybierz język źródłowy",
    selectTargetLanguage: "Wybierz język docelowy",
    customDatabase: "Własna baza danych",
    noDatabase: "Brak bazy danych",
    useCustomDatabase: "Użyj własnej bazy danych",
    useBuiltInDatabase: "Użyj wbudowanej bazy danych",
    usingCustomDatabase: "Używasz własnej bazy: {name} ({words} słów, {sentences} zdań, język: {language})",
    noDatabaseMessage: "Nie masz aktualnie żadnej bazy danych. Zaimportuj lub pobierz bazę, aby rozpocząć naukę.",
    noDatabaseAvailable: "Brak dostępnej bazy danych",
    importDatabaseMessage:
      "Zaimportuj lub pobierz bazę danych językowych, aby rozpocząć naukę. Odwiedź stronę zestawów, aby znaleźć gotowe pakiety językowe.",
    browseSets: "Przeglądaj zestawy",
    importDatabase: "Importuj bazę",
    importDatabaseFile: "Importuj plik bazy danych",
    importCustomDatabase: "Importuj własną bazę danych",
    selectJsonFile: "Wybierz plik JSON z bazą danych wyeksportowaną z kreatora bazy danych.",
    importWarning: "Zaimportowanie nowej bazy danych zastąpi poprzednią własną bazę, jeśli taka istnieje.",
    selectJsonFileToImport: "Wybierz plik JSON do importu",
    close: "Zamknij",
    goToDatabaseCreator: "Przejdź do kreatora bazy danych",
    databaseCreator: "Kreator bazy",
    readySets: "Gotowe zestawy",
    deleteCustomDatabase: "Usuń własną bazę",
    deleteDatabase: "Usuń bazę",
    importSuccess: "Zaimportowano bazę danych: {name} ({words} słów, {sentences} zdań)",
    importError: "Błąd importu. Sprawdź format pliku.",
    databaseDeleted: "Własna baza danych została usunięta",
    noQuizzesAvailable: "Brak dostępnych quizów",
    importDatabaseToStart:
      "Musisz zaimportować lub pobrać bazę danych językowych, aby rozpocząć naukę. Możesz również stworzyć własną bazę danych w kreatorze.",
    downloadReadySets: "Pobierz gotowe zestawy",
    createOwnDatabase: "Stwórz własną bazę",
    settingsSummary: "Podsumowanie ustawień",
    languages: "Języki",
    wordCount: "Liczba słów",
    sentenceCount: "Liczba zdań",
    custom: "Niestandardowa",
    german: "niemiecki",
    english: "angielski",
    polish: "polski",

    // Homepage
    learnLanguages: "Ucz się języków",
    effectively: "efektywnie",
    and: "i",
    enjoyably: "przyjemnie",
    appDescription:
      "Swift to nowoczesna aplikacja do nauki języków, która pomoże Ci szybko opanować słownictwo i gramatykę dzięki interaktywnym quizom, fiszkom i ćwiczeniom.",
    startLearning: "Rozpocznij naukę",
    settings: "Ustawienia",
    languageLearning: "Nauka języków",
    whyChooseSwift: "Dlaczego warto wybrać Swift?",
    appDesignedFor: "Nasza aplikacja została zaprojektowana, aby zapewnić Ci najlepsze doświadczenie w nauce języków",
    multilingualism: "Wielojęzyczność",
    multilingualism_desc: "Wspieramy naukę różnych języków w dowolnej kombinacji",
    differentLearningModes: "Różne tryby nauki",
    differentLearningModes_desc: "Quizy ze słowami, zdaniami oraz fiszki do efektywnej nauki",
    differentLearningMethods: "Różne metody nauki",
    differentLearningMethods_desc: "Wybieraj między różnymi typami testów i dostosuj naukę do swoich potrzeb",
    progressTracking: "Śledzenie postępów",
    progressTracking_desc: "Szczegółowe statystyki i analiza Twoich wyników nauki",
    startNow: "Zacznij teraz",
    chooseYourLearningMethod: "Wybierz swój sposób nauki",
    customizeLearningMethod: "Dostosuj metodę nauki do swoich preferencji i potrzeb",
    wordQuizHomepage: "Ćwicz słowa i rozwijaj swoje słownictwo w wybranym języku",
    sentenceQuizHomepage: "Ćwicz zdania i popraw swoją znajomość gramatyki",
    mixedQuizHomepage: "Mieszanka słów i zdań w losowej kolejności",
    readyForLanguageAdventure: "Gotowy na przygodę z językiem?",
    joinUsers: "Dołącz do tysięcy użytkowników, którzy już poprawili swoje umiejętności językowe z Swift.",
    startLearningNow: "Rozpocznij naukę teraz",

    // Navigation
    home: "Strona główna",
    quiz: "Quiz",
    learn: "Nauka",
    sets: "Zestawy",
    creator: "Kreator",
    statistics: "Statystyki",
    closeMenu: "Zamknij menu",
    openMenu: "Otwórz menu",

    // Footer
    modernLanguageApp: "Nowoczesna aplikacja do nauki języków",
    application: "Aplikacja",
    tools: "Narzędzia",
    contact: "Kontakt",
    homePage: "Strona główna",
    allRightsReserved: "Wszelkie prawa zastrzeżone",
    copyright: "Swift. Always Ahead",

    // Database Creator
    databaseCreatorTitle: "Kreator bazy danych",
    databaseCreatorDesc: "Stwórz własną bazę danych słów i zdań do nauki języków",
    databaseMetadata: "Metadane bazy danych",
    databaseMetadataDesc: "Podstawowe informacje o tworzonej bazie danych",
    databaseName: "Nazwa bazy danych",
    author: "Autor",
    difficultyLevel: "Poziom trudności",
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
    databaseDescription: "Opis bazy danych",
    exportDatabase: "Eksportuj bazę",
    resetDatabase: "Resetuj bazę",
    confirmReset: "Potwierdź reset",
    resetConfirmDesc: "Czy na pewno chcesz zresetować bazę danych? Wszystkie dane zostaną utracone.",
    cancel: "Anuluj",
    yesResetDatabase: "Tak, resetuj bazę",
    addNewWord: "Dodaj nowe słowo",
    addNewWordDesc: "Dodaj nowe słowo do bazy danych",
    editWord: "Edytuj słowo",
    editWordDesc: "Edytuj istniejące słowo w bazie danych",
    sourceWord: "Słowo źródłowe",
    targetTranslation: "Tłumaczenie docelowe",
    category: "Kategoria",
    difficulty: "Trudność",
    easy: "Łatwy",
    medium: "Średni",
    hard: "Trudny",
    saveChanges: "Zapisz zmiany",
    addWord: "Dodaj słowo",
    wordList: "Lista słów",
    wordListDesc: "Lista wszystkich słów w bazie danych",
    actions: "Akcje",
    noWordsAddedDesc: "Nie dodano jeszcze żadnych słów. Użyj formularza powyżej, aby dodać pierwsze słowo.",
    addNewSentence: "Dodaj nowe zdanie",
    addNewSentenceDesc: "Dodaj nowe zdanie do bazy danych",
    editSentence: "Edytuj zdanie",
    editSentenceDesc: "Edytuj istniejące zdanie w bazie danych",
    sourceSentence: "Zdanie źródłowe",
    sentenceList: "Lista zdań",
    sentenceListDesc: "Lista wszystkich zdań w bazie danych",
    noSentencesAddedDesc: "Nie dodano jeszcze żadnych zdań. Użyj formularza powyżej, aby dodać pierwsze zdanie.",

    // Quiz Pages
    loadingQuiz: "Ładowanie quizu...",
    preparingQuestions: "Przygotowujemy pytania dla Ciebie",
    preparingWords: "Przygotowujemy słowa dla Ciebie",
    preparingSentences: "Przygotowujemy zdania dla Ciebie",
    preparingMixedQuestions: "Przygotowujemy mieszany zestaw pytań dla Ciebie",
    quizResults: "Wyniki quizu",
    perfect: "Doskonale! Wszystkie odpowiedzi są poprawne!",
    greatJob: "Świetna robota! Jesteś na dobrej drodze do perfekcji.",
    goodJob: "Dobra robota! Kontynuuj ćwiczenia, aby dalej się doskonalić.",
    keepPracticing: "Kontynuuj ćwiczenia, aby poprawić swoje umiejętności.",
    restartQuiz: "Rozpocznij ponownie",
    backToHome: "Powrót do strony głównej",
    question: "Pytanie",
    of: "z",
    score: "Wynik",
    exitQuiz: "Wyjdź z quizu",
    typeTranslation: "Wpisz tłumaczenie...",
    checkAnswer: "Sprawdź odpowiedź",
    correctAnswer: "Poprawna odpowiedź:",
    hide: "Ukryj",
    show: "Pokaż",
    correct: "Poprawnie! Świetna robota.",
    incorrect: "Niepoprawnie. Sprawdź poprawną odpowiedź.",
    checkCorrectAnswer: "Sprawdź poprawną odpowiedź.",
    next: "Następne",
    viewResults: "Zobacz wyniki",
    nextSentence: "Następne zdanie",
    isTranslationCorrect: "Czy to poprawne tłumaczenie?",
    true: "Prawda",
    false: "Fałsz",

    // Exit Dialog
    confirmExit: "Czy na pewno chcesz wyjść?",
    exitWarning: "Twój postęp w bieżącym quizie zostanie utracony.",
    cancelExit: "Anuluj",
    confirmExitButton: "Wyjdź z quizu",

    // Stats Page
    yourLearningStats: "Twoje statystyki nauki",
    clearStats: "Wyczyść statystyki",
    noStatsData: "Brak danych statystycznych",
    noStatsDesc: "Ukończ przynajmniej jeden quiz, aby zobaczyć swoje statystyki nauki.",
    completedQuizzes: "Ukończone quizy",
    averageScore: "Średni wynik",
    averageScoreDesc: "Średni procent poprawnych odpowiedzi",
    words: "Słowa",
    sentences: "Zdania",
    practicedWords: "Przećwiczonych słów",
    practicedSentences: "Przećwiczonych zdań",
    overview: "Przegląd",
    charts: "Wykresy",
    history: "Historia",
    bestResults: "Najlepsze wyniki",
    yourBestAchievements: "Twoje najlepsze osiągnięcia",
    bestScore: "Najlepszy wynik",
    worstScore: "Najgorszy wynik",
    byQuizType: "Według typu quizu",
    translationDirection: "Kierunek tłumaczenia",
    comparisonByDirection: "Porównanie wyników według kierunku",
    quizTypeDistribution: "Rozkład typów quizów",
    translationDirectionDistribution: "Kierunek tłumaczenia",
    quizHistory: "Historia quizów",
    last10Quizzes: "Ostatnie 10 ukończonych quizów",
    noQuizHistory: "Brak historii quizów.",

    // Learn Page
    loadingMaterials: "Ładowanie materiałów...",
    preparingLearningMaterials: "Przygotowujemy materiały do nauki",
    searchWords: "Szukaj słów...",
    searchSentences: "Szukaj zdań...",
    selectCategory: "Wybierz kategorię",
    allCategories: "Wszystkie kategorie",
    sortBy: "Sortuj według",
    noWordsFound: "Nie znaleziono słów",
    tryChangingSearch: "Spróbuj zmienić kryteria wyszukiwania",
    noSentencesFound: "Nie znaleziono zdań",

    // Flashcards
    noFlashcardsAvailable: "Brak dostępnych fiszek",
    selectFlashcardType: 'Wybierz typ fiszek i kliknij przycisk "Załaduj fiszki"',
    loadFlashcards: "Załaduj fiszki",
    flashcardType: "Typ fiszek",
    wordsAndSentences: "Słowa i zdania",
    known: "Znane",
    learning: "Uczę się",
    new: "Nowe",
    word: "Słowo",
    sentence: "Zdanie",
    clickToSeeTranslation: "Kliknij, aby zobaczyć tłumaczenie",
    translation: "Tłumaczenie",
    clickToGoBack: "Kliknij, aby wrócić",
    swipeRightKnown: "Przesuń kartę w prawo, aby oznaczyć jako znane",
    swipeLeftLearning: 'Przesuń kartę w lewo, aby oznaczyć jako "uczę się"',

    // Sets Page
    setsAvailableSoon: "Zestawy będą dostępne wkrótce",
    setsComingSoon:
      "Aktualnie pracujemy nad przygotowaniem gotowych zestawów do nauki różnych języków. W międzyczasie możesz stworzyć własną bazę danych w kreatorze.",
    goToCreator: "Przejdź do kreatora",
  },
  en: {
    // General
    loading: "Loading...",
    free:"100% Free to use",
    quizConfiguration: "Quiz Configuration",
    customizeQuizSettings: "Customize quiz settings to your needs and start learning",
    quizSettings: "Quiz Settings",
    general: "General",
    database: "Database",
    testType: "Test Type",
    generalSettings: "General Settings",
    databaseSettings: "Database Settings",
    testTypeSettings: "Test Type Settings",
    settingsCategories: "Settings Categories",
    wordQuiz: "Word Quiz",
    wordQuizDescription: "Practice {count} words and develop your vocabulary in the selected language",
    sentenceQuiz: "Sentence Quiz",
    sentenceQuizDescription: "Practice {count} sentences and improve your grammar knowledge",
    mixedQuiz: "Mixed Quiz",
    mixedQuizDescription: "A mix of {wordCount} words and {sentenceCount} sentences in random order",
    startWordQuiz: "Start Word Quiz",
    startSentenceQuiz: "Start Sentence Quiz",
    startMixedQuiz: "Start Mixed Quiz",
    chooseQuizType: "Choose Quiz Type",
    start: "Start",
    typingAnswers: "Typing Answers",
    typingAnswersDescription: "Type translations yourself",
    trueFalse: "True/False",
    trueFalseDescription: "Evaluate if the translation is correct",
    multipleChoice: "Multiple Choice",
    multipleChoiceDescription: "Choose the correct translation from a list",
    mixed: "Mixed",
    mixedDescription: "Different types of questions in one test",
    wordQuestionCount: "Number of word questions",
    sentenceQuestionCount: "Number of sentence questions",
    wordQuestionCountAria: "Number of word questions (max: {max})",
    sentenceQuestionCountAria: "Number of sentence questions (max: {max})",
    selectLanguages: "Select Languages",
    sourceLanguage: "Source Language",
    targetLanguage: "Target Language",
    selectSourceLanguage: "Select source language",
    selectTargetLanguage: "Select target language",
    customDatabase: "Custom Database",
    noDatabase: "No Database",
    useCustomDatabase: "Use custom database",
    useBuiltInDatabase: "Use built-in database",
    usingCustomDatabase:
      "You are using custom database: {name} ({words} words, {sentences} sentences, language: {language})",
    noDatabaseMessage: "You don't have any database currently. Import or download a database to start learning.",
    noDatabaseAvailable: "No Database Available",
    importDatabaseMessage:
      "Import or download a language database to start learning. Visit the sets page to find ready-made language packages.",
    browseSets: "Browse Sets",
    importDatabase: "Import Database",
    importDatabaseFile: "Import database file",
    importCustomDatabase: "Import Custom Database",
    selectJsonFile: "Select a JSON file with a database exported from the database creator.",
    importWarning: "Importing a new database will replace the previous custom database, if one exists.",
    selectJsonFileToImport: "Select JSON file to import",
    close: "Close",
    goToDatabaseCreator: "Go to database creator",
    databaseCreator: "Database Creator",
    readySets: "Ready Sets",
    deleteCustomDatabase: "Delete custom database",
    deleteDatabase: "Delete Database",
    importSuccess: "Database imported: {name} ({words} words, {sentences} sentences)",
    importError: "Import error. Check file format.",
    databaseDeleted: "Custom database has been deleted",
    noQuizzesAvailable: "No Quizzes Available",
    importDatabaseToStart:
      "You need to import or download a language database to start learning. You can also create your own database in the creator.",
    downloadReadySets: "Download Ready Sets",
    createOwnDatabase: "Create Own Database",
    settingsSummary: "Settings Summary",
    languages: "Languages",
    wordCount: "Word count",
    sentenceCount: "Sentence count",
    custom: "Custom",
    german: "German",
    english: "English",
    polish: "Polish",

    // Homepage
    learnLanguages: "Learn languages",
    effectively: "effectively",
    and: "and",
    enjoyably: "enjoyably",
    appDescription:
      "Swift is a modern language learning application that will help you quickly master vocabulary and grammar through interactive quizzes, flashcards, and exercises.",
    startLearning: "Start Learning",
    settings: "Settings",
    languageLearning: "Language Learning",
    whyChooseSwift: "Why Choose Swift?",
    appDesignedFor: "Our application is designed to provide you with the best language learning experience",
    multilingualism: "Multilingualism",
    multilingualism_desc: "We support learning different languages in any combination",
    differentLearningModes: "Different Learning Modes",
    differentLearningModes_desc: "Quizzes with words, sentences, and flashcards for effective learning",
    differentLearningMethods: "Different Learning Methods",
    differentLearningMethods_desc: "Choose between different test types and customize learning to your needs",
    progressTracking: "Progress Tracking",
    progressTracking_desc: "Detailed statistics and analysis of your learning results",
    startNow: "Start Now",
    chooseYourLearningMethod: "Choose Your Learning Method",
    customizeLearningMethod: "Customize the learning method to your preferences and needs",
    wordQuizHomepage: "Practice words and develop your vocabulary in your chosen language",
    sentenceQuizHomepage: "Practice sentences and improve your grammar knowledge",
    mixedQuizHomepage: "A mix of words and sentences in random order",
    readyForLanguageAdventure: "Ready for a language adventure?",
    joinUsers: "Join thousands of users who have already improved their language skills with Swift.",
    startLearningNow: "Start Learning Now",

    // Navigation
    home: "Home",
    quiz: "Quiz",
    learn: "Learn",
    sets: "Sets",
    creator: "Creator",
    statistics: "Statistics",
    closeMenu: "Close menu",
    openMenu: "Open menu",

    // Footer
    modernLanguageApp: "Modern language learning application",
    application: "Application",
    tools: "Tools",
    contact: "Contact",
    homePage: "Home",
    allRightsReserved: "All rights reserved",
    copyright: "Swift. Always Ahead",

    // Database Creator
    databaseCreatorTitle: "Database Creator",
    databaseCreatorDesc: "Create your own database of words and sentences for language learning",
    databaseMetadata: "Database Metadata",
    databaseMetadataDesc: "Basic information about the database being created",
    databaseName: "Database Name",
    author: "Author",
    difficultyLevel: "Difficulty Level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    databaseDescription: "Database Description",
    exportDatabase: "Export Database",
    resetDatabase: "Reset Database",
    confirmReset: "Confirm Reset",
    resetConfirmDesc: "Are you sure you want to reset the database? All data will be lost.",
    cancel: "Cancel",
    yesResetDatabase: "Yes, reset database",
    addNewWord: "Add New Word",
    addNewWordDesc: "Add a new word to the database",
    editWord: "Edit Word",
    editWordDesc: "Edit an existing word in the database",
    sourceWord: "Source Word",
    targetTranslation: "Target Translation",
    category: "Category",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    saveChanges: "Save Changes",
    addWord: "Add Word",
    wordList: "Word List",
    wordListDesc: "List of all words in the database",
    actions: "Actions",
    noWordsAddedDesc: "No words have been added yet. Use the form above to add your first word.",
    addNewSentence: "Add New Sentence",
    addNewSentenceDesc: "Add a new sentence to the database",
    editSentence: "Edit Sentence",
    editSentenceDesc: "Edit an existing sentence in the database",
    sourceSentence: "Source Sentence",
    sentenceList: "Sentence List",
    sentenceListDesc: "List of all sentences in the database",
    noSentencesAddedDesc: "No sentences have been added yet. Use the form above to add your first sentence.",

    // Quiz Pages
    loadingQuiz: "Loading quiz...",
    preparingQuestions: "Preparing questions for you",
    preparingWords: "Preparing words for you",
    preparingSentences: "Preparing sentences for you",
    preparingMixedQuestions: "Preparing a mixed set of questions for you",
    quizResults: "Quiz Results",
    perfect: "Perfect! All answers are correct!",
    greatJob: "Great job! You're on the right track to perfection.",
    goodJob: "Good job! Continue practicing to improve further.",
    keepPracticing: "Keep practicing to improve your skills.",
    restartQuiz: "Restart",
    backToHome: "Back to Home",
    question: "Question",
    of: "of",
    score: "Score",
    exitQuiz: "Exit Quiz",
    typeTranslation: "Type translation...",
    checkAnswer: "Check Answer",
    correctAnswer: "Correct Answer:",
    hide: "Hide",
    show: "Show",
    correct: "Correct! Great job.",
    incorrect: "Incorrect. Check the correct answer.",
    checkCorrectAnswer: "Check the correct answer.",
    next: "Next",
    viewResults: "View Results",
    nextSentence: "Next Sentence",
    isTranslationCorrect: "Is this translation correct?",
    true: "True",
    false: "False",

    // Exit Dialog
    confirmExit: "Are you sure you want to exit?",
    exitWarning: "Your progress in the current quiz will be lost.",
    cancelExit: "Cancel",
    confirmExitButton: "Exit Quiz",

    // Stats Page
    yourLearningStats: "Your Learning Statistics",
    clearStats: "Clear Statistics",
    noStatsData: "No Statistical Data",
    noStatsDesc: "Complete at least one quiz to see your learning statistics.",
    completedQuizzes: "Completed Quizzes",
    averageScore: "Average Score",
    averageScoreDesc: "Average percentage of correct answers",
    words: "Words",
    sentences: "Sentences",
    practicedWords: "Practiced Words",
    practicedSentences: "Practiced Sentences",
    overview: "Overview",
    charts: "Charts",
    history: "History",
    bestResults: "Best Results",
    yourBestAchievements: "Your Best Achievements",
    bestScore: "Best Score",
    worstScore: "Worst Score",
    byQuizType: "By Quiz Type",
    translationDirection: "Translation Direction",
    comparisonByDirection: "Comparison of results by direction",
    quizTypeDistribution: "Quiz Type Distribution",
    translationDirectionDistribution: "Translation Direction",
    quizHistory: "Quiz History",
    last10Quizzes: "Last 10 completed quizzes",
    noQuizHistory: "No quiz history.",

    // Learn Page
    loadingMaterials: "Loading materials...",
    preparingLearningMaterials: "Preparing learning materials",
    searchWords: "Search words...",
    searchSentences: "Search sentences...",
    selectCategory: "Select category",
    allCategories: "All categories",
    sortBy: "Sort by",
    noWordsFound: "No words found",
    tryChangingSearch: "Try changing your search criteria",
    noSentencesFound: "No sentences found",

    // Flashcards
    noFlashcardsAvailable: "No flashcards available",
    selectFlashcardType: 'Select flashcard type and click "Load flashcards"',
    loadFlashcards: "Load flashcards",
    flashcardType: "Flashcard type",
    wordsAndSentences: "Words and sentences",
    known: "Known",
    learning: "Learning",
    new: "New",
    word: "Word",
    sentence: "Sentence",
    clickToSeeTranslation: "Click to see translation",
    translation: "Translation",
    clickToGoBack: "Click to go back",
    swipeRightKnown: "Swipe card right to mark as known",
    swipeLeftLearning: "Swipe card left to mark as learning",

    // Sets Page
    setsAvailableSoon: "Sets will be available soon",
    setsComingSoon:
      "We are currently working on preparing ready-to-use sets for learning different languages. In the meantime, you can create your own database in the creator.",
    goToCreator: "Go to creator",
  },
  de: {
    // General
    loading: "Wird geladen...",
    quizConfiguration: "Quiz-Konfiguration",
    customizeQuizSettings: "Passen Sie die Quiz-Einstellungen an Ihre Bedürfnisse an und beginnen Sie mit dem Lernen",
    quizSettings: "Quiz-Einstellungen",
    general: "Allgemein",
    database: "Datenbank",
    testType: "Testtyp",
    generalSettings: "Allgemeine Einstellungen",
    databaseSettings: "Datenbankeinstellungen",
    testTypeSettings: "Testtyp-Einstellungen",
    settingsCategories: "Einstellungskategorien",
    wordQuiz: "Wortquiz",
    wordQuizDescription: "Üben Sie {count} Wörter und erweitern Sie Ihren Wortschatz in der ausgewählten Sprache",
    sentenceQuiz: "Satzquiz",
    sentenceQuizDescription: "Üben Sie {count} Sätze und verbessern Sie Ihre Grammatikkenntnisse",
    mixedQuiz: "Gemischtes Quiz",
    mixedQuizDescription: "Eine Mischung aus {wordCount} Wörtern und {sentenceCount} Sätzen in zufälliger Reihenfolge",
    startWordQuiz: "Wortquiz starten",
    startSentenceQuiz: "Satzquiz starten",
    startMixedQuiz: "Gemischtes Quiz starten",
    chooseQuizType: "Quiz-Typ auswählen",
    start: "Starten",
    typingAnswers: "Antworten eingeben",
    typingAnswersDescription: "Geben Sie Übersetzungen selbst ein",
    trueFalse: "Wahr/Falsch",
    trueFalseDescription: "Bewerten Sie, ob die Übersetzung korrekt ist",
    multipleChoice: "Multiple Choice",
    multipleChoiceDescription: "Wählen Sie die richtige Übersetzung aus einer Liste",
    mixed: "Gemischt",
    mixedDescription: "Verschiedene Fragetypen in einem Test",
    wordQuestionCount: "Anzahl der Wortfragen",
    sentenceQuestionCount: "Anzahl der Satzfragen",
    wordQuestionCountAria: "Anzahl der Wortfragen (max: {max})",
    sentenceQuestionCountAria: "Anzahl der Satzfragen (max: {max})",
    selectLanguages: "Sprachen auswählen",
    sourceLanguage: "Quellsprache",
    targetLanguage: "Zielsprache",
    selectSourceLanguage: "Quellsprache auswählen",
    selectTargetLanguage: "Zielsprache auswählen",
    customDatabase: "Benutzerdefinierte Datenbank",
    noDatabase: "Keine Datenbank",
    useCustomDatabase: "Benutzerdefinierte Datenbank verwenden",
    useBuiltInDatabase: "Integrierte Datenbank verwenden",
    usingCustomDatabase:
      "Sie verwenden eine benutzerdefinierte Datenbank: {name} ({words} Wörter, {sentences} Sätze, Sprache: {language})",
    noDatabaseMessage:
      "Sie haben derzeit keine Datenbank. Importieren oder laden Sie eine Datenbank herunter, um mit dem Lernen zu beginnen.",
    noDatabaseAvailable: "Keine Datenbank verfügbar",
    importDatabaseMessage:
      "Importieren oder laden Sie eine Sprachdatenbank herunter, um mit dem Lernen zu beginnen. Besuchen Sie die Sets-Seite, um fertige Sprachpakete zu finden.",
    browseSets: "Sets durchsuchen",
    importDatabase: "Datenbank importieren",
    importDatabaseFile: "Datenbankdatei importieren",
    importCustomDatabase: "Benutzerdefinierte Datenbank importieren",
    selectJsonFile: "Wählen Sie eine JSON-Datei mit einer aus dem Datenbank-Creator exportierten Datenbank.",
    importWarning:
      "Beim Importieren einer neuen Datenbank wird die vorherige benutzerdefinierte Datenbank ersetzt, falls vorhanden.",
    selectJsonFileToImport: "JSON-Datei zum Importieren auswählen",
    close: "Schließen",
    goToDatabaseCreator: "Zum Datenbank-Creator gehen",
    databaseCreator: "Datenbank-Creator",
    readySets: "Fertige Sets",
    deleteCustomDatabase: "Benutzerdefinierte Datenbank löschen",
    deleteDatabase: "Datenbank löschen",
    importSuccess: "Datenbank importiert: {name} ({words} Wörter, {sentences} Sätze)",
    importError: "Importfehler. Überprüfen Sie das Dateiformat.",
    databaseDeleted: "Benutzerdefinierte Datenbank wurde gelöscht",
    noQuizzesAvailable: "Keine Quizze verfügbar",
    importDatabaseToStart:
      "Sie müssen eine Sprachdatenbank importieren oder herunterladen, um mit dem Lernen zu beginnen. Sie können auch Ihre eigene Datenbank im Creator erstellen.",
    downloadReadySets: "Fertige Sets herunterladen",
    createOwnDatabase: "Eigene Datenbank erstellen",
    settingsSummary: "Einstellungsübersicht",
    languages: "Sprachen",
    wordCount: "Wortanzahl",
    sentenceCount: "Satzanzahl",
    custom: "Benutzerdefiniert",
    german: "Deutsch",
    english: "Englisch",
    polish: "Polnisch",

    // Homepage
    modernLanguageLearning: "Modernes Sprachenlernen",
    learnLanguages: "Sprachen lernen",
    effectively: "effektiv",
    and: "und",
    enjoyably: "angenehm",
    appDescription:
      "Swift ist eine moderne Sprachlern-App, die Ihnen hilft, Vokabeln und Grammatik schnell durch interaktive Quizze, Karteikarten und Übungen zu beherrschen.",
    startLearning: "Lernen beginnen",
    settings: "Einstellungen",
    languageLearning: "Sprachenlernen",
    whyChooseSwift: "Warum Swift wählen?",
    appDesignedFor: "Unsere Anwendung wurde entwickelt, um Ihnen die beste Sprachlernerfahrung zu bieten",
    multilingualism: "Mehrsprachigkeit",
    multilingualism_desc: "Wir unterstützen das Erlernen verschiedener Sprachen in jeder Kombination",
    differentLearningModes: "Verschiedene Lernmodi",
    differentLearningModes_desc: "Quizze mit Wörtern, Sätzen und Karteikarten für effektives Lernen",
    differentLearningMethods: "Verschiedene Lernmethoden",
    differentLearningMethods_desc:
      "Wählen Sie zwischen verschiedenen Testtypen und passen Sie das Lernen an Ihre Bedürfnisse an",
    progressTracking: "Fortschrittsverfolgung",
    progressTracking_desc: "Detaillierte Statistiken und Analyse Ihrer Lernergebnisse",
    startNow: "Jetzt starten",
    chooseYourLearningMethod: "Wählen Sie Ihre Lernmethode",
    customizeLearningMethod: "Passen Sie die Lernmethode an Ihre Vorlieben und Bedürfnisse an",
    wordQuizHomepage: "Üben Sie Wörter und erweitern Sie Ihren Wortschatz in Ihrer gewählten Sprache",
    sentenceQuizHomepage: "Üben Sie Sätze und verbessern Sie Ihre Grammatikkenntnisse",
    mixedQuizHomepage: "Eine Mischung aus Wörtern und Sätzen in zufälliger Reihenfolge",
    readyForLanguageAdventure: "Bereit für ein Sprachabenteuer?",
    joinUsers:
      "Schließen Sie sich Tausenden von Benutzern an, die ihre Sprachkenntnisse mit Swift bereits verbessert haben.",
    startLearningNow: "Jetzt mit dem Lernen beginnen",

    // Navigation
    home: "Startseite",
    quiz: "Quiz",
    learn: "Lernen",
    sets: "Sets",
    creator: "Creator",
    statistics: "Statistiken",
    closeMenu: "Menü schließen",
    openMenu: "Menü öffnen",

    // Footer
    modernLanguageApp: "Moderne Sprachlern-Anwendung",
    application: "Anwendung",
    tools: "Werkzeuge",
    contact: "Kontakt",
    homePage: "Startseite",
    allRightsReserved: "Alle Rechte vorbehalten",
    copyright: "Swift. Always Ahead",

    // Database Creator
    databaseCreatorTitle: "Datenbank-Creator",
    databaseCreatorDesc: "Erstellen Sie Ihre eigene Datenbank mit Wörtern und Sätzen zum Sprachenlernen",
    databaseMetadata: "Datenbank-Metadaten",
    databaseMetadataDesc: "Grundlegende Informationen über die zu erstellende Datenbank",
    databaseName: "Datenbankname",
    author: "Autor",
    difficultyLevel: "Schwierigkeitsgrad",
    beginner: "Anfänger",
    intermediate: "Mittelstufe",
    advanced: "Fortgeschritten",
    databaseDescription: "Datenbankbeschreibung",
    exportDatabase: "Datenbank exportieren",
    resetDatabase: "Datenbank zurücksetzen",
    confirmReset: "Zurücksetzen bestätigen",
    resetConfirmDesc: "Sind Sie sicher, dass Sie die Datenbank zurücksetzen möchten? Alle Daten gehen verloren.",
    cancel: "Abbrechen",
    yesResetDatabase: "Ja, Datenbank zurücksetzen",
    addNewWord: "Neues Wort hinzufügen",
    addNewWordDesc: "Fügen Sie ein neues Wort zur Datenbank hinzu",
    editWord: "Wort bearbeiten",
    editWordDesc: "Bearbeiten Sie ein vorhandenes Wort in der Datenbank",
    sourceWord: "Quellwort",
    targetTranslation: "Zielübersetzung",
    category: "Kategorie",
    difficulty: "Schwierigkeit",
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    saveChanges: "Änderungen speichern",
    addWord: "Wort hinzufügen",
    wordList: "Wörterliste",
    wordListDesc: "Liste aller Wörter in der Datenbank",
    actions: "Aktionen",
    noWordsAddedDesc:
      "Es wurden noch keine Wörter hinzugefügt. Verwenden Sie das Formular oben, um Ihr erstes Wort hinzuzufügen.",
    addNewSentence: "Neuen Satz hinzufügen",
    addNewSentenceDesc: "Fügen Sie einen neuen Satz zur Datenbank hinzu",
    editSentence: "Satz bearbeiten",
    editSentenceDesc: "Bearbeiten Sie ein vorhandenes Wort in der Datenbank",
    sourceSentence: "Quellsatz",
    sentenceList: "Satzliste",
    sentenceListDesc: "Liste aller Sätze in der Datenbank",
    noSentencesAddedDesc:
      "Es wurden noch keine Sätze hinzugefügt. Verwenden Sie das Formular oben, um Ihren ersten Satz hinzuzufügen.",

    // Quiz Pages
    loadingQuiz: "Quiz wird geladen...",
    preparingQuestions: "Wir bereiten Fragen für Sie vor",
    preparingWords: "Wir bereiten Wörter für Sie vor",
    preparingSentences: "Wir bereiten Sätze für Sie vor",
    preparingMixedQuestions: "Wir bereiten einen gemischten Fragensatz für Sie vor",
    quizResults: "Quiz-Ergebnisse",
    perfect: "Perfekt! Alle Antworten sind richtig!",
    greatJob: "Großartige Arbeit! Sie sind auf dem richtigen Weg zur Perfektion.",
    goodJob: "Gute Arbeit! Üben Sie weiter, um sich zu verbessern.",
    keepPracticing: "Üben Sie weiter, um Ihre Fähigkeiten zu verbessern.",
    restartQuiz: "Neu starten",
    backToHome: "Zurück zur Startseite",
    question: "Frage",
    of: "von",
    score: "Ergebnis",
    exitQuiz: "Quiz beenden",
    typeTranslation: "Übersetzung eingeben...",
    checkAnswer: "Antwort prüfen",
    correctAnswer: "Richtige Antwort:",
    hide: "Ausblenden",
    show: "Anzeigen",
    correct: "Richtig! Großartige Arbeit.",
    incorrect: "Falsch. Überprüfen Sie die richtige Antwort.",
    checkCorrectAnswer: "Überprüfen Sie die richtige Antwort.",
    next: "Weiter",
    viewResults: "Ergebnisse anzeigen",
    nextSentence: "Nächster Satz",
    isTranslationCorrect: "Ist diese Übersetzung korrekt?",
    true: "Wahr",
    false: "Falsch",

    // Exit Dialog
    confirmExit: "Sind Sie sicher, dass Sie beenden möchten?",
    exitWarning: "Ihr Fortschritt im aktuellen Quiz geht verloren.",
    cancelExit: "Abbrechen",
    confirmExitButton: "Quiz beenden",

    // Stats Page
    yourLearningStats: "Ihre Lernstatistiken",
    clearStats: "Statistiken löschen",
    noStatsData: "Keine statistischen Daten",
    noStatsDesc: "Schließen Sie mindestens ein Quiz ab, um Ihre Lernstatistiken zu sehen.",
    completedQuizzes: "Abgeschlossene Quizze",
    averageScore: "Durchschnittliche Punktzahl",
    averageScoreDesc: "Durchschnittlicher Prozentsatz richtiger Antworten",
    words: "Wörter",
    sentences: "Sätze",
    practicedWords: "Geübte Wörter",
    practicedSentences: "Geübte Sätze",
    overview: "Übersicht",
    charts: "Diagramme",
    history: "Verlauf",
    bestResults: "Beste Ergebnisse",
    yourBestAchievements: "Ihre besten Leistungen",
    bestScore: "Beste Punktzahl",
    worstScore: "Schlechteste Punktzahl",
    byQuizType: "Nach Quiz-Typ",
    translationDirection: "Übersetzungsrichtung",
    comparisonByDirection: "Vergleich der Ergebnisse nach Richtung",
    quizTypeDistribution: "Verteilung der Quiz-Typen",
    translationDirectionDistribution: "Übersetzungsrichtung",
    quizHistory: "Quiz-Verlauf",
    last10Quizzes: "Letzte 10 abgeschlossene Quizze",
    noQuizHistory: "Kein Quiz-Verlauf.",

    // Learn Page
    loadingMaterials: "Materialien werden geladen...",
    preparingLearningMaterials: "Lernmaterialien werden vorbereitet",
    searchWords: "Wörter suchen...",
    searchSentences: "Sätze suchen...",
    selectCategory: "Kategorie auswählen",
    allCategories: "Alle Kategorien",
    sortBy: "Sortieren nach",
    noWordsFound: "Keine Wörter gefunden",
    tryChangingSearch: "Versuchen Sie, Ihre Suchkriterien zu ändern",
    noSentencesFound: "Keine Sätze gefunden",

    // Flashcards
    noFlashcardsAvailable: "Keine Karteikarten verfügbar",
    selectFlashcardType: 'Wählen Sie den Karteikarten-Typ und klicken Sie auf "Karteikarten laden"',
    loadFlashcards: "Karteikarten laden",
    flashcardType: "Karteikarten-Typ",
    wordsAndSentences: "Wörter und Sätze",
    known: "Bekannt",
    learning: "Lerne",
    new: "Neu",
    word: "Wort",
    sentence: "Satz",
    clickToSeeTranslation: "Klicken Sie, um die Übersetzung zu sehen",
    translation: "Übersetzung",
    clickToGoBack: "Klicken Sie, um zurückzukehren",
    swipeRightKnown: "Wischen Sie die Karte nach rechts, um sie als bekannt zu markieren",
    swipeLeftLearning: 'Wischen Sie die Karte nach links, um sie als "lerne" zu markieren',

    // Sets Page
    setsAvailableSoon: "Sets werden bald verfügbar sein",
    setsComingSoon:
      "Wir arbeiten derzeit an der Vorbereitung fertiger Sets zum Erlernen verschiedener Sprachen. In der Zwischenzeit können Sie Ihre eigene Datenbank im Creator erstellen.",
    goToCreator: "Zum Creator gehen",
  },
}

export function getTranslation(language: string, key: string, params?: TranslationParams): string {
  const lang = translations[language] ? language : "en"
  let text = translations[lang][key] || translations["en"][key] || key

  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{${param}}`, "g"), String(value))
    })
  }

  return text
}
