import type { Viewport } from "next"
import { Metadata } from "next"
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
    return {
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
      themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
      ],
    }
  }
  
