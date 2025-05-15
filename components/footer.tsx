"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Github, Twitter, Heart } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} {t("copyright")}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <div className="text-neutral-400 text-sm flex items-center">
              <span className="mr-1">{t("footer1")}</span>
              <Heart className="h-4 w-4 text-red-500" />&nbsp;
               {t("footer2")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
