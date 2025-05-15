"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ExitQuizDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const handleExit = () => {
    setOpen(false)
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-400 hover:text-white hover:bg-neutral-800"
          aria-label={t("exitQuiz")}
        >
          <X className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">{t("confirmExit")}</DialogTitle>
          <DialogDescription className="text-neutral-400">{t("exitWarning")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
          >
            {t("cancelExit")}
          </Button>
          <Button onClick={handleExit} className="bg-red-600 hover:bg-red-700 text-white">
            {t("confirmExitButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
