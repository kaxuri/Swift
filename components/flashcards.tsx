"use client"

import { useState, useEffect } from "react"
import { motion, type PanInfo } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { getWordInLanguage, getSentenceInLanguage } from "@/lib/quiz-data"
import {
  pobierzWlasneSlowa,
  pobierzWlasneZdania,
  czyIstniejeWlasnaBaze,
  pobierzWlasnaBaze,
} from "@/lib/custom-database"
import {
  Shuffle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Repeat,
  BookOpen,
  MessageSquare,
  PlusCircle,
} from "lucide-react"

type FlashcardItem = {
  id: number
  source: string
  target: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  type: "word" | "sentence"
  status: "unknown" | "learning" | "known"
}

export function Flashcards() {
  const [items, setItems] = useState<FlashcardItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useState(0)
  const [type, setType] = useState<"words" | "sentences" | "both">("words")
  const [sourceLanguage, setSourceLanguage] = useState<string>("de")
  const [targetLanguage, setTargetLanguage] = useState<string>("pl")
  const [uzyjWlasnejBazy, setUzyjWlasnejBazy] = useState(false)
  const [hasData, setHasData] = useState(false)

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
      }
    }

    loadItems()
  }, [type])

  const loadItems = () => {
    let newItems: FlashcardItem[] = []
    let hasAnyData = false

    if (type === "words" || type === "both") {
      const words = pobierzWlasneSlowa()
      if (words.length > 0) {
        hasAnyData = true
        const wordItems = words.map((word) => ({
          id: word.id,
          source: getWordInLanguage(word, sourceLanguage),
          target: getWordInLanguage(word, targetLanguage),
          category: word.category,
          difficulty: word.difficulty,
          type: "word" as const,
          status: "unknown" as const,
        }))
        newItems = [...newItems, ...wordItems]
      }
    }

    if (type === "sentences" || type === "both") {
      const sentences = pobierzWlasneZdania()
      if (sentences.length > 0) {
        hasAnyData = true
        const sentenceItems = sentences.map((sentence) => ({
          id: sentence.id,
          source: getSentenceInLanguage(sentence, sourceLanguage),
          target: getSentenceInLanguage(sentence, targetLanguage),
          category: sentence.category,
          difficulty: sentence.difficulty,
          type: "sentence" as const,
          status: "unknown" as const,
        }))
        newItems = [...newItems, ...sentenceItems]
      }
    }

    setHasData(hasAnyData)

    // Shuffle the items if there are any
    if (newItems.length > 0) {
      newItems.sort(() => Math.random() - 0.5)
    }

    setItems(newItems)
    setCurrentIndex(0)
    setFlipped(false)
    updateProgress(0, newItems.length)
  }

  const updateProgress = (current: number, total: number) => {
    setProgress(total > 0 ? (current / total) * 100 : 0)
  }

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
      updateProgress(currentIndex + 1, items.length)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
      updateProgress(currentIndex - 1, items.length)
    }
  }

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  const handleShuffle = () => {
    const shuffledItems = [...items].sort(() => Math.random() - 0.5)
    setItems(shuffledItems)
    setCurrentIndex(0)
    setFlipped(false)
    updateProgress(0, items.length)
  }

  const handleReset = () => {
    loadItems()
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      // Swiped right - mark as known
      const newItems = [...items]
      newItems[currentIndex].status = "known"
      setItems(newItems)
      handleNext()
    } else if (info.offset.x < -100) {
      // Swiped left - mark as learning
      const newItems = [...items]
      newItems[currentIndex].status = "learning"
      setItems(newItems)
      handleNext()
    }
  }

  const currentItem = items[currentIndex]

  // No data available at all
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Brak materiałów do nauki</h3>
        <p className="text-neutral-400 mb-6">
          Nie znaleziono żadnych słów ani zdań w bazie danych. Dodaj własne materiały, aby rozpocząć naukę z fiszkami.
        </p>
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
          onClick={() => (window.location.href = "/creator")}
        >
          <PlusCircle className="h-4 w-4" />
          Dodaj materiały
        </Button>
      </div>
    )
  }

  // Has data but no items for the selected type
  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Brak dostępnych fiszek</h3>
        <p className="text-neutral-400 mb-6">Wybierz typ fiszek i kliknij przycisk "Załaduj fiszki"</p>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <Select value={type} onValueChange={(value: "words" | "sentences" | "both") => setType(value)}>
            <SelectTrigger className="bg-neutral-800/50 border-neutral-700">
              <SelectValue placeholder="Wybierz typ fiszek" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700">
              <SelectItem value="words" className="text-white">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Słowa
                </div>
              </SelectItem>
              <SelectItem value="sentences" className="text-white">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Zdania
                </div>
              </SelectItem>
              <SelectItem value="both" className="text-white">
                <div className="flex items-center">
                  <Repeat className="h-4 w-4 mr-2" />
                  Słowa i zdania
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleReset} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Załaduj fiszki
          </Button>
        </div>
      </div>
    )
  }

  const statusColor =
    currentItem.status === "known"
      ? "bg-green-500/20 border-green-500/50 text-green-400"
      : currentItem.status === "learning"
        ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
        : "bg-blue-500/20 border-blue-500/50 text-blue-400"

  const difficultyColor =
    currentItem.difficulty === "easy"
      ? "bg-green-500/20 border-green-500/50 text-green-400"
      : currentItem.difficulty === "medium"
        ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
        : "bg-red-500/20 border-red-500/50 text-red-400"

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-400">
            {currentIndex + 1} z {items.length}
          </span>
          <div className="flex gap-2">
            <Select value={type} onValueChange={(value: "words" | "sentences" | "both") => setType(value)}>
              <SelectTrigger className="h-8 px-3 text-xs bg-neutral-800/50 border-neutral-700">
                <SelectValue placeholder="Typ" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-700">
                <SelectItem value="words" className="text-white">
                  <div className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Słowa
                  </div>
                </SelectItem>
                <SelectItem value="sentences" className="text-white">
                  <div className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Zdania
                  </div>
                </SelectItem>
                <SelectItem value="both" className="text-white">
                  <div className="flex items-center">
                    <Repeat className="h-3 w-3 mr-1" />
                    Słowa i zdania
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShuffle}
              className="h-8 px-3 bg-neutral-800/50 border-neutral-700"
            >
              <Shuffle className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-8 px-3 bg-neutral-800/50 border-neutral-700"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <Progress
          value={progress}
          className="h-1 bg-neutral-800"
          indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>

      <motion.div
        className="w-full max-w-md perspective-1000"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          className="w-full relative preserve-3d cursor-pointer"
          onClick={handleFlip}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card border-0 overflow-hidden backface-hidden">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`text-xs px-3 py-1 rounded-full border ${statusColor}`}>
                  {currentItem.status === "known" ? "Znane" : currentItem.status === "learning" ? "Uczę się" : "Nowe"}
                </div>
                <div className={`text-xs px-3 py-1 rounded-full border ${difficultyColor}`}>
                  {currentItem.difficulty === "easy"
                    ? "Łatwe"
                    : currentItem.difficulty === "medium"
                      ? "Średnie"
                      : "Trudne"}
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="text-sm text-neutral-400 mb-2">
                  {currentItem.type === "word" ? "Słowo" : "Zdanie"} ({currentItem.category})
                </div>
                <div className="text-2xl font-bold">{currentItem.source}</div>
              </div>
              <div className="text-center text-neutral-400 text-sm">Kliknij, aby zobaczyć tłumaczenie</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 overflow-hidden backface-hidden absolute top-0 left-0 w-full h-full rotateY-180">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`text-xs px-3 py-1 rounded-full border ${statusColor}`}>
                  {currentItem.status === "known" ? "Znane" : currentItem.status === "learning" ? "Uczę się" : "Nowe"}
                </div>
                <div className={`text-xs px-3 py-1 rounded-full border ${difficultyColor}`}>
                  {currentItem.difficulty === "easy"
                    ? "Łatwe"
                    : currentItem.difficulty === "medium"
                      ? "Średnie"
                      : "Trudne"}
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="text-sm text-neutral-400 mb-2">Tłumaczenie</div>
                <div className="text-2xl font-bold">{currentItem.target}</div>
              </div>
              <div className="text-center text-neutral-400 text-sm">Kliknij, aby wrócić</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === items.length - 1}
          className="bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700/50"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-8 text-center text-sm text-neutral-400">
        <p>Przesuń kartę w prawo, aby oznaczyć jako znane</p>
        <p>Przesuń kartę w lewo, aby oznaczyć jako "uczę się"</p>
      </div>
    </div>
  )
}
