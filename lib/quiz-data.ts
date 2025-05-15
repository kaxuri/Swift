export type WordItem = {
  id: number
  translations: Record<string, string>
  category: string
  difficulty: "easy" | "medium" | "hard"
}

export type SentenceItem = {
  id: number
  translations: Record<string, string>
  category: string
  difficulty: "easy" | "medium" | "hard"
}

export type LanguagePair = {
  source: string
  target: string
}

// Convert old format to new format
export function convertOldWordFormat(oldWord: any): WordItem {
  const translations: Record<string, string> = {}

  if (oldWord.sourceWord) translations["de"] = oldWord.sourceWord
  if (oldWord.targetWord) translations["pl"] = oldWord.targetWord

  return {
    id: oldWord.id || Date.now(),
    translations,
    category: oldWord.category || "general",
    difficulty: oldWord.difficulty || "easy",
  }
}

export function convertOldSentenceFormat(oldSentence: any): SentenceItem {
  const translations: Record<string, string> = {}

  if (oldSentence.sourceSentence) translations["de"] = oldSentence.sourceSentence
  if (oldSentence.targetSentence) translations["pl"] = oldSentence.targetSentence

  return {
    id: oldSentence.id || Date.now(),
    translations,
    category: oldSentence.category || "general",
    difficulty: oldSentence.difficulty || "easy",
  }
}

export const germanWords: WordItem[] = [
  {
    id: 1,
    translations: {
      de: "Haus",
      pl: "dom",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 2,
    translations: {
      de: "Auto",
      pl: "samochód",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 3,
    translations: {
      de: "Buch",
      pl: "książka",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 4,
    translations: {
      de: "Tisch",
      pl: "stół",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 5,
    translations: {
      de: "Stuhl",
      pl: "krzesło",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 6,
    translations: {
      de: "Fenster",
      pl: "okno",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 7,
    translations: {
      de: "Tür",
      pl: "drzwi",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 8,
    translations: {
      de: "Schule",
      pl: "szkoła",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 9,
    translations: {
      de: "Freund",
      pl: "przyjaciel",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 10,
    translations: {
      de: "Freundin",
      pl: "przyjaciółka",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 11,
    translations: {
      de: "Wasser",
      pl: "woda",
    },
    category: "nouns",
    difficulty: "easy",
  },
  {
    id: 12,
    translations: {
      de: "Brot",
      pl: "chleb",
    },
    category: "food",
    difficulty: "easy",
  },
  {
    id: 13,
    translations: {
      de: "Milch",
      pl: "mleko",
    },
    category: "food",
    difficulty: "easy",
  },
  {
    id: 14,
    translations: {
      de: "Apfel",
      pl: "jabłko",
    },
    category: "food",
    difficulty: "easy",
  },
  {
    id: 15,
    translations: {
      de: "Banane",
      pl: "banan",
    },
    category: "food",
    difficulty: "easy",
  },

  {
    id: 16,
    translations: {
      de: "arbeiten",
      pl: "pracować",
    },
    category: "verbs",
    difficulty: "medium",
  },
  {
    id: 17,
    translations: {
      de: "spielen",
      pl: "grać",
    },
    category: "verbs",
    difficulty: "medium",
  },
  {
    id: 18,
    translations: {
      de: "lesen",
      pl: "czytać",
    },
    category: "verbs",
    difficulty: "medium",
  },
  {
    id: 19,
    translations: {
      de: "schreiben",
      pl: "pisać",
    },
    category: "verbs",
    difficulty: "medium",
  },
  {
    id: 20,
    translations: {
      de: "lernen",
      pl: "uczyć się",
    },
    category: "verbs",
    difficulty: "medium",
  },
  {
    id: 21,
    translations: {
      de: "Universität",
      pl: "uniwersytet",
    },
    category: "education",
    difficulty: "medium",
  },
  {
    id: 22,
    translations: {
      de: "Bibliothek",
      pl: "biblioteka",
    },
    category: "places",
    difficulty: "medium",
  },
  {
    id: 23,
    translations: {
      de: "Krankenhaus",
      pl: "szpital",
    },
    category: "places",
    difficulty: "medium",
  },
  {
    id: 24,
    translations: {
      de: "Bahnhof",
      pl: "dworzec",
    },
    category: "places",
    difficulty: "medium",
  },
  {
    id: 25,
    translations: {
      de: "Flughafen",
      pl: "lotnisko",
    },
    category: "places",
    difficulty: "medium",
  },

  {
    id: 26,
    translations: {
      de: "Verantwortung",
      pl: "odpowiedzialność",
    },
    category: "abstract",
    difficulty: "hard",
  },
  {
    id: 27,
    translations: {
      de: "Entscheidung",
      pl: "decyzja",
    },
    category: "abstract",
    difficulty: "hard",
  },
  {
    id: 28,
    translations: {
      de: "Wissenschaft",
      pl: "nauka",
    },
    category: "education",
    difficulty: "hard",
  },
  {
    id: 29,
    translations: {
      de: "Sehenswürdigkeit",
      pl: "atrakcja turystyczna",
    },
    category: "tourism",
    difficulty: "hard",
  },
  {
    id: 30,
    translations: {
      de: "Geschwindigkeit",
      pl: "prędkość",
    },
    category: "physics",
    difficulty: "hard",
  },
]

export const germanSentences: SentenceItem[] = [
  {
    id: 1,
    translations: {
      de: "Ich gehe zur Schule.",
      pl: "Idę do szkoły.",
    },
    category: "daily life",
    difficulty: "easy",
  },
  {
    id: 2,
    translations: {
      de: "Wie heißt du?",
      pl: "Jak się nazywasz?",
    },
    category: "introduction",
    difficulty: "easy",
  },
  {
    id: 3,
    translations: {
      de: "Ich komme aus Polen.",
      pl: "Pochodzę z Polski.",
    },
    category: "introduction",
    difficulty: "easy",
  },
  {
    id: 4,
    translations: {
      de: "Das Wetter ist heute schön.",
      pl: "Pogoda jest dzisiaj ładna.",
    },
    category: "weather",
    difficulty: "easy",
  },
  {
    id: 5,
    translations: {
      de: "Ich trinke gerne Kaffee.",
      pl: "Lubię pić kawę.",
    },
    category: "food",
    difficulty: "easy",
  },

  {
    id: 6,
    translations: {
      de: "Ich habe gestern einen Film gesehen.",
      pl: "Wczoraj obejrzałem film.",
    },
    category: "entertainment",
    difficulty: "medium",
  },
  {
    id: 7,
    translations: {
      de: "Kannst du mir bitte helfen?",
      pl: "Czy możesz mi pomóc?",
    },
    category: "requests",
    difficulty: "medium",
  },
  {
    id: 8,
    translations: {
      de: "Ich muss morgen früh aufstehen.",
      pl: "Jutro muszę wcześnie wstać.",
    },
    category: "daily life",
    difficulty: "medium",
  },
  {
    id: 9,
    translations: {
      de: "Wir treffen uns um 18 Uhr vor dem Kino.",
      pl: "Spotkamy się o 18:00 przed kinem.",
    },
    category: "appointments",
    difficulty: "medium",
  },
  {
    id: 10,
    translations: {
      de: "Ich lerne seit drei Jahren Deutsch.",
      pl: "Uczę się niemieckiego od trzech lat.",
    },
    category: "education",
    difficulty: "medium",
  },

  {
    id: 11,
    translations: {
      de: "Wenn ich Zeit hätte, würde ich mehr reisen.",
      pl: "Gdybym miał czas, podróżowałbym więcej.",
    },
    category: "conditional",
    difficulty: "hard",
  },
  {
    id: 12,
    translations: {
      de: "Die Globalisierung hat sowohl Vor- als auch Nachteile.",
      pl: "Globalizacja ma zarówno zalety, jak i wady.",
    },
    category: "society",
    difficulty: "hard",
  },
  {
    id: 13,
    translations: {
      de: "Nachdem er sein Studium abgeschlossen hatte, fand er sofort einen Job.",
      pl: "Po ukończeniu studiów od razu znalazł pracę.",
    },
    category: "career",
    difficulty: "hard",
  },
  {
    id: 14,
    translations: {
      de: "Obwohl es regnete, sind wir spazieren gegangen.",
      pl: "Mimo że padało, poszliśmy na spacer.",
    },
    category: "weather",
    difficulty: "hard",
  },
  {
    id: 15,
    translations: {
      de: "Je mehr ich über dieses Thema lese, desto interessanter finde ich es.",
      pl: "Im więcej czytam na ten temat, tym bardziej go znajduję interesującym.",
    },
    category: "education",
    difficulty: "hard",
  },
]

export function getRandomWords(count: number) {
  const shuffled = [...germanWords].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function getRandomSentences(count: number) {
  const shuffled = [...germanSentences].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function getWordInLanguage(word: WordItem, language: string): string {
  return word.translations[language] || ""
}

export function getSentenceInLanguage(sentence: SentenceItem, language: string): string {
  return sentence.translations[language] || ""
}

export function getLanguageName(code: string): string {
  switch (code) {
    case "de":
      return "Niemiecki"
    case "pl":
      return "Polski"
    case "en":
      return "Angielski"
    default:
      return code
  }
}
