"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getTranslation } from "@/lib/translations"

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "pl",
  setLanguage: () => {},
  t: (key) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState("pl")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for both possible localStorage keys to ensure compatibility
    const savedLanguage = localStorage.getItem("language") || localStorage.getItem("uiLanguage")
    if (savedLanguage && ["pl", "en", "de"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: string) => {
    if (["pl", "en", "de"].includes(newLanguage)) {
      setLanguageState(newLanguage)
      if (typeof window !== "undefined") {
        // Store language in both keys for compatibility
        localStorage.setItem("language", newLanguage)
        localStorage.setItem("uiLanguage", newLanguage)
      }
    }
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    if (!mounted) return key
    return getTranslation(language, key, params)
  }

  // Force re-render when language changes
  useEffect(() => {
    // This is intentionally empty to trigger a re-render when language changes
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
