"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-800 dark:text-slate-100"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-teal-200 dark:border-teal-800">
              <Link href="/" onClick={closeMenu}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Calm<span className="text-teal-500">-stress</span>
                  </h1>
                </div>
              </Link>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-800 dark:text-slate-100"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 space-y-8 p-8">
              <Link
                href="/"
                className={`text-2xl font-medium transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-teal-500 dark:text-teal-400"
                    : "text-slate-800 dark:text-slate-100 hover:text-teal-500 dark:hover:text-teal-400"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className={`text-2xl font-medium transition-colors duration-200 ${
                  pathname === "/chat"
                    ? "text-teal-500 dark:text-teal-400"
                    : "text-slate-800 dark:text-slate-100 hover:text-teal-500 dark:hover:text-teal-400"
                }`}
                onClick={closeMenu}
              >
                AI Chat
              </Link>
              <a
                href="#meditate"
                className="text-2xl font-medium text-slate-800 dark:text-slate-100 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200"
                onClick={closeMenu}
              >
                Meditate
              </a>
              <a
                href="#about"
                className="text-2xl font-medium text-slate-800 dark:text-slate-100 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200"
                onClick={closeMenu}
              >
                About
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
