"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ThemeProvider } from "next-themes"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import ParticleBackground from "@/components/particle-background"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <div className="min-h-screen bg-neutral-950">
          <ParticleBackground />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
