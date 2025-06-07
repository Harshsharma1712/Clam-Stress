"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

export default function BreathingCircle() {
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState("idle")
  const [seconds, setSeconds] = useState(0)

  // Breathing cycle: inhale (4s) -> hold (4s) -> exhale (6s) -> repeat
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isBreathing) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = (prev + 1) % 14

          // Update breathing phase based on the current second
          if (newSeconds === 0) {
            setBreathPhase("inhale")
          } else if (newSeconds === 4) {
            setBreathPhase("hold")
          } else if (newSeconds === 8) {
            setBreathPhase("exhale")
          }

          return newSeconds
        })
      }, 1000)
    } else {
      setBreathPhase("idle")
    }

    return () => clearInterval(interval)
  }, [isBreathing])

  const toggleBreathing = () => {
    if (!isBreathing) {
      setBreathPhase("inhale")
      setSeconds(0)
    }
    setIsBreathing(!isBreathing)
  }

  // Animation variants for different breathing phases
  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      transition: { duration: 4, ease: "linear" },
    },
    exhale: {
      scale: 1,
      transition: { duration: 6, ease: "easeInOut" },
    },
    idle: {
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  // Get instruction text based on current phase
  const getInstructionText = () => {
    switch (breathPhase) {
      case "inhale":
        return "Inhale slowly..."
      case "hold":
        return "Hold your breath..."
      case "exhale":
        return "Exhale gently..."
      default:
        return "Press play to begin"
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative flex items-center justify-center">
        {/* Outer ripple effect */}
        <motion.div
          className="absolute rounded-full bg-teal-100 dark:bg-teal-900/30"
          animate={{
            scale: isBreathing ? [1, 1.2, 1] : 1,
            opacity: isBreathing ? [0.7, 0.2, 0.7] : 0.7,
          }}
          transition={{
            repeat: isBreathing ? Number.POSITIVE_INFINITY : 0,
            duration: 10,
            ease: "easeInOut",
          }}
          style={{ width: 280, height: 280 }}
        />

        {/* Middle ripple effect */}
        <motion.div
          className="absolute rounded-full bg-teal-200 dark:bg-teal-800/40"
          animate={{
            scale: isBreathing ? [1, 1.1, 1] : 1,
            opacity: isBreathing ? [0.8, 0.4, 0.8] : 0.8,
          }}
          transition={{
            repeat: isBreathing ? Number.POSITIVE_INFINITY : 0,
            duration: 8,
            ease: "easeInOut",
          }}
          style={{ width: 240, height: 240 }}
        />

        {/* Main breathing circle */}
        <motion.div
          className="relative flex items-center justify-center w-48 h-48 rounded-full bg-teal-400 dark:bg-teal-600 shadow-lg"
          variants={circleVariants}
          animate={breathPhase}
        >
          <p className="text-lg font-medium text-white">{getInstructionText()}</p>
        </motion.div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          onClick={toggleBreathing}
          variant="outline"
          size="lg"
          className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950"
        >
          {isBreathing ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isBreathing ? "Pause" : "Start"} Breathing Exercise
        </Button>
      </div>
    </div>
  )
}
