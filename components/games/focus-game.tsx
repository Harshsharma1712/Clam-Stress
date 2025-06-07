"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Target } from "lucide-react"

export default function FocusGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [circlePosition, setCirclePosition] = useState({ x: 50, y: 50 })
  const [isFollowing, setIsFollowing] = useState(false)
  const [gameSpeed, setGameSpeed] = useState(2)

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
    setTimeLeft(30)
    setCirclePosition({ x: 50, y: 50 })
    setIsFollowing(false)
    setGameSpeed(2)
  }

  const moveCircle = useCallback(() => {
    if (!isPlaying) return

    setCirclePosition((prev) => {
      const newX = Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * gameSpeed * 2))
      const newY = Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * gameSpeed * 2))
      return { x: newX, y: newY }
    })
  }, [isPlaying, gameSpeed])

  // Game timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  // Circle movement
  useEffect(() => {
    if (!isPlaying) return

    const moveInterval = setInterval(moveCircle, 1000)
    return () => clearInterval(moveInterval)
  }, [isPlaying, moveCircle])

  // Score tracking
  useEffect(() => {
    if (!isPlaying) return

    const scoreInterval = setInterval(() => {
      if (isFollowing) {
        setScore((prev) => prev + 10)
        // Increase difficulty
        setGameSpeed((prev) => Math.min(prev + 0.1, 5))
      }
    }, 100)

    return () => clearInterval(scoreInterval)
  }, [isPlaying, isFollowing])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying) return

    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100

    // Check if mouse is near the circle (within 8% distance)
    const distance = Math.sqrt(Math.pow(mouseX - circlePosition.x, 2) + Math.pow(mouseY - circlePosition.y, 2))

    setIsFollowing(distance < 8)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-slate-700 dark:text-slate-300">
          <span className="font-semibold">Score: {score}</span>
        </div>
        <div className="text-slate-700 dark:text-slate-300">
          <span className="font-semibold">Time: {timeLeft}s</span>
        </div>
        <div className="text-slate-700 dark:text-slate-300">
          <span className="font-semibold">Speed: {gameSpeed.toFixed(1)}x</span>
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={timeLeft === 0}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
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
      <div
        className="relative w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg border-2 border-teal-200 dark:border-teal-800 overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Moving circle */}
        {isPlaying && (
          <motion.div
            className={`absolute w-16 h-16 rounded-full ${
              isFollowing ? "bg-green-400" : "bg-blue-400"
            } shadow-lg flex items-center justify-center`}
            style={{
              left: `${circlePosition.x}%`,
              top: `${circlePosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: isFollowing ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.3,
              repeat: isFollowing ? Number.POSITIVE_INFINITY : 0,
            }}
          >
            <Target className="w-8 h-8 text-white" />
          </motion.div>
        )}

        {/* Instructions */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-600 dark:text-slate-400">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="text-4xl mb-4"
              >
                🎯
              </motion.div>
              <p className="text-lg font-medium">
                {timeLeft === 0 ? `Game Over! Final Score: ${score}` : "Follow the moving circle"}
              </p>
              <p className="text-sm">
                {timeLeft === 0 ? "Click Reset to play again" : "Keep your mouse close to the target"}
              </p>
            </div>
          </div>
        )}

        {/* Following indicator */}
        {isPlaying && isFollowing && (
          <div className="absolute top-4 left-4 text-green-600 dark:text-green-400 font-semibold">✓ Following!</div>
        )}
      </div>

      {/* Performance feedback */}
      {timeLeft === 0 && score > 0 && (
        <motion.div
          className="text-center mt-4 p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-indigo-700 dark:text-indigo-300 font-medium">
            {score < 100
              ? "Good focus! Try to stay closer to the target."
              : score < 300
                ? "Excellent concentration! Your mindfulness is improving."
                : score < 500
                  ? "Outstanding focus! You have great mindful awareness."
                  : "Perfect mindfulness! You're a focus master! 🧘‍♀️"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
