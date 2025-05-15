"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  MessageSquare,
  Shuffle,
  Settings,
  ArrowRight,
  Brain,
  Database,
  Globe,
  BarChart,
  CheckCircle,
  ChevronRight,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/language-context"

const ParticleBackground = lazy(() => import("@/components/particle-background"))

export default function Home() {
  const { setTheme } = useTheme()
  const [zamontowany, setZamontowany] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setZamontowany(true)
    if (typeof window !== "undefined") {
      // Always set dark mode and don't allow changing
      setTheme("dark")
      // Force dark mode at document level
      document.documentElement.classList.add("dark")
      document.documentElement.style.colorScheme = "dark"
    }
  }, [setTheme])

  if (!zamontowany) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Logo className="w-20 h-20 mx-auto mb-6" />
          <div className="text-white text-xl font-bold">{t("loading")}</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>

        {/* Hero Content */}
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm font-medium mb-4"
              >
                GET GOOD GET SWIFT
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight"
              >
                {t("learnLanguages")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  {t("effectively")}
                </span>{" "}
                {t("and")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {t("enjoyably")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-neutral-300 max-w-2xl"
              >
                {t("appDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-lg font-medium"
                  asChild
                >
                  <Link href="/quiz">
                    {t("startLearning")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="px-8 py-6 bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800 rounded-xl text-lg font-medium"
                  asChild
                >
                  <Link href="/quiz">
                    <Settings className="mr-2 h-5 w-5" />
                    {t("settings")}
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Abstract shapes */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

                {/* Hero Image */}
                <div className="relative">
                  <div className="relative bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700/50 shadow-2xl p-6 md:p-4">
                    <div className="relative rounded-xl overflow-hidden">
                      <Image
                        src="/brain.gif"
                        alt={t("languageLearning")}
                        width={600}
                        height={800}
                        className="w-full h-[490px] rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                        <div className="space-y-3">
                          <h3 className="text-white text-xl font-bold">{t("languageLearning")}</h3>
                          <div className="flex space-x-2">
                            <span className="px-3 py-1 text-xs font-medium bg-blue-900/70 rounded-full">
                              {t("german")}
                            </span>
                            <span className="px-3 py-1 text-xs font-medium bg-purple-900/70 rounded-full">
                              {t("polish")}
                            </span>
                            <span className="px-3 py-1 text-xs font-medium bg-pink-900/70 rounded-full">
                              {t("english")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature pills */}
                    <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white text-sm font-medium shadow-lg">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>{t("free")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="mb-16 container max-w-7xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("whyChooseSwift")}</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">{t("appDesignedFor")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Globe className="h-10 w-10" />,
              title: t("multilingualism"),
              description: t("multilingualism_desc"),
              color: "from-blue-600 to-cyan-600",
            },
            {
              icon: <BookOpen className="h-10 w-10" />,
              title: t("differentLearningModes"),
              description: t("differentLearningModes_desc"),
              color: "from-purple-600 to-pink-600",
            },
            {
              icon: <Brain className="h-10 w-10" />,
              title: t("differentLearningMethods"),
              description: t("differentLearningMethods_desc"),
              color: "from-amber-600 to-orange-600",
            },
            {
              icon: <BarChart className="h-10 w-10" />,
              title: t("progressTracking"),
              description: t("progressTracking_desc"),
              color: "from-emerald-600 to-green-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-900/60 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4`}>{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quiz Options Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-purple-900/30 border border-purple-700/30 text-purple-400 text-sm font-medium mb-4">
            {t("startNow")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("chooseYourLearningMethod")}</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">{t("customizeLearningMethod")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t("wordQuiz"),
              description: t("wordQuizHomepage"),
              icon: <BookOpen className="h-6 w-6" aria-hidden="true" />,
              color: "from-purple-600 to-blue-600",
              textColor: "text-blue-100",
            },
            {
              title: t("sentenceQuiz"),
              description: t("sentenceQuizHomepage"),
              icon: <MessageSquare className="h-6 w-6" aria-hidden="true" />,
              color: "from-pink-600 to-purple-600",
              textColor: "text-purple-100",
            },
            {
              title: t("mixedQuiz"),
              description: t("mixedQuizHomepage"),
              icon: <Shuffle className="h-6 w-6" aria-hidden="true" />,
              color: "from-blue-600 to-cyan-600",
              textColor: "text-cyan-100",
            },
          ].map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div className="group h-full">
                <div
                  className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, var(--${option.color.split(" ")[0].replace("from-", "")}), var(--${option.color.split(" ")[1].replace("to-", "")}))`,
                  }}
                />
                <Link href="/quiz" className="block relative h-full">
                  <div className="h-full p-8 rounded-2xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 group-hover:border-neutral-700 transition-all duration-300 flex flex-col">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 p-3`}
                      aria-hidden="true"
                    >
                      {option.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                    <p className={`${option.textColor} opacity-90 mb-6`}>{option.description}</p>
                    <div className="mt-auto">
                      <Button
                        className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white gap-2 rounded-xl py-6`}
                      >
                        {t("start")}
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-t border-b border-blue-900/30">
        <div className="container max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold mb-4">{t("readyForLanguageAdventure")}</h2>
              <p className="text-neutral-300">{t("joinUsers")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg"
                asChild
              >
                <Link href="/quiz">
                  {t("startLearningNow")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800 px-8 py-6 rounded-xl text-lg"
                asChild
              >
                <Link href="/creator">
                  <Database className="mr-2 h-5 w-5" />
                  {t("createOwnDatabase")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
