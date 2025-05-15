"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Eye, EyeOff, MessageSquare, Trophy, Clock } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { getRandomSentences } from "@/lib/quiz-data"
import { pobierzLosoweWlasneZdania } from "@/lib/custom-database"
import { ExitQuizDialog } from "@/components/exit-dialog"
import { saveQuizResult } from "@/lib/quiz-storage"
import ParticleBackground from "@/components/particle-background"

export default function SentencesQuiz() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [iloscPytan, setIloscPytan] = useState(5)
  const [kierunek, setKierunek] = useState<"de-to-pl" | "pl-to-de">("de-to-pl")
  const [uzyjWlasnejBazy, setUzyjWlasnejBazy] = useState(false)
  const [typTestu, setTypTestu] = useState<"wpisywanie" | "prawdaFalsz" | "wybor" | "mieszany">("wpisywanie")
  const czyNiemieckiDoPolskiego = kierunek === "de-to-pl"

  const [indeksPytania, setIndeksPytania] = useState(0)
  const [odpowiedzUzytkownika, setOdpowiedzUzytkownika] = useState("")
  const [czyOdpowiedziano, setCzyOdpowiedziano] = useState(false)
  const [czyPoprawnie, setCzyPoprawnie] = useState(false)
  const [wynik, setWynik] = useState(0)
  const [pytania, setPytania] = useState([])
  const [quizZakonczony, setQuizZakonczony] = useState(false)
  const [pokazOdpowiedz, setPokazOdpowiedz] = useState(false)
  const [czasStartu, setCzasStartu] = useState<number | null>(null)
  const [czasKonca, setCzasKonca] = useState<number | null>(null)
  const [animateCard, setAnimateCard] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const countParam = params.get("count")
      const sourceParam = params.get("source") as "de" | "pl" | "en" | null
      const targetParam = params.get("target") as "de" | "pl" | "en" | null
      const customParam = params.get("custom")
      const typeParam = params.get("type") as "wpisywanie" | "prawdaFalsz" | "wybor" | "mieszany" | null

      if (countParam) {
        setIloscPytan(Number.parseInt(countParam, 10))
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
    if (uzyjWlasnejBazy) {
      setPytania(pobierzLosoweWlasneZdania(iloscPytan))
    } else {
      setPytania(getRandomSentences(iloscPytan))
    }
    setCzasStartu(Date.now())
  }, [iloscPytan, uzyjWlasnejBazy])

  const aktualnePytanie = pytania[indeksPytania]

  const sprawdzOdpowiedz = () => {
    if (!odpowiedzUzytkownika.trim()) return

    let poprawna = false

    if (czyNiemieckiDoPolskiego) {
      const odpowiedzMala = odpowiedzUzytkownika.toLowerCase().trim()
      const poprawnaOdpowiedzMala = aktualnePytanie?.polishTranslation.toLowerCase()

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
    } else {
      const odpowiedzMala = odpowiedzUzytkownika.toLowerCase().trim()
      const poprawnaOdpowiedzMala = aktualnePytanie?.germanSentence.toLowerCase()

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
    if (uzyjWlasnejBazy) {
      setPytania(pobierzLosoweWlasneZdania(iloscPytan))
    } else {
      setPytania(getRandomSentences(iloscPytan))
    }
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
        type: "sentences",
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
      <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 dark:text-white text-neutral-900">
        <ParticleBackground />
        <div className="container flex justify-center items-center min-h-[70vh] relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center"
          >
            <MessageSquare className="h-12 w-12 text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ładowanie quizu...</h2>
            <p className="text-neutral-400">Przygotowujemy zdania dla Ciebie</p>
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
      <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 dark:text-white text-neutral-900">
        <ParticleBackground />
        <div className="container max-w-md mx-auto py-10 px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="glass-card border-0 shadow-glow-purple overflow-hidden">
              <CardHeader className="pb-0">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
                <CardTitle className="text-center text-2xl md:text-3xl glow-text-white">
                  Wyniki quizu ze zdaniami
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
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
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
                      ? "Doskonale! Twoje umiejętności tłumaczenia zdań są świetne!"
                      : procentWyniku > 80
                        ? "Świetna robota! Masz doskonałe wyczucie języka."
                        : procentWyniku > 50
                          ? "Dobra robota! Kontynuuj ćwiczenia, aby poprawić swoje tłumaczenia zdań."
                          : "Kontynuuj ćwiczenia, aby poprawić swoje umiejętności zdań."}
                  </p>
                  <div className="flex justify-center gap-6 text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span>
                        {minuty}m {sekundy}s
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-pink-400" />
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
                    className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6"
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

  const wyswietlanyTekst = czyNiemieckiDoPolskiego
    ? aktualnePytanie?.germanSentence
    : aktualnePytanie?.polishTranslation

  const poprawnaOdpowiedz = czyNiemieckiDoPolskiego
    ? aktualnePytanie?.polishTranslation
    : aktualnePytanie?.germanSentence

  const tekstPlaceholder = czyNiemieckiDoPolskiego ? "Wpisz polskie tłumaczenie..." : "Wpisz niemieckie zdanie..."

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
              Zdanie {indeksPytania + 1} z {pytania.length}
            </span>
            <span className="text-sm font-medium text-purple-400">
              Wynik: {wynik}/{indeksPytania}
            </span>
          </div>
          <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
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
              className={`glass-card border-0 shadow-glow-purple overflow-hidden ${animateCard ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            >
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium px-3 py-1 bg-purple-950/30 text-purple-300 rounded-full border border-purple-800/50">
                    {czyNiemieckiDoPolskiego ? "Niemiecki → Polski" : "Polski → Niemiecki"}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 bg-pink-950/30 text-pink-300 rounded-full border border-pink-800/50">
                    {aktualnePytanie?.difficulty === "easy"
                      ? "łatwy"
                      : aktualnePytanie?.difficulty === "medium"
                        ? "średni"
                        : "trudny"}
                  </span>
                </div>
                <CardTitle className="text-center text-xl mt-4 mb-2 glow-text-white">{wyswietlanyTekst}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Textarea
                    placeholder={tekstPlaceholder}
                    value={odpowiedzUzytkownika}
                    onChange={(e) => setOdpowiedzUzytkownika(e.target.value)}
                    disabled={czyOdpowiedziano}
                    className="min-h-[120px] bg-neutral-800/50 border-neutral-700 focus:border-purple-500 text-lg"
                  />
                </motion.div>

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
                            <span>Dobra robota! Twoje tłumaczenie jest poprawne.</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-400" />
                            <span>Twoje tłumaczenie wymaga poprawy. Sprawdź poprawną odpowiedź.</span>
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
                      className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                    >
                      Sprawdź odpowiedź
                    </Button>
                  ) : (
                    <Button
                      onClick={nastepnePytanie}
                      className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full gap-1"
                    >
                      {indeksPytania < pytania.length - 1 ? "Następne zdanie" : "Zobacz wyniki"}
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
