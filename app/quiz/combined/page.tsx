"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Eye, EyeOff, Shuffle, Trophy, Clock } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { getRandomWords, getRandomSentences } from "@/lib/quiz-data"
import { pobierzLosoweWlasneSlowa, pobierzLosoweWlasneZdania } from "@/lib/custom-database"
import { ExitQuizDialog } from "@/components/exit-dialog"
import { saveQuizResult } from "@/lib/quiz-storage"
import ParticleBackground from "@/components/particle-background"

type ElementQuizu = {
  type: "word" | "sentence"
  germanText: string
  polishText: string
  id: number
  category: string
  difficulty: "easy" | "medium" | "hard"
}

export default function CombinedQuiz() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [iloscSlow, setIloscSlow] = useState(Number.parseInt(searchParams?.get("wordCount") || "10"))
  const [iloscZdan, setIloscZdan] = useState(Number.parseInt(searchParams?.get("sentenceCount") || "5"))
  const [kierunek, setKierunek] = useState(searchParams?.get("direction") || "de-to-pl")
  const [uzyjWlasnejBazy, setUzyjWlasnejBazy] = useState(searchParams?.get("custom") === "1")
  const czyNiemieckiDoPolskiego = kierunek === "de-to-pl"
  const [typTestu, setTypTestu] = useState<"wpisywanie" | "prawdaFalsz" | "wybor" | "mieszany" | null>(null)

  const [indeksPytania, setIndeksPytania] = useState(0)
  const [odpowiedzUzytkownika, setOdpowiedzUzytkownika] = useState("")
  const [czyOdpowiedziano, setCzyOdpowiedziano] = useState(false)
  const [czyPoprawnie, setCzyPoprawnie] = useState(false)
  const [wynik, setWynik] = useState(0)
  const [pytania, setPytania] = useState<ElementQuizu[]>([])
  const [quizZakonczony, setQuizZakonczony] = useState(false)
  const [pokazOdpowiedz, setPokazOdpowiedz] = useState(false)
  const [czasStartu, setCzasStartu] = useState<number | null>(null)
  const [czasKonca, setCzasKonca] = useState<number | null>(null)
  const [animateCard, setAnimateCard] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const wordCountParam = params.get("wordCount")
      const sentenceCountParam = params.get("sentenceCount")
      const sourceParam = params.get("source") as "de" | "pl" | "en" | null
      const targetParam = params.get("target") as "de" | "pl" | "en" | null
      const customParam = params.get("custom")
      const typeParam = params.get("type") as "wpisywanie" | "prawdaFalsz" | "wybor" | "mieszany" | null

      if (wordCountParam) {
        setIloscSlow(Number.parseInt(wordCountParam, 10))
      }

      if (sentenceCountParam) {
        setIloscZdan(Number.parseInt(sentenceCountParam, 10))
      }

      if (sourceParam && targetParam) {
        setKierunek(sourceParam === "de" && targetParam === "pl" ? "de-to-pl" : "pl-to-de")
      }

      if (customParam) {
        setUzyjWlasnejBazy(customParam === "1")
      }

      if (typeParam) {
        setTypTestu(typeParam)
      }

      // Rest of the code...
    }
  }, [])

  useEffect(() => {
    let slowa
    let zdania

    if (uzyjWlasnejBazy) {
      slowa = pobierzLosoweWlasneSlowa(iloscSlow).map((slowo) => ({
        type: "word" as const,
        germanText: slowo.germanWord,
        polishText: slowo.polishTranslation,
        id: slowo.id,
        category: slowo.category,
        difficulty: slowo.difficulty,
      }))

      zdania = pobierzLosoweWlasneZdania(iloscZdan).map((zdanie) => ({
        type: "sentence" as const,
        germanText: zdanie.germanSentence,
        polishText: zdanie.polishTranslation,
        id: zdanie.id,
        category: zdanie.category,
        difficulty: zdanie.difficulty,
      }))
    } else {
      slowa = getRandomWords(iloscSlow).map((slowo) => ({
        type: "word" as const,
        germanText: slowo.germanWord,
        polishText: slowo.polishTranslation,
        id: slowo.id,
        category: slowo.category,
        difficulty: slowo.difficulty,
      }))

      zdania = getRandomSentences(iloscZdan).map((zdanie) => ({
        type: "sentence" as const,
        germanText: zdanie.germanSentence,
        polishText: zdanie.polishTranslation,
        id: zdanie.id,
        category: zdanie.category,
        difficulty: zdanie.difficulty,
      }))
    }

    const polaczone = [...slowa, ...zdania].sort(() => 0.5 - Math.random())
    setPytania(polaczone)
    setCzasStartu(Date.now())
  }, [iloscSlow, iloscZdan, uzyjWlasnejBazy])

  const aktualnePytanie = pytania[indeksPytania]

  const sprawdzOdpowiedz = () => {
    if (!odpowiedzUzytkownika.trim()) return

    let poprawna = false

    if (aktualnePytanie?.type === "word") {
      if (czyNiemieckiDoPolskiego) {
        poprawna = odpowiedzUzytkownika.toLowerCase().trim() === aktualnePytanie.polishText.toLowerCase().trim()
      } else {
        poprawna = odpowiedzUzytkownika.toLowerCase().trim() === aktualnePytanie.germanText.toLowerCase().trim()
      }
    } else {
      const odpowiedzMala = odpowiedzUzytkownika.toLowerCase().trim()
      const poprawnaOdpowiedzMala = czyNiemieckiDoPolskiego
        ? aktualnePytanie?.polishText.toLowerCase()
        : aktualnePytanie?.germanText.toLowerCase()

      const poprawneSlowa = poprawnaOdpowiedzMala.split(/\s+/)
      const slowaUzytkownika = odpowiedzMala.split(/\s+/)

      let liczbaDopasowan = 0
      poprawneSlowa.forEach((slowo) => {
        if (
          slowaUzytkownika.some(
            (slowoUzytkownika) =>
              slowoUzytkownika === slowo || slowoUzytkownika.includes(slowo) || slowo.includes(slowoUzytkownika),
          )
        ) {
          liczbaDopasowan++
        }
      })

      const procentDopasowania = (liczbaDopasowan / poprawneSlowa.length) * 100
      poprawna = procentDopasowania >= 60
    }

    setCzyPoprawnie(poprawna)
    setCzyOdpowiedziano(true)

    if (poprawna) {
      setWynik(wynik + 1)
    }
  }

  const nastepnePytanie = () => {
    setAnimateCard(true)
    setTimeout(() => {
      if (indeksPytania < pytania.length - 1) {
        setIndeksPytania(indeksPytania + 1)
        setOdpowiedzUzytkownika("")
        setCzyOdpowiedziano(false)
        setPokazOdpowiedz(false)
      } else {
        setQuizZakonczony(true)
        setCzasKonca(Date.now())
      }
      setAnimateCard(false)
    }, 300)
  }

  const restartujQuiz = () => {
    let slowa
    let zdania

    if (uzyjWlasnejBazy) {
      slowa = pobierzLosoweWlasneSlowa(iloscSlow).map((slowo) => ({
        type: "word" as const,
        germanText: slowo.germanWord,
        polishText: slowo.polishTranslation,
        id: slowo.id,
        category: slowo.category,
        difficulty: slowo.difficulty,
      }))

      zdania = pobierzLosoweWlasneZdania(iloscZdan).map((zdanie) => ({
        type: "sentence" as const,
        germanText: zdanie.germanSentence,
        polishText: zdanie.polishTranslation,
        id: zdanie.id,
        category: zdanie.category,
        difficulty: zdanie.difficulty,
      }))
    } else {
      slowa = getRandomWords(iloscSlow).map((slowo) => ({
        type: "word" as const,
        germanText: slowo.germanWord,
        polishText: slowo.polishTranslation,
        id: slowo.id,
        category: slowo.category,
        difficulty: slowo.difficulty,
      }))

      zdania = getRandomSentences(iloscZdan).map((zdanie) => ({
        type: "sentence" as const,
        germanText: zdanie.germanSentence,
        polishText: zdanie.polishTranslation,
        id: zdanie.id,
        category: zdanie.category,
        difficulty: zdanie.difficulty,
      }))
    }

    const polaczone = [...slowa, ...zdania].sort(() => 0.5 - Math.random())
    setPytania(polaczone)

    setIndeksPytania(0)
    setOdpowiedzUzytkownika("")
    setCzyOdpowiedziano(false)
    setCzyPoprawnie(false)
    setWynik(0)
    setQuizZakonczony(false)
    setPokazOdpowiedz(false)
    setCzasStartu(Date.now())
    setCzasKonca(null)
  }

  useEffect(() => {
    if (quizZakonczony && czasStartu && czasKonca) {
      const czas = Math.round((czasKonca - czasStartu) / 1000)

      saveQuizResult({
        type: "combined",
        direction: kierunek as "de-to-pl" | "pl-to-de",
        score: wynik,
        total: pytania.length,
        percentage: Math.round((wynik / pytania.length) * 100),
        duration: czas,
      })
    }
  }, [quizZakonczony, czasStartu, czasKonca, wynik, pytania.length, kierunek])

  if (pytania.length === 0) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 text-white">
        <ParticleBackground />
        <div className="container flex justify-center items-center min-h-[70vh] relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center"
          >
            <Shuffle className="h-12 w-12 text-cyan-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ładowanie quizu...</h2>
            <p className="text-neutral-400">Przygotowujemy mieszany zestaw pytań dla Ciebie</p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (quizZakonczony) {
    const czasTrwania = czasKonca && czasStartu ? Math.round((czasKonca - czasStartu) / 1000) : 0
    const minuty = Math.floor(czasTrwania / 60)
    const sekundy = czasTrwania % 60
    const procentWyniku = Math.round((wynik / pytania.length) * 100)

    return (
      <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 text-white">
        <ParticleBackground />
        <div className="container max-w-md mx-auto py-10 px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="glass-card border-0 shadow-glow-blue overflow-hidden">
              <CardHeader className="pb-0">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
                <CardTitle className="text-center text-2xl md:text-3xl glow-text-white">
                  Wyniki quizu mieszanego
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-6">
                <motion.div
                  className="text-6xl md:text-7xl font-bold mb-4 glow-text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {wynik}/{pytania.length}
                </motion.div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="relative h-3 mb-6 bg-neutral-800 rounded-full overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full ${
                      procentWyniku > 80
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : procentWyniku > 50
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-gradient-to-r from-red-500 to-orange-500"
                    }`}
                    style={{ width: `${procentWyniku}%` }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-xl mb-2">
                    {procentWyniku === 100
                      ? "Doskonale! Opanowałeś zarówno słowa, jak i zdania!"
                      : procentWyniku > 80
                        ? "Świetna robota! Masz doskonałe wyczucie języka."
                        : procentWyniku > 50
                          ? "Dobra robota! Kontynuuj ćwiczenia, aby dalej się doskonalić."
                          : "Kontynuuj ćwiczenia, aby poprawić swoje umiejętności języka."}
                  </p>
                  <div className="flex justify-center gap-6 text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span>
                        {minuty}m {sekundy}s
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shuffle className="h-4 w-4 text-blue-400" />
                      <span>{procentWyniku}% poprawnych</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-4 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Button
                    onClick={restartujQuiz}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full px-6"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Rozpocznij ponownie
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="rounded-full border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  >
                    Powrót do strony głównej
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  const wyswietlanyTekst = czyNiemieckiDoPolskiego ? aktualnePytanie?.germanText : aktualnePytanie?.polishText

  const poprawnaOdpowiedz = czyNiemieckiDoPolskiego ? aktualnePytanie?.polishText : aktualnePytanie?.germanText

  const tekstPlaceholder = czyNiemieckiDoPolskiego ? "Wpisz polskie tłumaczenie..." : "Wpisz niemieckie tłumaczenie..."

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 dark:text-white text-neutral-900">
      <ParticleBackground />
      <div className="container max-w-md mx-auto py-10 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-300">
              Pytanie {indeksPytania + 1} z {pytania.length}
            </span>
            <span className="text-sm font-medium text-cyan-400">
              Wynik: {wynik}/{indeksPytania}
            </span>
          </div>
          <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
              initial={{ width: `${(indeksPytania / pytania.length) * 100}%` }}
              animate={{ width: `${((indeksPytania + 1) / pytania.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-end mt-2">
            <ExitQuizDialog />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={indeksPytania}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`glass-card border-0 shadow-glow-blue overflow-hidden ${animateCard ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium px-3 py-1 bg-cyan-950/30 text-cyan-300 rounded-full border border-cyan-800/50">
                    {aktualnePytanie?.type === "word" ? "Słowo" : "Zdanie"}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 bg-blue-950/30 text-blue-300 rounded-full border border-blue-800/50">
                    {czyNiemieckiDoPolskiego ? "Niemiecki → Polski" : "Polski → Niemiecki"}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 bg-purple-950/30 text-purple-300 rounded-full border border-purple-800/50">
                    {aktualnePytanie?.difficulty === "easy"
                      ? "łatwy"
                      : aktualnePytanie?.difficulty === "medium"
                        ? "średni"
                        : "trudny"}
                  </span>
                </div>
                <CardTitle className="text-center text-2xl mt-4 mb-2 glow-text-white">{wyswietlanyTekst}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aktualnePytanie?.type === "word" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Input
                      type="text"
                      placeholder={tekstPlaceholder}
                      value={odpowiedzUzytkownika}
                      onChange={(e) => setOdpowiedzUzytkownika(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !czyOdpowiedziano) {
                          sprawdzOdpowiedz()
                        }
                      }}
                      disabled={czyOdpowiedziano}
                      className="w-full bg-neutral-800/50 border-neutral-700 focus:border-blue-500 text-lg py-6"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Textarea
                      placeholder={tekstPlaceholder}
                      value={odpowiedzUzytkownika}
                      onChange={(e) => setOdpowiedzUzytkownika(e.target.value)}
                      disabled={czyOdpowiedziano}
                      className="min-h-[120px] bg-neutral-800/50 border-neutral-700 focus:border-blue-500 text-lg"
                    />
                  </motion.div>
                )}

                {czyOdpowiedziano && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-neutral-300">Poprawna odpowiedź:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPokazOdpowiedz(!pokazOdpowiedz)}
                        className="h-8 px-2 text-neutral-300 hover:text-white hover:bg-neutral-800/50"
                      >
                        {pokazOdpowiedz ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                        {pokazOdpowiedz ? "Ukryj" : "Pokaż"}
                      </Button>
                    </div>
                    {pokazOdpowiedz && (
                      <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700 text-white">
                        {poprawnaOdpowiedz}
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {czyOdpowiedziano && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full"
                  >
                    <Alert
                      className={
                        czyPoprawnie
                          ? "bg-green-950/30 border border-green-800/50 text-green-400"
                          : "bg-red-950/30 border border-red-800/50 text-red-400"
                      }
                    >
                      <AlertDescription className="flex items-center gap-2">
                        {czyPoprawnie ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            <span>Poprawnie! Świetna robota.</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-400" />
                            <span>Niepoprawnie. Sprawdź poprawną odpowiedź.</span>
                          </>
                        )}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <motion.div
                  className="flex w-full justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {!czyOdpowiedziano ? (
                    <Button
                      onClick={sprawdzOdpowiedz}
                      disabled={!odpowiedzUzytkownika.trim()}
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full"
                    >
                      Sprawdź odpowiedź
                    </Button>
                  ) : (
                    <Button
                      onClick={nastepnePytanie}
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full gap-1"
                    >
                      {indeksPytania < pytania.length - 1 ? "Następne" : "Zobacz wyniki"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
