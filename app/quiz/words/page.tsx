"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Eye, EyeOff, Brain, Trophy, Clock } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { getRandomWords, getWordInLanguage, getLanguageName } from "@/lib/quiz-data"
import { pobierzLosoweWlasneSlowa } from "@/lib/custom-database"
import { ExitQuizDialog } from "@/components/exit-dialog"
import { saveQuizResult } from "@/lib/quiz-storage"
import ParticleBackground from "@/components/particle-background"

export default function WordsQuiz() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ilosc = Number.parseInt(searchParams?.get("count") || "10")
  const jezykZrodlowy = searchParams?.get("source") || "de"
  const jezykDocelowy = searchParams?.get("target") || "pl"
  const uzyjWlasnejBazy = searchParams?.get("custom") === "1"
  const typTestu = searchParams?.get("type") || "wpisywanie"

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
  const [opcjeWyboru, setOpcjeWyboru] = useState<string[]>([])
  const [prawdaFalszOdpowiedz, setPrawdaFalszOdpowiedz] = useState<string | null>(null)
  const [animateCard, setAnimateCard] = useState(false)

  useEffect(() => {
    // Pobierz losowe słowa na podstawie wybranej bazy danych
    const pobierzPytania = async () => {
      let pobranePytania = []
      if (uzyjWlasnejBazy) {
        pobranePytania = pobierzLosoweWlasneSlowa(ilosc)
      } else {
        pobranePytania = getRandomWords(ilosc)
      }

      // Jeśli typ testu to wybór lub mieszany, przygotuj opcje wyboru dla każdego pytania
      if (typTestu === "wybor" || typTestu === "mieszany") {
        pobranePytania = pobranePytania.map((pytanie) => {
          // Dodaj poprawną odpowiedź i 3 losowe niepoprawne
          const poprawnaOdpowiedz = getWordInLanguage(pytanie, jezykDocelowy)

          // Pobierz inne słowa jako niepoprawne odpowiedzi
          const innePytania = pobranePytania.filter((p) => p.id !== pytanie.id)
          const losoweNiepoprawne = innePytania
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((p) => getWordInLanguage(p, jezykDocelowy))

          // Połącz i pomieszaj opcje
          const opcje = [poprawnaOdpowiedz, ...losoweNiepoprawne].sort(() => 0.5 - Math.random())

          return {
            ...pytanie,
            opcjeWyboru: opcje,
          }
        })
      }

      // Jeśli typ testu to prawda/fałsz lub mieszany, przygotuj odpowiedzi prawda/fałsz
      if (typTestu === "prawdaFalsz" || typTestu === "mieszany") {
        pobranePytania = pobranePytania.map((pytanie) => {
          // 50% szans na pokazanie poprawnej odpowiedzi
          const pokazPoprawna = Math.random() > 0.5

          let niepoprawnaOdpowiedz = ""
          if (!pokazPoprawna) {
            // Wybierz losowe inne pytanie dla niepoprawnej odpowiedzi
            const innePytania = pobranePytania.filter((p) => p.id !== pytanie.id)
            const losowePytanie = innePytania[Math.floor(Math.random() * innePytania.length)]
            niepoprawnaOdpowiedz = getWordInLanguage(losowePytanie, jezykDocelowy)
          }

          return {
            ...pytanie,
            pokazanaTlumaczenie: pokazPoprawna ? getWordInLanguage(pytanie, jezykDocelowy) : niepoprawnaOdpowiedz,
            czyPoprawnePolaczenie: pokazPoprawna,
          }
        })
      }

      setPytania(pobranePytania)
    }

    pobierzPytania()
    setCzasStartu(Date.now())
  }, [ilosc, uzyjWlasnejBazy, jezykZrodlowy, jezykDocelowy, typTestu])

  useEffect(() => {
    // Przygotuj opcje wyboru dla aktualnego pytania
    if (pytania.length > 0 && (typTestu === "wybor" || (typTestu === "mieszany" && indeksPytania % 3 === 1))) {
      const aktualnePytanie = pytania[indeksPytania]
      if (aktualnePytanie.opcjeWyboru) {
        setOpcjeWyboru(aktualnePytanie.opcjeWyboru)
      }
    }
  }, [indeksPytania, pytania, typTestu])

  const aktualnePytanie = pytania[indeksPytania]

  // Określ typ aktualnego pytania dla trybu mieszanego
  const aktualnyTypPytania =
    typTestu === "mieszany"
      ? indeksPytania % 3 === 0
        ? "wpisywanie"
        : indeksPytania % 3 === 1
          ? "wybor"
          : "prawdaFalsz"
      : typTestu

  const sprawdzOdpowiedz = () => {
    if (aktualnyTypPytania === "wpisywanie") {
      if (!odpowiedzUzytkownika.trim()) return

      const poprawna =
        odpowiedzUzytkownika.toLowerCase().trim() ===
        getWordInLanguage(aktualnePytanie, jezykDocelowy).toLowerCase().trim()

      setCzyPoprawnie(poprawna)
      setCzyOdpowiedziano(true)

      if (poprawna) {
        setWynik(wynik + 1)
      }
    } else if (aktualnyTypPytania === "wybor") {
      if (!odpowiedzUzytkownika) return

      const poprawnaOdpowiedz = getWordInLanguage(aktualnePytanie, jezykDocelowy)

      const poprawna = odpowiedzUzytkownika === poprawnaOdpowiedz

      setCzyPoprawnie(poprawna)
      setCzyOdpowiedziano(true)

      if (poprawna) {
        setWynik(wynik + 1)
      }
    } else if (aktualnyTypPytania === "prawdaFalsz") {
      if (!prawdaFalszOdpowiedz) return

      const poprawna =
        (prawdaFalszOdpowiedz === "true" && aktualnePytanie.czyPoprawnePolaczenie) ||
        (prawdaFalszOdpowiedz === "false" && !aktualnePytanie.czyPoprawnePolaczenie)

      setCzyPoprawnie(poprawna)
      setCzyOdpowiedziano(true)

      if (poprawna) {
        setWynik(wynik + 1)
      }
    }
  }

  const wybierzOpcje = (opcja: string) => {
    setOdpowiedzUzytkownika(opcja)
  }

  const wybierzPrawdaFalsz = (odpowiedz: string) => {
    setPrawdaFalszOdpowiedz(odpowiedz)
  }

  const nastepnePytanie = () => {
    setAnimateCard(true)
    setTimeout(() => {
      if (indeksPytania < pytania.length - 1) {
        setIndeksPytania(indeksPytania + 1)
        setOdpowiedzUzytkownika("")
        setPrawdaFalszOdpowiedz(null)
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
      setPytania(pobierzLosoweWlasneSlowa(ilosc))
    } else {
      setPytania(getRandomWords(ilosc))
    }
    setIndeksPytania(0)
    setOdpowiedzUzytkownika("")
    setPrawdaFalszOdpowiedz(null)
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
        type: "words",
        direction: `${jezykZrodlowy}-${jezykDocelowy}` as any,
        score: wynik,
        total: pytania.length,
        percentage: Math.round((wynik / pytania.length) * 100),
        duration: czas,
      })
    }
  }, [quizZakonczony, czasStartu, czasKonca, wynik, pytania.length, jezykZrodlowy, jezykDocelowy])

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
            <Brain className="h-12 w-12 text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ładowanie quizu...</h2>
            <p className="text-neutral-400">Przygotowujemy pytania dla Ciebie</p>
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
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
                <CardTitle className="text-center text-2xl md:text-3xl glow-text-white">Wyniki quizu</CardTitle>
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
                      ? "Doskonale! Wszystkie odpowiedzi są poprawne!"
                      : procentWyniku > 80
                        ? "Świetna robota! Jesteś na dobrej drodze do perfekcji."
                        : procentWyniku > 50
                          ? "Dobra robota! Kontynuuj ćwiczenia, aby dalej się doskonalić."
                          : "Kontynuuj ćwiczenia, aby poprawić swoje słownictwo."}
                  </p>
                  <div className="flex justify-center gap-6 text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span>
                        {minuty}m {sekundy}s
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-400" />
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
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6"
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

  const wyswietlanyTekst = getWordInLanguage(aktualnePytanie, jezykZrodlowy)
  const poprawnaOdpowiedz = getWordInLanguage(aktualnePytanie, jezykDocelowy)
  const tekstPlaceholder = `Wpisz tłumaczenie w języku ${getLanguageName(jezykDocelowy)}...`

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
            <span className="text-sm font-medium text-blue-400">
              Wynik: {wynik}/{indeksPytania}
            </span>
          </div>
          <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
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
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium px-3 py-1 bg-blue-950/30 text-blue-300 rounded-full border border-blue-800/50">
                    {getLanguageName(jezykZrodlowy)} → {getLanguageName(jezykDocelowy)}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 bg-purple-950/30 text-purple-300 rounded-full border border-purple-800/50">
                    {aktualnePytanie?.difficulty === "easy"
                      ? "łatwy"
                      : aktualnePytanie?.difficulty === "medium"
                        ? "średni"
                        : "trudny"}
                  </span>
                </div>
                <CardTitle className="text-center text-3xl mt-4 mb-2 glow-text-white">{wyswietlanyTekst}</CardTitle>

                {aktualnyTypPytania === "prawdaFalsz" && (
                  <motion.div
                    className="mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="mb-2 text-neutral-300">Czy to poprawne tłumaczenie?</p>
                    <div className="text-xl font-medium text-white">{aktualnePytanie.pokazanaTlumaczenie}</div>
                  </motion.div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {aktualnyTypPytania === "wpisywanie" && (
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
                )}

                {aktualnyTypPytania === "wybor" && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {opcjeWyboru.map((opcja, indeks) => (
                      <motion.div
                        key={indeks}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + indeks * 0.1 }}
                      >
                        <Button
                          variant={odpowiedzUzytkownika === opcja ? "default" : "outline"}
                          className={`w-full justify-start text-left py-6 px-4 rounded-xl ${
                            odpowiedzUzytkownika === opcja
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "bg-neutral-800/50 border-neutral-700 text-neutral-200 hover:bg-neutral-700/50"
                          }`}
                          onClick={() => wybierzOpcje(opcja)}
                          disabled={czyOdpowiedziano}
                        >
                          {opcja}
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {aktualnyTypPytania === "prawdaFalsz" && (
                  <motion.div
                    className="flex gap-3 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant={prawdaFalszOdpowiedz === "true" ? "default" : "outline"}
                      onClick={() => wybierzPrawdaFalsz("true")}
                      disabled={czyOdpowiedziano}
                      className={`w-1/2 py-6 ${
                        prawdaFalszOdpowiedz === "true"
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                          : "bg-neutral-800/50 border-neutral-700 text-neutral-200 hover:bg-neutral-700/50"
                      }`}
                    >
                      Prawda
                    </Button>
                    <Button
                      variant={prawdaFalszOdpowiedz === "false" ? "default" : "outline"}
                      onClick={() => wybierzPrawdaFalsz("false")}
                      disabled={czyOdpowiedziano}
                      className={`w-1/2 py-6 ${
                        prawdaFalszOdpowiedz === "false"
                          ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                          : "bg-neutral-800/50 border-neutral-700 text-neutral-200 hover:bg-neutral-700/50"
                      }`}
                    >
                      Fałsz
                    </Button>
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
                      disabled={
                        (aktualnyTypPytania === "wpisywanie" && !odpowiedzUzytkownika.trim()) ||
                        (aktualnyTypPytania === "wybor" && !odpowiedzUzytkownika) ||
                        (aktualnyTypPytania === "prawdaFalsz" && !prawdaFalszOdpowiedz)
                      }
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
                    >
                      Sprawdź odpowiedź
                    </Button>
                  ) : (
                    <Button
                      onClick={nastepnePytanie}
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full gap-1"
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
