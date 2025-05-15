"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Menu, X, Home, BookOpen, Database, BarChart, BookMarked, Layers } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ExitQuizDialog } from "@/components/exit-dialog"
import { useLanguage } from "@/contexts/language-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const links = [
    { href: "/", label: t("home"), icon: <Home className="h-5 w-5" /> },
    { href: "/quiz", label: t("quiz"), icon: <BookOpen className="h-5 w-5" /> },
    { href: "/learn", label: t("learn"), icon: <BookMarked className="h-5 w-5" /> },
    { href: "/sets", label: t("sets"), icon: <Layers className="h-5 w-5" /> },
    { href: "/creator", label: t("creator"), icon: <Database className="h-5 w-5" /> },
    { href: "/stats", label: t("statistics"), icon: <BarChart className="h-5 w-5" /> },
  ]

  const isQuizPage =
    pathname?.includes("/quiz/words") || pathname?.includes("/quiz/sentences") || pathname?.includes("/quiz/combined")

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-neutral-950 transition-all ${
        isScrolled ? "border-neutral-800 bg-neutral-950/90 backdrop-blur" : "border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-white">Swift</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <LanguageSwitcher />

            {isQuizPage && <ExitQuizDialog />}

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:text-white hover:bg-neutral-800"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-neutral-950 border-t border-neutral-800"
      >
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}

export default Navbar
