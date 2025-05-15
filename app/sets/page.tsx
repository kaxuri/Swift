"use client"

import { useState, useMemo, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { zapiszWlasnaBaze } from "@/lib/custom-database"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

const ParticleBackground = lazy(() => import("@/components/particle-background"))

type ZestawBazyDanych = {
  id: string
  nazwa: string
  opis: string
  autor: string
  jezyk: "de" | "en" | "fr" | "es" | "it"
  jezykDocelowy: "pl"
  iloscSlow: number
  iloscZdan: number
  kategorie: string[]
  poziomTrudnosci: "poczatkujacy" | "sredniozaawansowany" | "zaawansowany" | "mieszany"
  pobrania: number
  dataDodania: string
  tagi: string[]
  czyWyrozniany: boolean
}

const POCZATKOWE_ZESTAWY: ZestawBazyDanych[] = []

function pobierzNazweJezyka(kod: string): string {
  const jezyki: Record<string, string> = {
    de: "Niemiecki",
    en: "Angielski",
    pl: "Polski",
    fr: "Francuski",
    es: "Hiszpański",
    it: "Włoski",
  }
  return jezyki[kod] || kod
}

function formatujDate(dataString: string): string {
  const data = new Date(dataString)
  return data.toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" })
}

function tlumaczPoziomTrudnosci(poziom: string): string {
  switch (poziom) {
    case "poczatkujacy":
      return "Początkujący"
    case "sredniozaawansowany":
      return "Średniozaawansowany"
    case "zaawansowany":
      return "Zaawansowany"
    case "mieszany":
      return "Mieszany"
    default:
      return poziom
  }
}

async function pobierzZestaw(zestaw: ZestawBazyDanych): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const przykladowaBaza = {
        name: zestaw.nazwa,
        author: zestaw.autor,
        description: zestaw.opis,
        dateCreated: new Date().toISOString(),
        language: zestaw.jezyk,
        difficulty: zestaw.poziomTrudnosci,
        words: Array.from({ length: zestaw.iloscSlow }, (_, i) => ({
          id: i + 1,
          germanWord: zestaw.jezyk === "de" ? `GermanWord${i + 1}` : "",
          englishTranslation: zestaw.jezyk === "en" ? `EnglishWord${i + 1}` : "",
          polishTranslation: `PolishTranslation${i + 1}`,
          category: zestaw.kategorie[Math.floor(Math.random() * zestaw.kategorie.length)],
          difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as "easy" | "medium" | "hard",
        })),
        sentences: Array.from({ length: zestaw.iloscZdan }, (_, i) => ({
          id: i + 1,
          germanSentence: zestaw.jezyk === "de" ? `German sentence ${i + 1}` : "",
          englishTranslation: zestaw.jezyk === "en" ? `English sentence ${i + 1}` : "",
          polishTranslation: `Polish translation ${i + 1}`,
          category: zestaw.kategorie[Math.floor(Math.random() * zestaw.kategorie.length)],
          difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as "easy" | "medium" | "hard",
        })),
      }

      zapiszWlasnaBaze(przykladowaBaza)
      resolve(true)
    }, 1000)
  })
}

export default function StronaSety() {
  const [zapytanieWyszukiwania, setZapytanieWyszukiwania] = useState("")
  const [filtrJezyka, setFiltrJezyka] = useState<string>("all")
  const [filtrTrudnosci, setFiltrTrudnosci] = useState<string>("all")
  const [sortujWedlug, setSortujWedlug] = useState<string>("popular")
  const [aktywnaZakladka, setAktywnaZakladka] = useState<string>("all")
  const [czyPobieranie, setCzyPobieranie] = useState<string | null>(null)
  const [dostepneZestawy, setDostepneZestawy] = useState<ZestawBazyDanych[]>(POCZATKOWE_ZESTAWY)
  const router = useRouter()
  const { toast } = useToast()
  const { t, language } = useLanguage()

  const przefiltrowaneSety = useMemo(() => {
    let wynik = [...dostepneZestawy]

    if (zapytanieWyszukiwania) {
      const zapytanie = zapytanieWyszukiwania.toLowerCase()
      wynik = wynik.filter(
        (zestaw) =>
          zestaw.nazwa.toLowerCase().includes(zapytanie) ||
          zestaw.opis.toLowerCase().includes(zapytanie) ||
          zestaw.tagi.some((tag) => tag.toLowerCase().includes(zapytanie)),
      )
    }

    if (filtrJezyka !== "all") {
      wynik = wynik.filter((zestaw) => zestaw.jezyk === filtrJezyka)
    }

    if (filtrTrudnosci !== "all") {
      wynik = wynik.filter((zestaw) => zestaw.poziomTrudnosci === filtrTrudnosci)
    }

    if (aktywnaZakladka === "featured") {
      wynik = wynik.filter((zestaw) => zestaw.czyWyrozniany)
    }

    switch (sortujWedlug) {
      case "popular":
        wynik.sort((a, b) => b.pobrania - a.pobrania)
        break
      case "newest":
        wynik.sort((a, b) => new Date(b.dataDodania).getTime() - new Date(a.dataDodania).getTime())
        break
      case "words":
        wynik.sort((a, b) => b.iloscSlow - a.iloscSlow)
        break
    }

    return wynik
  }, [zapytanieWyszukiwania, filtrJezyka, filtrTrudnosci, sortujWedlug, aktywnaZakladka, dostepneZestawy])

  const obslugaPobierania = async (zestaw: ZestawBazyDanych) => {
    setCzyPobieranie(zestaw.id)
    try {
      const zaktualizowaneZestawy = dostepneZestawy.map((s) => {
        if (s.id === zestaw.id) {
          return { ...s, pobrania: s.pobrania + 1 }
        }
        return s
      })
      setDostepneZestawy(zaktualizowaneZestawy)

      const sukces = await pobierzZestaw(zestaw)
      if (sukces) {
        toast({
          title: "Baza danych pobrana pomyślnie",
          description: `${zestaw.nazwa} została zaimportowana do Twojego konta.`,
          duration: 5000,
        })
        setTimeout(() => {
          router.push("/")
        }, 1000)
      }
    } catch (error) {
      toast({
        title: "Pobieranie nie powiodło się",
        description: "Wystąpił błąd podczas pobierania bazy danych. Spróbuj ponownie.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setCzyPobieranie(null)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 dark:text-white text-neutral-900">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      <div className="container max-w-6xl mx-auto py-10 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">{t("sets")}</h1>
          <p className="text-muted-foreground">
            {language === "pl"
              ? "Przeglądaj i pobieraj gotowe zestawy słów i zdań do nauki języków."
              : "Browse and download ready-to-use sets of words and sentences for language learning."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty state - no sets available yet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-full"
          >
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-xl font-medium mb-2">
                    {language === "pl" ? "Zestawy będą dostępne wkrótce" : "Sets will be available soon"}
                  </h3>
                  <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                    {language === "pl"
                      ? "Aktualnie pracujemy nad przygotowaniem gotowych zestawów do nauki różnych języków. W międzyczasie możesz stworzyć własną bazę danych w kreatorze."
                      : "We are currently working on preparing ready-to-use sets for learning different languages. In the meantime, you can create your own database in the creator."}
                  </p>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => (window.location.href = "/creator")}
                  >
                    {language === "pl" ? "Przejdź do kreatora" : "Go to creator"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
