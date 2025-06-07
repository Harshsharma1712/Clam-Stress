"use client"

import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-teal-200 dark:border-teal-800"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Calm<span className="text-teal-500">-stress</span>
            </h1>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">

          <Link
            href="/chat"
            className={`transition-colors duration-200 ${pathname === "/chat"
                ? "text-teal-500 dark:text-teal-400"
                : "text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400"
              }`}
          >
            AI Chat
          </Link>

          <Link
            href="/"
            className={`transition-colors duration-200
                ? "text-teal-500 dark:text-teal-400"
                : "text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400"
              }`}
          >
            Home
          </Link>

          <Link
            href="/games"
            className={`transition-colors duration-200 ${pathname === "/chat"
                ? "text-teal-500 dark:text-teal-400"
                : "text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400"
              }`}
          >
            Small Games
          </Link>
          
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  )
}
