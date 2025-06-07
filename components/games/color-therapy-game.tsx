"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Palette, Eraser, Download } from "lucide-react"

const colors = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#8B5CF6", // Violet
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#EC4899", // Pink
  "#6366F1", // Indigo
  "#14B8A6", // Teal
]

export default function ColorTherapyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState(colors[0])
  const [brushSize, setBrushSize] = useState(10)
  const [isEraser, setIsEraser] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set initial background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    if (isEraser) {
      ctx.globalCompositeOperation = "destination-out"
    } else {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = currentColor
    }

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "calm-stress-artwork.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Color Palette */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {colors.map((color) => (
          <motion.button
            key={color}
            className={`w-10 h-10 rounded-full border-4 ${
              currentColor === color ? "border-slate-400" : "border-slate-200"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => {
              setCurrentColor(color)
              setIsEraser(false)
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
        <motion.button
          className={`w-10 h-10 rounded-full border-4 bg-white flex items-center justify-center ${
            isEraser ? "border-slate-400" : "border-slate-200"
          }`}
          onClick={() => setIsEraser(!isEraser)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Eraser className="w-5 h-5 text-slate-600" />
        </motion.button>
      </div>

      {/* Brush Size */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-slate-700 dark:text-slate-300">Brush Size:</span>
        <input
          type="range"
          min="2"
          max="30"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-32"
        />
        <span className="text-slate-700 dark:text-slate-300 w-8">{brushSize}px</span>
      </div>

      {/* Canvas */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-96 border-2 border-teal-200 dark:border-teal-800 rounded-lg cursor-crosshair bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        <div className="absolute top-4 left-4 text-slate-400 text-sm pointer-events-none">
          Express yourself with colors...
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button onClick={clearCanvas} variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50">
          <Palette className="w-4 h-4 mr-2" />
          Clear Canvas
        </Button>
        <Button onClick={downloadCanvas} className="bg-teal-500 hover:bg-teal-600 text-white">
          <Download className="w-4 h-4 mr-2" />
          Save Artwork
        </Button>
      </div>

      {/* Inspiration */}
      <motion.div
        className="text-center mt-6 p-4 bg-teal-50 dark:bg-teal-950 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-teal-700 dark:text-teal-300 font-medium">
          💡 Art Therapy Tip: Let your emotions flow through colors. There's no right or wrong way to create!
        </p>
      </motion.div>
    </div>
  )
}
