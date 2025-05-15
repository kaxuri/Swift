"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-400 hover:text-white hover:bg-neutral-800"
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
        <DropdownMenuItem
          onClick={() => setLanguage("pl")}
          className={`${language === "pl" ? "bg-neutral-800 text-white" : "text-neutral-400"} hover:bg-neutral-800 hover:text-white cursor-pointer`}
        >
          🇵🇱 Polski
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`${language === "en" ? "bg-neutral-800 text-white" : "text-neutral-400"} hover:bg-neutral-800 hover:text-white cursor-pointer`}
        >
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("de")}
          className={`${language === "de" ? "bg-neutral-800 text-white" : "text-neutral-400"} hover:bg-neutral-800 hover:text-white cursor-pointer`}
        >
          🇩🇪 Deutsch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
