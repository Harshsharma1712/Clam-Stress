"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export function FloatingThemeToggle() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [0, 1])
  const scale = useTransform(scrollY, [0, 100], [0.8, 1])

  return (
    <motion.div className="fixed bottom-6 right-6 z-50" style={{ opacity, scale }} initial={{ opacity: 0, scale: 0.8 }}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="shadow-lg rounded-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-teal-200 dark:border-teal-800 p-2"
      >
        <ThemeToggle />
      </motion.div>
    </motion.div>
  )
}
