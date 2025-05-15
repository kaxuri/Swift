"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  MessageSquare,
  Shuffle,
  Upload,
  Trash2,
  Settings,
  Database,
  Check,
  X,
  List,
  Layers,
  Download,
  ChevronRight,
} from "lucide-react"
import {
  czyIstniejeWlasnaBaze as czyIstniejeWlasnaBazeFunc,
  pobierzWlasnaBaze,
  zapiszWlasnaBaze,
  usunWlasnaBaze,
} from "@/lib/custom-database"
import ParticleBackground from "@/components/particle-background"
import { useLanguage } from "@/contexts/language-context"

const getLanguageName = (lang: "de" | "pl" | "en") => {
  switch (lang) {
    case "de":
      return "Niemiecki"
    case "pl":
      return "Polski"
    case "en":
      return "Angielski"
    default:
      return "Nieznany"
  }
}

export default function QuizPage() {
  const [iloscSlow, setIloscSlow] = useState(10)
  const [iloscZdan, setIloscZdan] = useState(5)
  const [jezykZrodlowy, setJezykZrodlowy] = useState<"de" | "pl" | "en">("de")
  const [jezykDocelowy, setJezykDocelowy] = useState<"de" | "pl" | "en">("pl")
  const [uzyjWlasnejBazy, setUzyjWlasnejBazy] = useState(false)
  const [infoWlasnejBazy, setInfoWlasnejBazy] = useState<{
    name: string
    words: number
    sentences: number
    language?: "de" | "en"
  } | null>(null)
  const [statusWgrywania, setStatusWgrywania] = useState<{ success: boolean; message: string } | null>(null)
  const [zamontowany, setZamontowany] = useState(false)
  const [typTestu, setTypTestu] = useState<"wpisywanie" | "prawdaFalsz" | "wybor" | "mieszany">("wpisywanie")
  const [dostepneJezyki, setDostepneJezyki] = useState<{
    source: ("de" | "pl" | "en")[]
    target: ("de" | "pl" | "en")[]
  }>({
    source: ["de", "pl", "en"],
    target: ["de", "pl", "en"],
  })
  const [activeSettingsTab, setActiveSettingsTab] = useState("general")
  const [noDatabaseMessage, setNoDatabaseMessage] = useState(false)

  const { t, language } = useLanguage()

  useEffect(() => {
    setZamontowany(true)
    if (typeof window !== "undefined") {
      const maWlasnaBaze = czyIstniejeWlasnaBazeFunc()
      setUzyjWlasnejBazy(maWlasnaBaze)

      if (maWlasnaBaze) {
        const wlasnaBaza = pobierzWlasnaBaze()
        if (wlasnaBaza) {
          setInfoWlasnejBazy({
            name: wlasnaBaza.name,
            words: wlasnaBaza.words.length,
            sentences: wlasnaBaza.sentences.length,
            language: wlasnaBaza.language,
          })

          if (wlasnaBaza.language) {
            if (wlasnaBaza.language === "de") {
              setDostepneJezyki({
                source: ["de", "pl"],
                target: ["de", "pl"],
              })
              setJezykZrodlowy("de")
              setJezykDocelowy("pl")
            } else if (wlasnaBaza.language === "en") {
              setDostepneJezyki({
                source: ["en", "pl"],
                target: ["en", "pl"],
              })
              setJezykZrodlowy("en")
              setJezykDocelowy("pl")
            }
          }
        }
      } else {
        setNoDatabaseMessage(true)
        setDostepneJezyki({
          source: ["de", "pl", "en"],
          target: ["de", "pl", "en"],
        })
      }

      const zapisanyTypTestu = localStorage.getItem("typTestu")
      if (zapisanyTypTestu) {
        setTypTestu(zapisanyTypTestu as "wpisywanie" | "prawdaFalsz" | "wybor" | "mieszany")
      }

      const zapisanyJezykZrodlowy = localStorage.getItem("jezykZrodlowy")
      if (zapisanyJezykZrodlowy && dostepneJezyki.source.includes(zapisanyJezykZrodlowy as any)) {
        setJezykZrodlowy(zapisanyJezykZrodlowy as "de" | "pl" | "en")
      }

      const zapisanyJezykDocelowy = localStorage.getItem("jezykDocelowy")
      if (zapisanyJezykDocelowy && dostepneJezyki.target.includes(zapisanyJezykDocelowy as any)) {
        setJezykDocelowy(zapisanyJezykDocelowy as "de" | "pl" | "en")
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("typTestu", typTestu)
      localStorage.setItem("jezykZrodlowy", jezykZrodlowy)
      localStorage.setItem("jezykDocelowy", jezykDocelowy)
    }
  }, [typTestu, jezykZrodlowy, jezykDocelowy])

  useEffect(() => {
    if (jezykZrodlowy === jezykDocelowy) {
      const dostepneDocelowe = dostepneJezyki.target.filter((lang) => lang !== jezykZrodlowy)
      if (dostepneDocelowe.length > 0) {
        setJezykDocelowy(dostepneDocelowe[0])
      }
    }
  }, [jezykZrodlowy, jezykDocelowy, dostepneJezyki])

  const obslugaImportuBazy = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const pliki = event.target.files
      if (!pliki || pliki.length === 0) return

      const plik = pliki[0]
      const czytnik = new FileReader()

      czytnik.onload = (e) => {
        try {
          const zawartosc = e.target?.result as string
          const zaimportowane = JSON.parse(zawartosc)

          if (
            !zaimportowane.words ||
            !Array.isArray(zaimportowane.words) ||
            !zaimportowane.sentences ||
            !Array.isArray(zaimportowane.sentences)
          ) {
            throw new Error("Nieprawidłowy format pliku")
          }

          let jezykBazy: "de" | "en" | undefined = zaimportowane.language

          if (!jezykBazy) {
            const hasGerman = zaimportowane.words.some((word: any) => word.germanWord && word.germanWord.trim() !== "")
            const hasEnglish = zaimportowane.words.some(
              (word: any) => word.englishTranslation && word.englishTranslation.trim() !== "",
            )

            if (hasGerman && !hasEnglish) {
              jezykBazy = "de"
            } else if (hasEnglish && !hasGerman) {
              jezykBazy = "en"
            } else {
              jezykBazy = "de"
            }
          }

          zaimportowane.language = jezykBazy
          zapiszWlasnaBaze(zaimportowane)

          setUzyjWlasnejBazy(true)
          setNoDatabaseMessage(false)
          setInfoWlasnejBazy({
            name: zaimportowane.name,
            words: zaimportowane.words.length,
            sentences: zaimportowane.sentences.length,
            language: jezykBazy,
          })

          if (jezykBazy === "de") {
            setDostepneJezyki({
              source: ["de", "pl"],
              target: ["de", "pl"],
            })
            setJezykZrodlowy("de")
            setJezykDocelowy("pl")
          } else if (jezykBazy === "en") {
            setDostepneJezyki({
              source: ["en", "pl"],
              target: ["en", "pl"],
            })
            setJezykZrodlowy("en")
            setJezykDocelowy("pl")
          }

          setStatusWgrywania({
            success: true,
            message: t("importSuccess", {
              name: zaimportowane.name,
              words: zaimportowane.words.length,
              sentences: zaimportowane.sentences.length,
            }),
          })

          setTimeout(() => setStatusWgrywania(null), 5000)
        } catch (error) {
          console.error(error)
          setStatusWgrywania({
            success: false,
            message: t("importError"),
          })

          setTimeout(() => setStatusWgrywania(null), 5000)
        }
      }

      czytnik.readAsText(plik)
      event.target.value = ""
    },
    [t],
  )

  const wyczyscWlasnaBaze = useCallback(() => {
    usunWlasnaBaze()
    setUzyjWlasnejBazy(false)
    setInfoWlasnejBazy(null)
    setNoDatabaseMessage(true)

    setDostepneJezyki({
      source: ["de", "pl", "en"],
      target: ["de", "pl", "en"],
    })
    setJezykZrodlowy("de")
    setJezykDocelowy("pl")

    setStatusWgrywania({
      success: true,
      message: t("databaseDeleted"),
    })

    setTimeout(() => setStatusWgrywania(null), 5000)
  }, [t])

  const dostepneSlowa = useMemo(
    () => (uzyjWlasnejBazy && infoWlasnejBazy ? infoWlasnejBazy.words : 0),
    [uzyjWlasnejBazy, infoWlasnejBazy],
  )

  const dostepneZdania = useMemo(
    () => (uzyjWlasnejBazy && infoWlasnejBazy ? infoWlasnejBazy.sentences : 0),
    [uzyjWlasnejBazy, infoWlasnejBazy],
  )

  useEffect(() => {
    if (iloscSlow > dostepneSlowa && dostepneSlowa > 0) {
      setIloscSlow(dostepneSlowa)
    }

    if (iloscZdan > dostepneZdania && dostepneZdania > 0) {
      setIloscZdan(dostepneZdania)
    }
  }, [dostepneSlowa, dostepneZdania, iloscSlow, iloscZdan])

  const hasSentences = useMemo(
    () => (uzyjWlasnejBazy && infoWlasnejBazy ? infoWlasnejBazy.sentences > 0 : false),
    [uzyjWlasnejBazy, infoWlasnejBazy],
  )

  if (!zamontowany) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-white text-xl font-bold">{t("loading")}</div>
        </motion.div>
      </div>
    )
  }

  const quizOptions = [
    {
      title: t("wordQuiz"),
      description: t("wordQuizDescription", { count: iloscSlow }),
      icon: <BookOpen className="h-6 w-6" aria-hidden="true" />,
      color: "from-purple-600 to-blue-600",
      textColor: "text-blue-100",
      href: `/quiz/words?count=${iloscSlow}&source=${jezykZrodlowy}&target=${jezykDocelowy}&custom=${uzyjWlasnejBazy ? "1" : "0"}&type=${typTestu}`,
      available: uzyjWlasnejBazy && dostepneSlowa > 0,
      ariaLabel: t("startWordQuiz"),
    },
    {
      title: t("sentenceQuiz"),
      description: t("sentenceQuizDescription", { count: iloscZdan }),
      icon: <MessageSquare className="h-6 w-6" aria-hidden="true" />,
      color: "from-pink-600 to-purple-600",
      textColor: "text-purple-100",
      href: `/quiz/sentences?count=${iloscZdan}&source=${jezykZrodlowy}&target=${jezykDocelowy}&custom=${uzyjWlasnejBazy ? "1" : "0"}&type=${typTestu}`,
      available: uzyjWlasnejBazy && hasSentences,
      ariaLabel: t("startSentenceQuiz"),
    },
    {
      title: t("mixedQuiz"),
      description: t("mixedQuizDescription", { wordCount: iloscSlow, sentenceCount: iloscZdan }),
      icon: <Shuffle className="h-6 w-6" aria-hidden="true" />,
      color: "from-blue-600 to-cyan-600",
      textColor: "text-cyan-100",
      href: `/quiz/combined?wordCount=${iloscSlow}&sentenceCount=${iloscZdan}&source=${jezykZrodlowy}&target=${jezykDocelowy}&custom=${uzyjWlasnejBazy ? "1" : "0"}&type=${typTestu}`,
      available: uzyjWlasnejBazy && hasSentences,
      ariaLabel: t("startMixedQuiz"),
    },
  ]

  // Translations for test types
  const testTypes = {
    wpisywanie: {
      title: t("typingAnswers"),
      description: t("typingAnswersDescription"),
      icon: <Check className="h-4 w-4" aria-hidden="true" />,
      color: "from-blue-600 to-cyan-600",
    },
    prawdaFalsz: {
      title: t("trueFalse"),
      description: t("trueFalseDescription"),
      icon: <X className="h-4 w-4" aria-hidden="true" />,
      color: "from-pink-600 to-purple-600",
    },
    wybor: {
      title: t("multipleChoice"),
      description: t("multipleChoiceDescription"),
      icon: <List className="h-4 w-4" aria-hidden="true" />,
      color: "from-amber-600 to-orange-600",
    },
    mieszany: {
      title: t("mixed"),
      description: t("mixedDescription"),
      icon: <Shuffle className="h-4 w-4" aria-hidden="true" />,
      color: "from-emerald-600 to-green-600",
    },
  }

  return (
    <div className="relative bg-neutral-950 text-white min-h-screen">
      <ParticleBackground />

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">{t("quizConfiguration")}</h1>
          <p className="text-xl text-neutral-300">{t("customizeQuizSettings")}</p>
        </motion.div>

        {/* Database Alert (if needed) */}
        {noDatabaseMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between p-6 rounded-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-800/30">
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2 text-amber-400">{t("noDatabaseAvailable")}</h2>
                <p className="text-neutral-300">{t("importDatabaseMessage")}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  asChild
                >
                  <Link href="/sets">
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    {t("browseSets")}
                  </Link>
                </Button>
                <label htmlFor="import-json-home" className="cursor-pointer">
                  <Button
                    variant="outline"
                    className="gap-2 border-blue-600 text-blue-400 hover:bg-blue-950/30"
                    asChild
                  >
                    <span>
                      <Upload className="h-4 w-4" aria-hidden="true" />
                      {t("importDatabase")}
                    </span>
                  </Button>
                  <input
                    id="import-json-home"
                    type="file"
                    accept=".json"
                    className="sr-only"
                    onChange={obslugaImportuBazy}
                    aria-label={t("importDatabaseFile")}
                  />
                </label>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-3 text-blue-400" aria-hidden="true" />
                {t("quizSettings")}
              </h2>

              <Tabs
                defaultValue="general"
                value={activeSettingsTab}
                onValueChange={setActiveSettingsTab}
                className="w-full"
              >
                <TabsList
                  className="w-full grid grid-cols-3 gap-2 bg-neutral-800/50 p-1 rounded-xl mb-6"
                  aria-label={t("settingsCategories")}
                >
                  <TabsTrigger
                    value="general"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-2"
                    aria-label={t("generalSettings")}
                  >
                    <Settings className="h-4 w-4 mr-2 md:inline-block hidden" aria-hidden="true" />
                    {t("general")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="database"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-2"
                    aria-label={t("databaseSettings")}
                  >
                    <Database className="h-4 w-4 mr-2 md:inline-block hidden" aria-hidden="true" />
                    {t("database")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="test-type"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-2"
                    aria-label={t("testTypeSettings")}
                  >
                    <Layers className="h-4 w-4 mr-2 md:inline-block hidden" aria-hidden="true" />
                    {t("testType")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="bg-neutral-800/60 backdrop-blur-sm p-4 rounded-xl border border-neutral-700/50">
                      <Label htmlFor="wordCount" className="text-sm block mb-2 text-blue-300">
                        {t("wordQuestionCount")}:
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="wordCount"
                          type="number"
                          min={1}
                          max={dostepneSlowa}
                          value={iloscSlow}
                          onChange={(e) =>
                            setIloscSlow(Math.min(dostepneSlowa, Math.max(1, Number.parseInt(e.target.value) || 1)))
                          }
                          className="w-24 text-lg bg-neutral-800 border-neutral-700 focus:border-blue-500"
                          aria-label={t("wordQuestionCountAria", { max: dostepneSlowa })}
                        />
                        <span className="text-neutral-400">(max: {dostepneSlowa})</span>
                      </div>
                    </div>

                    {hasSentences && (
                      <div className="bg-neutral-800/60 backdrop-blur-sm p-4 rounded-xl border border-neutral-700/50">
                        <Label htmlFor="sentenceCount" className="text-sm block mb-2 text-purple-300">
                          {t("sentenceQuestionCount")}:
                        </Label>
                        <div className="flex items-center gap-3">
                          <Input
                            id="sentenceCount"
                            type="number"
                            min={1}
                            max={dostepneZdania}
                            value={iloscZdan}
                            onChange={(e) =>
                              setIloscZdan(Math.min(dostepneZdania, Math.max(1, Number.parseInt(e.target.value) || 1)))
                            }
                            className="w-24 text-lg bg-neutral-800 border-neutral-700 focus:border-purple-500"
                            aria-label={t("sentenceQuestionCountAria", { max: dostepneZdania })}
                          />
                          <span className="text-neutral-400">(max: {dostepneZdania})</span>
                        </div>
                      </div>
                    )}

                    <div className="bg-neutral-800/60 backdrop-blur-sm p-4 rounded-xl border border-neutral-700/50">
                      <Label className="text-sm mb-3 block text-cyan-300">{t("selectLanguages")}:</Label>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="source-language" className="text-xs block text-neutral-300">
                            {t("sourceLanguage")}:
                          </Label>
                          <Select
                            value={jezykZrodlowy}
                            onValueChange={(value) => setJezykZrodlowy(value as "de" | "pl" | "en")}
                            aria-label={t("selectSourceLanguage")}
                          >
                            <SelectTrigger id="source-language" className="text-sm bg-neutral-800 border-neutral-700">
                              <SelectValue placeholder={t("selectSourceLanguage")} />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              {dostepneJezyki.source.map((lang) => (
                                <SelectItem key={lang} value={lang} className="text-white">
                                  {getLanguageName(lang)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="target-language" className="text-xs block text-neutral-300">
                            {t("targetLanguage")}:
                          </Label>
                          <Select
                            value={jezykDocelowy}
                            onValueChange={(value) => setJezykDocelowy(value as "de" | "pl" | "en")}
                            aria-label={t("selectTargetLanguage")}
                          >
                            <SelectTrigger id="target-language" className="text-sm bg-neutral-800 border-neutral-700">
                              <SelectValue placeholder={t("selectTargetLanguage")} />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 border-neutral-700">
                              {dostepneJezyki.target
                                .filter((lang) => lang !== jezykZrodlowy)
                                .map((lang) => (
                                  <SelectItem key={lang} value={lang} className="text-white">
                                    {getLanguageName(lang)}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2">
                        {getLanguageName(jezykZrodlowy)} → {getLanguageName(jezykDocelowy)}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="database" className="space-y-6 mt-0">
                  <div className="bg-neutral-800/60 backdrop-blur-sm p-4 rounded-xl border border-neutral-700/50">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="database-switch"
                          checked={uzyjWlasnejBazy}
                          onCheckedChange={setUzyjWlasnejBazy}
                          disabled={!czyIstniejeWlasnaBazeFunc()}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                          aria-label={uzyjWlasnejBazy ? t("useCustomDatabase") : t("useBuiltInDatabase")}
                        />
                        <Label htmlFor="database-switch" className="text-sm flex items-center gap-2">
                          {uzyjWlasnejBazy ? t("customDatabase") : t("noDatabase")}
                        </Label>
                      </div>
                      <p className="text-xs text-neutral-400 ml-10">
                        {uzyjWlasnejBazy
                          ? t("usingCustomDatabase", {
                              name: infoWlasnejBazy?.name || t("custom"),
                              words: infoWlasnejBazy?.words || 0,
                              sentences: infoWlasnejBazy?.sentences || 0,
                              language: infoWlasnejBazy?.language === "de" ? t("german") : t("english"),
                            })
                          : t("noDatabaseMessage")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 border-blue-600 text-blue-400 hover:bg-blue-950/30"
                            aria-label={t("importDatabase")}
                          >
                            <Upload className="h-3 w-3" aria-hidden="true" />
                            {t("importDatabase")}
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="bg-neutral-900 border-neutral-800">
                        <DialogHeader>
                          <DialogTitle className="text-white">{t("importCustomDatabase")}</DialogTitle>
                          <DialogDescription className="text-neutral-400">{t("selectJsonFile")}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p className="text-sm text-neutral-400">{t("importWarning")}</p>
                          <div className="flex gap-2 items-center">
                            <label htmlFor="import-json" className="cursor-pointer flex-1">
                              <Button
                                variant="outline"
                                className="w-full gap-2 border-blue-600 text-blue-400 hover:bg-blue-950/30"
                                asChild
                              >
                                <span>
                                  <Upload className="h-4 w-4" aria-hidden="true" />
                                  {t("selectJsonFile")}
                                </span>
                              </Button>
                              <input
                                id="import-json"
                                type="file"
                                accept=".json"
                                className="sr-only"
                                onChange={obslugaImportuBazy}
                                aria-label={t("selectJsonFileToImport")}
                              />
                            </label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" className="border-neutral-700 text-neutral-300">
                            {t("close")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-purple-600 text-purple-400 hover:bg-purple-950/30"
                        asChild
                      >
                        <Link href="/creator" aria-label={t("goToDatabaseCreator")}>
                          <Settings className="h-3 w-3" aria-hidden="true" />
                          {t("databaseCreator")}
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-blue-600 text-blue-400 hover:bg-blue-950/30"
                        asChild
                      >
                        <Link href="/sets" aria-label={t("browseSets")}>
                          <Download className="h-3 w-3" aria-hidden="true" />
                          {t("readySets")}
                        </Link>
                      </Button>
                    </motion.div>

                    {uzyjWlasnejBazy && (
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 border-red-600 text-red-400 hover:bg-red-950/30"
                          onClick={wyczyscWlasnaBaze}
                          aria-label={t("deleteCustomDatabase")}
                        >
                          <Trash2 className="h-3 w-3" aria-hidden="true" />
                          {t("deleteDatabase")}
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  <AnimatePresence>
                    {statusWgrywania && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        role="alert"
                        aria-live="polite"
                      >
                        <Alert
                          className={
                            statusWgrywania.success
                              ? "bg-green-950/30 border-green-600"
                              : "bg-red-950/30 border-red-600"
                          }
                        >
                          <AlertDescription className={statusWgrywania.success ? "text-green-400" : "text-red-400"}>
                            {statusWgrywania.message}
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="test-type" className="space-y-6 mt-0">
                  <RadioGroup
                    value={typTestu}
                    onValueChange={(value) => setTypTestu(value as "wpisywanie" | "prawdaFalsz" | "wybor" | "mieszany")}
                    className="space-y-3"
                    aria-label={t("testType")}
                  >
                    {Object.entries(testTypes).map(([type, data]) => (
                      <div
                        key={type}
                        className={`flex items-center space-x-3 bg-neutral-800/60 backdrop-blur-sm p-3 rounded-xl cursor-pointer border ${
                          typTestu === type
                            ? "border-blue-600 bg-blue-950/20"
                            : "border-neutral-700/50 hover:border-neutral-600/50"
                        }`}
                      >
                        <RadioGroupItem
                          value={type}
                          id={type}
                          className={typTestu === type ? "text-blue-400" : "text-neutral-400"}
                          aria-label={data.title}
                        />
                        <Label htmlFor={type} className="flex items-center gap-3 cursor-pointer w-full">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${data.color} flex items-center justify-center`}
                            aria-hidden="true"
                          >
                            {data.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{data.title}</div>
                            <p className="text-xs text-neutral-400">{data.description}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>

          {/* Quiz Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-3 text-purple-400" aria-hidden="true" />
                {t("chooseQuizType")}
              </h2>

              {quizOptions.filter((option) => option.available).length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {quizOptions
                    .filter((option) => option.available)
                    .map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        whileHover={{ y: -5 }}
                        className="relative"
                      >
                        <div className="group">
                          <div
                            className="absolute inset-0 bg-gradient-to-r rounded-xl blur-sm opacity-50 group-hover:opacity-70 transition-all duration-300"
                            style={{
                              background: `linear-gradient(to right, var(--${option.color.split(" ")[0].replace("from-", "")}), var(--${option.color.split(" ")[1].replace("to-", "")}))`,
                            }}
                          />
                          <Link href={option.href} className="block relative" aria-label={option.ariaLabel}>
                            <div className="p-6 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 group-hover:border-neutral-700 transition-all duration-300">
                              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div
                                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center p-3 shrink-0`}
                                  aria-hidden="true"
                                >
                                  {option.icon}
                                </div>
                                <div className="flex-grow">
                                  <h3 className="text-xl font-bold mb-1">{option.title}</h3>
                                  <p className={`${option.textColor} opacity-90 text-sm`}>{option.description}</p>
                                </div>
                                <Button
                                  className={`bg-gradient-to-r ${option.color} hover:opacity-90 text-white gap-1 shrink-0 w-full md:w-auto mt-2 md:mt-0`}
                                >
                                  {t("start")}
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 text-center"
                >
                  <Database className="h-12 w-12 mx-auto mb-4 text-neutral-500" aria-hidden="true" />
                  <h3 className="text-lg font-medium mb-3">{t("noQuizzesAvailable")}</h3>
                  <p className="text-neutral-400 mb-6 max-w-lg mx-auto text-sm">{t("importDatabaseToStart")}</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg"
                      asChild
                    >
                      <Link href="/sets">
                        <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                        {t("downloadReadySets")}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"
                      asChild
                    >
                      <Link href="/creator">
                        <Database className="h-4 w-4 mr-2" aria-hidden="true" />
                        {t("createOwnDatabase")}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Current Settings Summary */}
              {uzyjWlasnejBazy && (
                <motion.div
                  className="mt-8 bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 rounded-xl p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-sm font-medium mb-2 flex items-center text-neutral-300">
                    <Settings className="h-4 w-4 mr-2 text-purple-400" aria-hidden="true" />
                    {t("settingsSummary")}
                  </h3>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    <li>
                      • {t("database")}: {infoWlasnejBazy?.name || t("custom")}
                    </li>
                    <li>
                      • {t("languages")}: {getLanguageName(jezykZrodlowy)} → {getLanguageName(jezykDocelowy)}
                    </li>
                    <li>
                      • {t("testType")}:{" "}
                      {typTestu === "wpisywanie"
                        ? t("typingAnswers")
                        : typTestu === "prawdaFalsz"
                          ? t("trueFalse")
                          : typTestu === "wybor"
                            ? t("multipleChoice")
                            : t("mixed")}
                    </li>
                    <li>
                      • {t("wordCount")}: {iloscSlow}
                    </li>
                    {hasSentences && (
                      <li>
                        • {t("sentenceCount")}: {iloscZdan}
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
