import type { ReactNode } from "react"
import "@/app/globals.css"
import ClientLayout from "./ClientLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swift - Aplikacja do nauki języków",
  description: "Ucz się języków efektywnie z Swift. Ćwicz słownictwo, zdania i rozwijaj swoje umiejętności językowe.",
  keywords: ["nauka języków", "słownictwo", "quiz", "fiszki", "niemiecki", "polski", "angielski"],
  authors: [{ name: "kaxuri" }],
  creator: "kaxuri",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    title: "Swift - Aplikacja do nauki języków",
    description: "Ucz się języków efektywnie z Swift. Ćwicz słownictwo, zdania i rozwijaj swoje umiejętności językowe.",
    siteName: "Swift",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift - Aplikacja do nauki języków",
    description: "Ucz się języków efektywnie z Swift. Ćwicz słownictwo, zdania i rozwijaj swoje umiejętności językowe.",
    creator: "@kaxuri",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
