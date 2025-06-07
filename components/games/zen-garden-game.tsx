"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RotateCcw, Sparkles } from "lucide-react"

interface Stone {
  id: number
  x: number
  y: number
  size: number
  color: string
}

interface SandPattern {
  id: number
  x: number
  y: number
  type: "circle" | "line"
}

export default function ZenGardenGame() {
  const [stones, setStones] = useState<Stone[]>([])
  const [sandPatterns, setSandPatterns] = useState<SandPattern[]>([])
  const [selectedTool, setSelectedTool] = useState<"stone" | "rake">("stone")
  const gardenRef = useRef<HTMLDivElement>(null)

  const addStone = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool !== "stone") return

    const rect = gardenRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newStone: Stone = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 30 + 20,
      color: ["#6B7280", "#4B5563", "#374151", "#1F2937"][Math.floor(Math.random() * 4)],
    }

    setStones((prev) => [...prev, newStone])
  }

  const addSandPattern = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool !== "rake") return

    const rect = gardenRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newPattern: SandPattern = {
      id: Date.now(),
      x,
      y,
      type: Math.random() > 0.5 ? "circle" : "line",
    }

    setSandPatterns((prev) => [...prev, newPattern])
  }

  const clearGarden = () => {
    setStones([])
    setSandPatterns([])
  }

  const handleStoneMove = (id: number, info: PanInfo) => {
    const rect = gardenRef.current?.getBoundingClientRect()
    if (!rect) return

    setStones((prev) =>
      prev.map((stone) => {
        if (stone.id === id) {
          const newX = Math.max(0, Math.min(100, stone.x + (info.delta.x / rect.width) * 100))
          const newY = Math.max(0, Math.min(100, stone.y + (info.delta.y / rect.height) * 100))
          return { ...stone, x: newX, y: newY }
        }
        return stone
      }),
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tools */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          onClick={() => setSelectedTool("stone")}
          variant={selectedTool === "stone" ? "default" : "outline"}
          className={selectedTool === "stone" ? "bg-teal-500 hover:bg-teal-600 text-white" : ""}
        >
          🪨 Place Stones
        </Button>
        <Button
          onClick={() => setSelectedTool("rake")}
          variant={selectedTool === "rake" ? "default" : "outline"}
          className={selectedTool === "rake" ? "bg-teal-500 hover:bg-teal-600 text-white" : ""}
        >
          🌾 Rake Sand
        </Button>
        <Button onClick={clearGarden} variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50">
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Garden Area */}
      <div
        ref={gardenRef}
        className="relative w-full h-96 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 rounded-lg border-2 border-teal-200 dark:border-teal-800 overflow-hidden cursor-crosshair"
        onClick={selectedTool === "stone" ? addStone : addSandPattern}
      >
        {/* Sand texture background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="sand" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="#D97706" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sand)" />
          </svg>
        </div>

        {/* Sand patterns */}
        {sandPatterns.map((pattern) => (
          <motion.div
            key={pattern.id}
            className="absolute"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {pattern.type === "circle" ? (
              <div className="w-16 h-16 border-2 border-amber-600 dark:border-amber-400 rounded-full opacity-60" />
            ) : (
              <div className="w-20 h-1 bg-amber-600 dark:bg-amber-400 opacity-60" />
            )}
          </motion.div>
        ))}

        {/* Stones */}
        {stones.map((stone) => (
          <motion.div
            key={stone.id}
            className="absolute rounded-full cursor-move shadow-lg"
            style={{
              left: `${stone.x}%`,
              top: `${stone.y}%`,
              width: `${stone.size}px`,
              height: `${stone.size}px`,
              backgroundColor: stone.color,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.2 }}
            drag
            dragMomentum={false}
            onDrag={(_, info) => handleStoneMove(stone.id, info)}
          >
            {/* Stone highlight */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-40" />
          </motion.div>
        ))}

        {/* Instructions */}
        {stones.length === 0 && sandPatterns.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-600 dark:text-slate-400">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
                className="text-4xl mb-4"
              >
                🧘‍♀️
              </motion.div>
              <p className="text-lg font-medium">Create your zen garden</p>
              <p className="text-sm">
                {selectedTool === "stone" ? "Click to place stones" : "Click to rake sand patterns"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Zen Quote */}
      <motion.div
        className="text-center mt-6 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2" />
          <span className="text-amber-700 dark:text-amber-300 font-medium">Zen Wisdom</span>
        </div>
        <p className="text-amber-700 dark:text-amber-300 italic">
          "The garden is a metaphor for life. Arrange it mindfully, and find peace in the process."
        </p>
      </motion.div>
    </div>
  )
}
