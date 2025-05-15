"use client"

import type React from "react"
import { useState, lazy, Suspense, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, BookOpen, Download, Edit, MessageSquare, Plus, Save, Trash2, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { WordItem, SentenceItem } from "@/lib/quiz-data"
import { languages, type LanguageCode } from "@/lib/languages"
import { useLanguage } from "@/contexts/language-context"

const ParticleBackground = lazy(() => import("@/components/particle-background"))

type BazaDanych = {
  words: WordItem[]
  sentences: SentenceItem[]
  name: string
  author: string
  description: string
  dateCreated: string
  languages: LanguageCode[]
  difficulty?: "beginner" | "intermediate" | "advanced" | "mixed"
}

type EdytowanyElement = {
  type: "word" | "sentence"
  index: number
} | null

export default function StronaKreatora() {
  const { t, language: uiLanguage } = useLanguage()

  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>("en")
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>("pl")
  const [nazwaBazy, setNazwaBazy] = useState("Moja baza quizów")
  const [autorBazy, setAutorBazy] = useState("")
  const [opisBazy, setOpisBazy] = useState("")
  const [poziomTrudnosci, setPoziomTrudnosci] = useState<"beginner" | "intermediate" | "advanced" | "mixed">("beginner")
  const [slowa, setSlowa] = useState<WordItem[]>([])
  const [noweSlowo, setNoweSlowo] = useState<Partial<WordItem>>({
    translations: {},
    category: "nouns",
    difficulty: "easy",
  })
  const [zdania, setZdania] = useState<SentenceItem[]>([])
  const [noweZdanie, setNoweZdanie] = useState<Partial<SentenceItem>>({
    translations: {},
    category: "daily life",
    difficulty: "easy",
  })
  const [aktywnaZakladka, setAktywnaZakladka] = useState("words")
  const [edytowanyElement, setEdytowanyElement] = useState<EdytowanyElement>(null)
  const [pokazPotwierdzenie, setPokazPotwierdzenie] = useState(false)
  const [komunikat, setKomunikat] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    // Initialize translations object if it doesn't exist
    if (!noweSlowo.translations) {
      setNoweSlowo({ ...noweSlowo, translations: {} })
    }
    if (!noweZdanie.translations) {
      setNoweZdanie({ ...noweZdanie, translations: {} })
    }
  }, [noweSlowo, noweZdanie])

  const dodajSlowo = () => {
    const sourceText = noweSlowo.translations?.[sourceLanguage] || ""
    const targetText = noweSlowo.translations?.[targetLanguage] || ""

    if (!sourceText || !targetText) {
      setKomunikat({
        type: "error",
        message:
          uiLanguage === "pl"
            ? "Słowo źródłowe i tłumaczenie docelowe są wymagane."
            : "Source word and target translation are required.",
      })
      return
    }

    const elementSlowo: WordItem = {
      id: Date.now(),
      translations: noweSlowo.translations || {},
      category: noweSlowo.category || "nouns",
      difficulty: (noweSlowo.difficulty as "easy" | "medium" | "hard") || "easy",
    }

    setSlowa([...slowa, elementSlowo])
    setNoweSlowo({
      translations: {},
      category: noweSlowo.category,
      difficulty: noweSlowo.difficulty,
    })

    setKomunikat({
      type: "success",
      message: uiLanguage === "pl" ? `Dodano słowo: ${sourceText}` : `Added word: ${sourceText}`,
    })

    setTimeout(() => setKomunikat(null), 3000)
  }

  const dodajZdanie = () => {
    const sourceText = noweZdanie.translations?.[sourceLanguage] || ""
    const targetText = noweZdanie.translations?.[targetLanguage] || ""

    if (!sourceText || !targetText) {
      setKomunikat({
        type: "error",
        message:
          uiLanguage === "pl"
            ? "Zdanie źródłowe i tłumaczenie docelowe są wymagane."
            : "Source sentence and target translation are required.",
      })
      return
    }

    const elementZdanie: SentenceItem = {
      id: Date.now(),
      translations: noweZdanie.translations || {},
      category: noweZdanie.category || "daily life",
      difficulty: (noweZdanie.difficulty as "easy" | "medium" | "hard") || "easy",
    }

    setZdania([...zdania, elementZdanie])
    setNoweZdanie({
      translations: {},
      category: noweZdanie.category,
      difficulty: noweZdanie.difficulty,
    })

    setKomunikat({
      type: "success",
      message: uiLanguage === "pl" ? "Dodano nowe zdanie" : "Added new sentence",
    })

    setTimeout(() => setKomunikat(null), 3000)
  }

  const usunSlowo = (indeks: number) => {
    const zaktualizowaneSlowa = [...slowa]
    zaktualizowaneSlowa.splice(indeks, 1)
    setSlowa(zaktualizowaneSlowa)
  }

  const usunZdanie = (indeks: number) => {
    const zaktualizowaneZdania = [...zdania]
    zaktualizowaneZdania.splice(indeks, 1)
    setZdania(zaktualizowaneZdania)
  }

  const rozpocznijEdycjeSlowa = (indeks: number) => {
    setEdytowanyElement({ type: "word", index: indeks })
    setNoweSlowo({
      translations: { ...slowa[indeks].translations },
      category: slowa[indeks].category,
      difficulty: slowa[indeks].difficulty,
    })
    setAktywnaZakladka("words")
  }

  const rozpocznijEdycjeZdania = (indeks: number) => {
    setEdytowanyElement({ type: "sentence", index: indeks })
    setNoweZdanie({
      translations: { ...zdania[indeks].translations },
      category: zdania[indeks].category,
      difficulty: zdania[indeks].difficulty,
    })
    setAktywnaZakladka("sentences")
  }

  const zapiszEdytowanyElement = () => {
    if (edytowanyElement?.type === "word") {
      const sourceText = noweSlowo.translations?.[sourceLanguage] || ""
      const targetText = noweSlowo.translations?.[targetLanguage] || ""

      if (!sourceText || !targetText) {
        setKomunikat({
          type: "error",
          message:
            uiLanguage === "pl"
              ? "Słowo źródłowe i tłumaczenie docelowe są wymagane."
              : "Source word and target translation are required.",
        })
        return
      }

      const zaktualizowaneSlowa = [...slowa]
      zaktualizowaneSlowa[edytowanyElement.index] = {
        ...zaktualizowaneSlowa[edytowanyElement.index],
        translations: noweSlowo.translations || {},
        category: noweSlowo.category || "nouns",
        difficulty: (noweSlowo.difficulty as "easy" | "medium" | "hard") || "easy",
      }
      setSlowa(zaktualizowaneSlowa)
    } else if (edytowanyElement?.type === "sentence") {
      const sourceText = noweZdanie.translations?.[sourceLanguage] || ""
      const targetText = noweZdanie.translations?.[targetLanguage] || ""

      if (!sourceText || !targetText) {
        setKomunikat({
          type: "error",
          message:
            uiLanguage === "pl"
              ? "Zdanie źródłowe i tłumaczenie docelowe są wymagane."
              : "Source sentence and target translation are required.",
        })
        return
      }

      const zaktualizowaneZdania = [...zdania]
      zaktualizowaneZdania[edytowanyElement.index] = {
        ...zaktualizowaneZdania[edytowanyElement.index],
        translations: noweZdanie.translations || {},
        category: noweZdanie.category || "daily life",
        difficulty: (noweZdanie.difficulty as "easy" | "medium" | "hard") || "easy",
      }
      setZdania(zaktualizowaneZdania)
    }

    anulujEdycje()

    setKomunikat({
      type: "success",
      message: uiLanguage === "pl" ? "Edycja zakończona pomyślnie" : "Edit completed successfully",
    })

    setTimeout(() => setKomunikat(null), 3000)
  }

  const anulujEdycje = () => {
    setEdytowanyElement(null)
    if (aktywnaZakladka === "words") {
      setNoweSlowo({
        translations: {},
        category: "nouns",
        difficulty: "easy",
      })
    } else {
      setNoweZdanie({
        translations: {},
        category: "daily life",
        difficulty: "easy",
      })
    }
  }

  const eksportujBaze = () => {
    if (slowa.length === 0 && zdania.length === 0) {
      setKomunikat({
        type: "error",
        message:
          uiLanguage === "pl"
            ? "Baza danych jest pusta. Dodaj co najmniej jedno słowo lub zdanie."
            : "Database is empty. Add at least one word or sentence.",
      })
      return
    }

    const bazaDanych: BazaDanych = {
      words: slowa,
      sentences: zdania,
      name: nazwaBazy || "Moja baza quizów",
      author: autorBazy || "Nieznany",
      description: opisBazy || "",
      dateCreated: new Date().toISOString(),
      languages: [sourceLanguage, targetLanguage],
      difficulty: poziomTrudnosci,
    }

    const jsonString = JSON.stringify(bazaDanych, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `${nazwaBazy.toLowerCase().replace(/\s+/g, "-")}-${sourceLanguage}-${targetLanguage}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setKomunikat({
      type: "success",
      message: uiLanguage === "pl" ? "Baza danych została wyeksportowana pomyślnie" : "Database exported successfully",
    })

    setTimeout(() => setKomunikat(null), 3000)
  }

  const importujBaze = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pliki = event.target.files
    if (!pliki || pliki.length === 0) return

    const plik = pliki[0]
    const czytnik = new FileReader()

    czytnik.onload = (e) => {
      try {
        const zawartosc = e.target?.result as string
        const zaimportowane = JSON.parse(zawartosc) as BazaDanych & { language?: LanguageCode }

        if (
          !zaimportowane.words ||
          !Array.isArray(zaimportowane.words) ||
          !zaimportowane.sentences ||
          !Array.isArray(zaimportowane.sentences)
        ) {
          throw new Error("Nieprawidłowy format pliku")
        }

        // Handle legacy format
        if (zaimportowane.language && !zaimportowane.languages) {
          zaimportowane.languages = [zaimportowane.language, "pl"]
        }

        if (!zaimportowane.languages || zaimportowane.languages.length < 2) {
          zaimportowane.languages = ["en", "pl"]
        }

        if (
          window.confirm(
            uiLanguage === "pl"
              ? "Importowanie zastąpi wszystkie aktualne dane. Czy kontynuować?"
              : "Importing will replace all current data. Continue?",
          )
        ) {
          setSlowa(zaimportowane.words)
          setZdania(zaimportowane.sentences)
          setNazwaBazy(zaimportowane.name || "Moja baza quizów")
          setAutorBazy(zaimportowane.author || "")
          setOpisBazy(zaimportowane.description || "")
          setSourceLanguage(zaimportowane.languages[0])
          setTargetLanguage(zaimportowane.languages[1])
          setPoziomTrudnosci(zaimportowane.difficulty || "beginner")

          setKomunikat({
            type: "success",
            message:
              uiLanguage === "pl"
                ? `Zaimportowano bazę danych: ${zaimportowane.words.length} słów i ${zaimportowane.sentences.length} zdań`
                : `Imported database: ${zaimportowane.words.length} words and ${zaimportowane.sentences.length} sentences`,
          })
        }
      } catch (error) {
        console.error(error)
        setKomunikat({
          type: "error",
          message: uiLanguage === "pl" ? "Błąd importu. Sprawdź format pliku." : "Import error. Check file format.",
        })
      }
    }

    czytnik.readAsText(plik)
    event.target.value = ""
  }

  const resetujBaze = () => {
    setSlowa([])
    setZdania([])
    setNazwaBazy("Moja baza quizów")
    setAutorBazy("")
    setOpisBazy("")
    setPoziomTrudnosci("beginner")
    setPokazPotwierdzenie(false)

    setKomunikat({
      type: "success",
      message: uiLanguage === "pl" ? "Baza danych została zresetowana" : "Database has been reset",
    })

    setTimeout(() => setKomunikat(null), 3000)
  }

  const handleSourceWordChange = (value: string) => {
    setNoweSlowo({
      ...noweSlowo,
      translations: {
        ...noweSlowo.translations,
        [sourceLanguage]: value,
      },
    })
  }

  const handleTargetWordChange = (value: string) => {
    setNoweSlowo({
      ...noweSlowo,
      translations: {
        ...noweSlowo.translations,
        [targetLanguage]: value,
      },
    })
  }

  const handleSourceSentenceChange = (value: string) => {
    setNoweZdanie({
      ...noweZdanie,
      translations: {
        ...noweZdanie.translations,
        [sourceLanguage]: value,
      },
    })
  }

  const handleTargetSentenceChange = (value: string) => {
    setNoweZdanie({
      ...noweZdanie,
      translations: {
        ...noweZdanie.translations,
        [targetLanguage]: value,
      },
    })
  }

  const getLanguageNameWithFlag = (code: LanguageCode) => {
    const lang = languages.find((l) => l.code === code)
    if (!lang) return code
    return `${lang.flag} ${lang.name[uiLanguage as "pl" | "en"]}`
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 dark:text-white text-neutral-900">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <div className="container max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">{t("databaseCreatorTitle")}</h1>
        <p className="text-muted-foreground mb-8">{t("databaseCreatorDesc")}</p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t("databaseMetadata")}</CardTitle>
            <CardDescription>{t("databaseMetadataDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="databaseName">{t("databaseName")}</Label>
                <Input
                  id="databaseName"
                  value={nazwaBazy}
                  onChange={(e) => setNazwaBazy(e.target.value)}
                  placeholder={uiLanguage === "pl" ? "Np. Słownictwo do egzaminu B1" : "E.g. Vocabulary for B1 exam"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="databaseAuthor">{t("author")}</Label>
                <Input
                  id="databaseAuthor"
                  value={autorBazy}
                  onChange={(e) => setAutorBazy(e.target.value)}
                  placeholder={uiLanguage === "pl" ? "Twoje imię (opcjonalnie)" : "Your name (optional)"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty-select">{t("difficultyLevel")}</Label>
                <Select value={poziomTrudnosci} onValueChange={(value: any) => setPoziomTrudnosci(value)}>
                  <SelectTrigger id="difficulty-select" className="w-full md:w-64">
                    <SelectValue
                      placeholder={uiLanguage === "pl" ? "Wybierz poziom trudności" : "Select difficulty level"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">{t("beginner")}</SelectItem>
                    <SelectItem value="intermediate">{t("intermediate")}</SelectItem>
                    <SelectItem value="advanced">{t("advanced")}</SelectItem>
                    <SelectItem value="mixed">{t("mixed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source-language-select">{t("sourceLanguage")}</Label>
                <Select value={sourceLanguage} onValueChange={(value: LanguageCode) => setSourceLanguage(value)}>
                  <SelectTrigger id="source-language-select" className="w-full">
                    <SelectValue
                      placeholder={uiLanguage === "pl" ? "Wybierz język źródłowy" : "Select source language"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name[uiLanguage as "pl" | "en"]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-language-select">{t("targetLanguage")}</Label>
                <Select value={targetLanguage} onValueChange={(value: LanguageCode) => setTargetLanguage(value)}>
                  <SelectTrigger id="target-language-select" className="w-full">
                    <SelectValue
                      placeholder={uiLanguage === "pl" ? "Wybierz język docelowy" : "Select target language"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {languages
                      .filter((lang) => lang.code !== sourceLanguage)
                      .map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name[uiLanguage as "pl" | "en"]}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="databaseDescription">{t("databaseDescription")}</Label>
              <Textarea
                id="databaseDescription"
                value={opisBazy}
                onChange={(e) => setOpisBazy(e.target.value)}
                placeholder={
                  uiLanguage === "pl"
                    ? "Krótki opis zawartości bazy danych (opcjonalnie)"
                    : "Short description of database content (optional)"
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap gap-2">
            <div className="flex gap-2">
              <Button onClick={eksportujBaze} className="gap-2" disabled={slowa.length === 0 && zdania.length === 0}>
                <Download className="h-4 w-4" />
                {t("exportDatabase")}
              </Button>

              <label htmlFor="import-json" className="cursor-pointer">
                <Button variant="outline" className="gap-2" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                    {t("importDatabase")}
                  </span>
                </Button>
                <input id="import-json" type="file" accept=".json" className="sr-only" onChange={importujBaze} />
              </label>
            </div>

            <Dialog open={pokazPotwierdzenie} onOpenChange={setPokazPotwierdzenie}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  {t("resetDatabase")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("confirmReset")}</DialogTitle>
                  <DialogDescription>{t("resetConfirmDesc")}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setPokazPotwierdzenie(false)}>
                    {t("cancel")}
                  </Button>
                  <Button variant="destructive" onClick={resetujBaze}>
                    {t("yesResetDatabase")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {komunikat && (
          <Alert
            className={`mb-4 ${komunikat.type === "success" ? "bg-green-50 dark:bg-green-950/20 border-green-200" : "bg-red-50 dark:bg-red-950/20 border-red-200"}`}
          >
            <AlertCircle className={`h-4 w-4 ${komunikat.type === "success" ? "text-green-500" : "text-red-500"}`} />
            <AlertDescription>{komunikat.message}</AlertDescription>
          </Alert>
        )}

        <Tabs value={aktywnaZakladka} onValueChange={setAktywnaZakladka} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="words" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t("words")} ({slowa.length})
            </TabsTrigger>
            <TabsTrigger value="sentences" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {t("sentences")} ({zdania.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="words" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{edytowanyElement?.type === "word" ? t("editWord") : t("addNewWord")}</CardTitle>
                <CardDescription>
                  {edytowanyElement?.type === "word" ? t("editWordDesc") : t("addNewWordDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sourceWord">
                      {t("sourceWord")} ({getLanguageNameWithFlag(sourceLanguage)})
                    </Label>
                    <Input
                      id="sourceWord"
                      value={noweSlowo.translations?.[sourceLanguage] || ""}
                      onChange={(e) => handleSourceWordChange(e.target.value)}
                      placeholder={uiLanguage === "pl" ? "Np. house" : "E.g. house"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetWord">
                      {t("targetTranslation")} ({getLanguageNameWithFlag(targetLanguage)})
                    </Label>
                    <Input
                      id="targetWord"
                      value={noweSlowo.translations?.[targetLanguage] || ""}
                      onChange={(e) => handleTargetWordChange(e.target.value)}
                      placeholder={uiLanguage === "pl" ? "Np. dom" : "E.g. casa"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wordCategory">{t("category")}</Label>
                    <Input
                      id="wordCategory"
                      value={noweSlowo.category || ""}
                      onChange={(e) => setNoweSlowo({ ...noweSlowo, category: e.target.value })}
                      placeholder={uiLanguage === "pl" ? "Np. rzeczowniki" : "E.g. nouns"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("difficulty")}</Label>
                    <RadioGroup
                      value={noweSlowo.difficulty || "easy"}
                      onValueChange={(value) =>
                        setNoweSlowo({ ...noweSlowo, difficulty: value as "easy" | "medium" | "hard" })
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="easy-word" />
                        <Label htmlFor="easy-word">{t("easy")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium-word" />
                        <Label htmlFor="medium-word">{t("medium")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="hard-word" />
                        <Label htmlFor="hard-word">{t("hard")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {edytowanyElement?.type === "word" ? (
                  <>
                    <Button variant="outline" onClick={anulujEdycje}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={zapiszEdytowanyElement} className="gap-2">
                      <Save className="h-4 w-4" />
                      {t("saveChanges")}
                    </Button>
                  </>
                ) : (
                  <Button onClick={dodajSlowo} className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t("addWord")}
                  </Button>
                )}
              </CardFooter>
            </Card>

            {slowa.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("wordList")} ({slowa.length})
                  </CardTitle>
                  <CardDescription>{t("wordListDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{getLanguageNameWithFlag(sourceLanguage)}</TableHead>
                          <TableHead>{getLanguageNameWithFlag(targetLanguage)}</TableHead>
                          <TableHead>{t("category")}</TableHead>
                          <TableHead>{t("difficulty")}</TableHead>
                          <TableHead className="w-[100px]">{t("actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {slowa.map((slowo, indeks) => (
                          <TableRow key={slowo.id}>
                            <TableCell className="font-medium">{slowo.translations[sourceLanguage] || ""}</TableCell>
                            <TableCell>{slowo.translations[targetLanguage] || ""}</TableCell>
                            <TableCell>{slowo.category}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-muted">
                                {slowo.difficulty === "easy"
                                  ? t("easy")
                                  : slowo.difficulty === "medium"
                                    ? t("medium")
                                    : t("hard")}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => rozpocznijEdycjeSlowa(indeks)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => usunSlowo(indeks)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-muted-foreground">{t("noWordsAddedDesc")}</div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sentences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{edytowanyElement?.type === "sentence" ? t("editSentence") : t("addNewSentence")}</CardTitle>
                <CardDescription>
                  {edytowanyElement?.type === "sentence" ? t("editSentenceDesc") : t("addNewSentenceDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sourceSentence">
                    {t("sourceSentence")} ({getLanguageNameWithFlag(sourceLanguage)})
                  </Label>
                  <Textarea
                    id="sourceSentence"
                    value={noweZdanie.translations?.[sourceLanguage] || ""}
                    onChange={(e) => handleSourceSentenceChange(e.target.value)}
                    placeholder={uiLanguage === "pl" ? "Np. I am going to school." : "E.g. I am going to school."}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetSentence">
                    {t("targetTranslation")} ({getLanguageNameWithFlag(targetLanguage)})
                  </Label>
                  <Textarea
                    id="targetSentence"
                    value={noweZdanie.translations?.[targetLanguage] || ""}
                    onChange={(e) => handleTargetSentenceChange(e.target.value)}
                    placeholder={uiLanguage === "pl" ? "Np. Idę do szkoły." : "E.g. Voy a la escuela."}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sentenceCategory">{t("category")}</Label>
                    <Input
                      id="sentenceCategory"
                      value={noweZdanie.category || ""}
                      onChange={(e) => setNoweZdanie({ ...noweZdanie, category: e.target.value })}
                      placeholder={uiLanguage === "pl" ? "Np. życie codzienne" : "E.g. daily life"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("difficulty")}</Label>
                    <RadioGroup
                      value={noweZdanie.difficulty || "easy"}
                      onValueChange={(value) =>
                        setNoweZdanie({ ...noweZdanie, difficulty: value as "easy" | "medium" | "hard" })
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="easy-sentence" />
                        <Label htmlFor="easy-sentence">{t("easy")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium-sentence" />
                        <Label htmlFor="medium-sentence">{t("medium")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="hard-sentence" />
                        <Label htmlFor="hard-sentence">{t("hard")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {edytowanyElement?.type === "sentence" ? (
                  <>
                    <Button variant="outline" onClick={anulujEdycje}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={zapiszEdytowanyElement} className="gap-2">
                      <Save className="h-4 w-4" />
                      {t("saveChanges")}
                    </Button>
                  </>
                ) : (
                  <Button onClick={dodajZdanie} className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t("addSentence")}
                  </Button>
                )}
              </CardFooter>
            </Card>

            {zdania.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("sentenceList")} ({zdania.length})
                  </CardTitle>
                  <CardDescription>{t("sentenceListDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{getLanguageNameWithFlag(sourceLanguage)}</TableHead>
                          <TableHead>{getLanguageNameWithFlag(targetLanguage)}</TableHead>
                          <TableHead>{t("category")}</TableHead>
                          <TableHead>{t("difficulty")}</TableHead>
                          <TableHead className="w-[100px]">{t("actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {zdania.map((zdanie, indeks) => (
                          <TableRow key={zdanie.id}>
                            <TableCell className="font-medium max-w-xs truncate">
                              {zdanie.translations[sourceLanguage] || ""}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {zdanie.translations[targetLanguage] || ""}
                            </TableCell>
                            <TableCell>{zdanie.category}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-muted">
                                {zdanie.difficulty === "easy"
                                  ? t("easy")
                                  : zdanie.difficulty === "medium"
                                    ? t("medium")
                                    : t("hard")}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => rozpocznijEdycjeZdania(indeks)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => usunZdanie(indeks)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-muted-foreground">{t("noSentencesAddedDesc")}</div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
