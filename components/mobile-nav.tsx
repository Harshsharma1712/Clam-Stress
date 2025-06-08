"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileNavProps {
  variant?: "overlay" | "sidebar"
}

export function MobileNav({ variant = "overlay" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Close menu on route change
  useEffect(() => {
    closeMenu()
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "AI Chat" },
    { href: "/games", label: "Small Games" },
  ]

  if (variant === "sidebar") {
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
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />

              {/* Sidebar - Made more compact and mobile-friendly */}
              <motion.div
                className="fixed top-0 left-0 z-50 h-full w-64 max-w-[75vw] bg-white dark:bg-slate-950 shadow-xl border-r border-slate-200 dark:border-slate-800"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {/* Compact Header */}
                <div className="flex items-center justify-between p-3 border-b border-teal-200 dark:border-teal-800">
                  <Link href="/" onClick={closeMenu}>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        Calm<span className="text-teal-500">-stress</span>
                      </h1>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-800 dark:text-slate-100 h-8 w-8"
                    onClick={closeMenu}
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Compact Navigation */}
                <nav className="flex flex-col p-3 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                        pathname === link.href
                          ? "bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Compact Theme Toggle */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Default overlay variant
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-teal-500 dark:text-teal-400"
                      : "text-slate-800 dark:text-slate-100 hover:text-teal-500 dark:hover:text-teal-400"
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
