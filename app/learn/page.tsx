"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type WordItem, type SentenceItem, getWordInLanguage, getSentenceInLanguage } from "@/lib/quiz-data"
import { Search, SortAsc, SortDesc, BookOpen, MessageSquare, CreditCard, BookOpenCheck, Lightbulb } from "lucide-react"
import { Flashcards } from "@/components/flashcards"
import {
  czyIstniejeWlasnaBaze,
  pobierzWlasneSlowa,
  pobierzWlasneZdania,
  pobierzWlasnaBaze,
} from "@/lib/custom-database"
import ParticleBackground from "@/components/particle-background"

export default function LearnPage() {
  const [slowa, setSlowa] = useState<WordItem[]>([])
  const [przefiltrowaneSłowa, setPrzefiltrowaneSłowa] = useState<WordItem[]>([])
  const [wyszukiwanieSlowa, setWyszukiwanieSlowa] = useState("")
  const [sortowanieSlowa, setSortowanieSlowa] = useState<"source" | "target" | "category" | "difficulty">("source")
  const [kierunekSortowaniaSlowa, setKierunekSortowaniaSlowa] = useState<"asc" | "desc">("asc")
  const [kategoriaSlowa, setKategoriaSlowa] = useState<string>("all")

  const [zdania, setZdania] = useState<SentenceItem[]>([])
  const [przefiltrowanZdania, setPrzefiltrowanZdania] = useState<SentenceItem[]>([])
  const [wyszukiwanieZdania, setWyszukiwanieZdania] = useState("")
  const [sortowanieZdania, setSortowanieZdania] = useState<"source" | "target" | "category" | "difficulty">("source")
  const [kierunekSortowaniaZdania, setKierunekSortowaniaZdania] = useState<"asc" | "desc">("asc")
  const [kategoriaZdania, setKategoriaZdania] = useState<string>("all")

  const [uzyjWlasnejBazy, setUzyjWlasnejBazy] = useState(false)
  const [maSentences, setMaSentences] = useState(true)
  const [sourceLanguage, setSourceLanguage] = useState<string>("de")
  const [targetLanguage, setTargetLanguage] = useState<string>("pl")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const maWlasnaBaze = czyIstniejeWlasnaBaze()
    setUzyjWlasnejBazy(maWlasnaBaze)

    if (maWlasnaBaze) {
      const wlasnaBaza = pobierzWlasnaBaze()
      if (wlasnaBaza) {
        // Set source language from database
        const sourceLanguage = wlasnaBaza.languages?.[0] || "de"
        const targetLanguage = wlasnaBaza.languages?.[1] || "pl"

        setSourceLanguage(sourceLanguage)
        setTargetLanguage(targetLanguage)

        const wlasneSlowa = pobierzWlasneSlowa()
        const wlasneZdania = pobierzWlasneZdania()

        setSlowa(wlasneSlowa)
        setZdania(wlasneZdania)
        setPrzefiltrowaneSłowa(wlasneSlowa)
        setPrzefiltrowanZdania(wlasneZdania)
        setMaSentences(wlasneZdania.length > 0)
      }
    } else {
      // No custom database, set empty arrays
      setSourceLanguage("de")
      setTargetLanguage("pl")
      setSlowa([])
      setZdania([])
      setPrzefiltrowaneSłowa([])
      setPrzefiltrowanZdania([])
      setMaSentences(false)
    }

    setIsLoading(false)
  }, [])

  const kategorieSlowa = useMemo(
    () => ["all", ...new Set((uzyjWlasnejBazy ? pobierzWlasneSlowa() : []).map((word) => word.category))],
    [uzyjWlasnejBazy],
  )

  const kategorieZdania = useMemo(
    () => ["all", ...new Set((uzyjWlasnejBazy ? pobierzWlasneZdania() : []).map((sentence) => sentence.category))],
    [uzyjWlasnejBazy],
  )

  useEffect(() => {
    let wynik = [...slowa]

    if (kategoriaSlowa !== "all") {
      wynik = wynik.filter((slowo) => slowo.category === kategoriaSlowa)
    }

    if (wyszukiwanieSlowa) {
      const zapytanie = wyszukiwanieSlowa.toLowerCase()
      wynik = wynik.filter((slowo) => {
        const sourceText = getWordInLanguage(slowo, sourceLanguage).toLowerCase()
        const targetText = getWordInLanguage(slowo, targetLanguage).toLowerCase()
        return sourceText.includes(zapytanie) || targetText.includes(zapytanie)
      })
    }

    wynik.sort((a, b) => {
      let poleA, poleB

      if (sortowanieSlowa === "source") {
        poleA = getWordInLanguage(a, sourceLanguage).toLowerCase()
        poleB = getWordInLanguage(b, sourceLanguage).toLowerCase()
      } else if (sortowanieSlowa === "target") {
        poleA = getWordInLanguage(a, targetLanguage).toLowerCase()
        poleB = getWordInLanguage(b, targetLanguage).toLowerCase()
      } else {
        poleA = String(a[sortowanieSlowa]).toLowerCase()
        poleB = String(b[sortowanieSlowa]).toLowerCase()
      }

      if (kierunekSortowaniaSlowa === "asc") {
        return poleA.localeCompare(poleB)
      } else {
        return poleB.localeCompare(poleA)
      }
    })

    setPrzefiltrowaneSłowa(wynik)
  }, [
    slowa,
    wyszukiwanieSlowa,
    sortowanieSlowa,
    kierunekSortowaniaSlowa,
    kategoriaSlowa,
    sourceLanguage,
    targetLanguage,
  ])

  useEffect(() => {
    let wynik = [...zdania]

    if (kategoriaZdania !== "all") {
      wynik = wynik.filter((zdanie) => zdanie.category === kategoriaZdania)
    }

    if (wyszukiwanieZdania) {
      const zapytanie = wyszukiwanieZdania.toLowerCase()
      wynik = wynik.filter((zdanie) => {
        const sourceText = getSentenceInLanguage(zdanie, sourceLanguage).toLowerCase()
        const targetText = getSentenceInLanguage(zdanie, targetLanguage).toLowerCase()
        return sourceText.includes(zapytanie) || targetText.includes(zapytanie)
      })
    }

    wynik.sort((a, b) => {
      let poleA, poleB

      if (sortowanieZdania === "source") {
        poleA = getSentenceInLanguage(a, sourceLanguage).toLowerCase()
        poleB = getSentenceInLanguage(b, sourceLanguage).toLowerCase()
      } else if (sortowanieZdania === "target") {
        poleA = getSentenceInLanguage(a, targetLanguage).toLowerCase()
        poleB = getSentenceInLanguage(b, targetLanguage).toLowerCase()
      } else {
        poleA = String(a[sortowanieZdania]).toLowerCase()
        poleB = String(b[sortowanieZdania]).toLowerCase()
      }

      if (kierunekSortowaniaZdania === "asc") {
        return poleA.localeCompare(poleB)
      } else {
        return poleB.localeCompare(poleA)
      }
    })

    setPrzefiltrowanZdania(wynik)
  }, [
    zdania,
    wyszukiwanieZdania,
    sortowanieZdania,
    kierunekSortowaniaZdania,
    kategoriaZdania,
    sourceLanguage,
    targetLanguage,
  ])

  const przelaczKierunekSortowaniaSlowa = () => {
    setKierunekSortowaniaSlowa(kierunekSortowaniaSlowa === "asc" ? "desc" : "asc")
  }

  const przelaczKierunekSortowaniaZdania = () => {
    setKierunekSortowaniaZdania(kierunekSortowaniaZdania === "asc" ? "desc" : "asc")
  }

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 text-white">
        <ParticleBackground />
        <div className="container flex justify-center items-center min-h-[70vh] relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center"
          >
            <BookOpenCheck className="h-12 w-12 text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ładowanie materiałów...</h2>
            <p className="text-neutral-400">Przygotowujemy materiały do nauki</p>
          </motion.div>
        </div>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 dark:text-white text-neutral-900">
      <ParticleBackground />
      <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-8 glow-text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Materiały do{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">nauki</span>
        </motion.h1>

        <Tabs defaultValue="words" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-neutral-900/50 p-1 rounded-xl">
            <TabsTrigger
              value="words"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Słowa ({przefiltrowaneSłowa.length})
            </TabsTrigger>
            {maSentences && (
              <TabsTrigger
                value="sentences"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg py-3"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Zdania ({przefiltrowanZdania.length})
              </TabsTrigger>
            )}
            <TabsTrigger
              value="flashcards"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-lg py-3"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Fiszki
            </TabsTrigger>
          </TabsList>

          {przefiltrowaneSłowa.length === 0 && przefiltrowanZdania.length === 0 && (
            <motion.div
              className="text-center py-16 glass-card rounded-xl mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <BookOpen className="h-16 w-16 mx-auto mb-6 text-neutral-500" />
              <h3 className="text-2xl text-neutral-300 mb-3">Brak materiałów do nauki</h3>
              <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                Nie znaleziono żadnych słów ani zdań. Dodaj własne materiały w kreatorze bazy danych.
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => (window.location.href = "/creator")}
              >
                Przejdź do kreatora
              </Button>
            </motion.div>
          )}

          <TabsContent value="words">
            <motion.div className="flex flex-col gap-6" variants={container} initial="hidden" animate="show">
              <motion.div variants={item} className="glass-card p-6 rounded-xl mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      type="search"
                      placeholder="Szukaj słów..."
                      className="pl-10 bg-neutral-800/50 border-neutral-700 focus:border-blue-500"
                      value={wyszukiwanieSlowa}
                      onChange={(e) => setWyszukiwanieSlowa(e.target.value)}
                    />
                  </div>

                  <div>
                    <Select value={kategoriaSlowa} onValueChange={setKategoriaSlowa}>
                      <SelectTrigger className="bg-neutral-800/50 border-neutral-700">
                        <SelectValue placeholder="Wybierz kategorię" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        {kategorieSlowa.map((kategoria) => (
                          <SelectItem key={kategoria} value={kategoria} className="text-white">
                            {kategoria === "all" ? "Wszystkie kategorie" : kategoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Select value={sortowanieSlowa} onValueChange={(value: any) => setSortowanieSlowa(value)}>
                      <SelectTrigger className="flex-1 bg-neutral-800/50 border-neutral-700">
                        <SelectValue placeholder="Sortuj według" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        <SelectItem value="source" className="text-white">
                          {sourceLanguage === "en" ? "Słowo angielskie" : "Słowo niemieckie"}
                        </SelectItem>
                        <SelectItem value="target" className="text-white">
                          Tłumaczenie polskie
                        </SelectItem>
                        <SelectItem value="category" className="text-white">
                          Kategoria
                        </SelectItem>
                        <SelectItem value="difficulty" className="text-white">
                          Trudność
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={przelaczKierunekSortowaniaSlowa}
                      className="bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-700/50"
                    >
                      {kierunekSortowaniaSlowa === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {przefiltrowaneSłowa.map((slowo) => (
                    <motion.div
                      key={slowo.id}
                      variants={item}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Card className="glass-card border-0 overflow-hidden hover:shadow-glow-blue transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-xl text-blue-300">
                              {getWordInLanguage(slowo, sourceLanguage)}
                            </div>
                            <div className="text-xs px-3 py-1 rounded-full bg-blue-950/30 text-blue-300 border border-blue-800/50">
                              {slowo.difficulty === "easy"
                                ? "łatwy"
                                : slowo.difficulty === "medium"
                                  ? "średni"
                                  : "trudny"}
                            </div>
                          </div>
                          <div className="text-white">{getWordInLanguage(slowo, targetLanguage)}</div>
                          <div className="mt-3 text-xs text-neutral-400 flex items-center">
                            <Lightbulb className="h-3 w-3 mr-1" />
                            Kategoria: {slowo.category}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {przefiltrowaneSłowa.length === 0 && (
                <motion.div
                  className="text-center py-12 glass-card rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Search className="h-12 w-12 mx-auto mb-4 text-neutral-500" />
                  <p className="text-xl text-neutral-300 mb-2">Nie znaleziono słów</p>
                  <p className="text-neutral-400">Spróbuj zmienić kryteria wyszukiwania</p>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="sentences">
            <motion.div className="flex flex-col gap-6" variants={container} initial="hidden" animate="show">
              <motion.div variants={item} className="glass-card p-6 rounded-xl mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      type="search"
                      placeholder="Szukaj zdań..."
                      className="pl-10 bg-neutral-800/50 border-neutral-700 focus:border-purple-500"
                      value={wyszukiwanieZdania}
                      onChange={(e) => setWyszukiwanieZdania(e.target.value)}
                    />
                  </div>

                  <div>
                    <Select value={kategoriaZdania} onValueChange={setKategoriaZdania}>
                      <SelectTrigger className="bg-neutral-800/50 border-neutral-700">
                        <SelectValue placeholder="Wybierz kategorię" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        {kategorieZdania.map((kategoria) => (
                          <SelectItem key={kategoria} value={kategoria} className="text-white">
                            {kategoria === "all" ? "Wszystkie kategorie" : kategoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Select value={sortowanieZdania} onValueChange={(value: any) => setSortowanieZdania(value)}>
                      <SelectTrigger className="flex-1 bg-neutral-800/50 border-neutral-700">
                        <SelectValue placeholder="Sortuj według" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        <SelectItem value="source" className="text-white">
                          {sourceLanguage === "en" ? "Zdanie angielskie" : "Zdanie niemieckie"}
                        </SelectItem>
                        <SelectItem value="target" className="text-white">
                          Tłumaczenie polskie
                        </SelectItem>
                        <SelectItem value="category" className="text-white">
                          Kategoria
                        </SelectItem>
                        <SelectItem value="difficulty" className="text-white">
                          Trudność
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={przelaczKierunekSortowaniaZdania}
                      className="bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-700/50"
                    >
                      {kierunekSortowaniaZdania === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={container} className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                  {przefiltrowanZdania.map((zdanie) => (
                    <motion.div
                      key={zdanie.id}
                      variants={item}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Card className="glass-card border-0 overflow-hidden hover:shadow-glow-purple transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div className="font-medium text-lg text-purple-300">
                              {getSentenceInLanguage(zdanie, sourceLanguage)}
                            </div>
                            <div className="text-xs px-3 py-1 rounded-full bg-purple-950/30 text-purple-300 border border-purple-800/50 ml-2 shrink-0">
                              {zdanie.difficulty === "easy"
                                ? "łatwy"
                                : zdanie.difficulty === "medium"
                                  ? "średni"
                                  : "trudny"}
                            </div>
                          </div>
                          <div className="text-white">{getSentenceInLanguage(zdanie, targetLanguage)}</div>
                          <div className="mt-3 text-xs text-neutral-400 flex items-center">
                            <Lightbulb className="h-3 w-3 mr-1" />
                            Kategoria: {zdanie.category}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {przefiltrowanZdania.length === 0 && (
                <motion.div
                  className="text-center py-12 glass-card rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Search className="h-12 w-12 mx-auto mb-4 text-neutral-500" />
                  <p className="text-xl text-neutral-300 mb-2">Nie znaleziono zdań</p>
                  <p className="text-neutral-400">Spróbuj zmienić kryteria wyszukiwania</p>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="flashcards">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-xl"
            >
              <Flashcards />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
