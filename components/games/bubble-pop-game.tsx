"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
}

const colors = ["bg-blue-400", "bg-teal-400", "bg-purple-400", "bg-pink-400", "bg-indigo-400", "bg-cyan-400"]

export default function BubblePopGame() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameTime, setGameTime] = useState(0)

  const createBubble = useCallback(() => {
    const newBubble: Bubble = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: 100, // Start from bottom
      size: Math.random() * 40 + 30, // 30-70px
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1, // 1-3 speed
    }
    return newBubble
  }, [])

  const popBubble = (id: number) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id))
    setScore((prev) => prev + 10)
  }

  const resetGame = () => {
    setBubbles([])
    setScore(0)
    setGameTime(0)
    setIsPlaying(false)
  }

  // Game loop
  useEffect(() => {
    if (!isPlaying) return

    const gameInterval = setInterval(() => {
      setGameTime((prev) => prev + 1)

      // Move bubbles up
      setBubbles(
        (prev) =>
          prev
            .map((bubble) => ({
              ...bubble,
              y: bubble.y - bubble.speed,
            }))
            .filter((bubble) => bubble.y > -10), // Remove bubbles that went off screen
      )

      // Add new bubbles randomly
      if (Math.random() < 0.3) {
        // 30% chance each second
        setBubbles((prev) => [...prev, createBubble()])
      }
    }, 100)

    return () => clearInterval(gameInterval)
  }, [isPlaying, createBubble])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-slate-700 dark:text-slate-300">
          <span className="font-semibold">Score: {score}</span>
        </div>
        <div className="text-slate-700 dark:text-slate-300">
          <span className="font-semibold">Time: {Math.floor(gameTime / 10)}s</span>
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-teal-500 hover:bg-teal-600 text-white">
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={resetGame}
          variant="outline"
          className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-96 bg-gradient-to-t from-blue-100 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 rounded-lg border-2 border-teal-200 dark:border-teal-800 overflow-hidden">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className={`absolute rounded-full cursor-pointer ${bubble.color} opacity-70 hover:opacity-90 shadow-lg`}
              style={{
                left: `${bubble.x}%`,
                bottom: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => popBubble(bubble.id)}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Bubble highlight */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Instructions */}
        {!isPlaying && bubbles.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-600 dark:text-slate-400">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="text-4xl mb-4"
              >
                🫧
              </motion.div>
              <p className="text-lg font-medium">Click "Start" to begin</p>
              <p className="text-sm">Pop the bubbles to release stress!</p>
            </div>
          </div>
        )}
      </div>

      {/* Motivational Messages */}
      {score > 0 && (
        <motion.div className="text-center mt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-teal-600 dark:text-teal-400 font-medium">
            {score < 50
              ? "Great start! Keep popping!"
              : score < 100
                ? "You're doing amazing!"
                : score < 200
                  ? "Stress is melting away!"
                  : "You're a bubble-popping master! 🌟"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
