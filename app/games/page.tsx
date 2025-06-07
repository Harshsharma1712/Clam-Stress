"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { FloatingThemeToggle } from "@/components/floating-theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Waves, Palette, Target } from "lucide-react"
import BubblePopGame from "@/components/games/bubble-pop-game"
import ColorTherapyGame from "@/components/games/color-therapy-game"
import ZenGardenGame from "@/components/games/zen-garden-game"
import FocusGame from "@/components/games/focus-game"

export default function GamesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <FloatingThemeToggle />

      <div className="container px-4 py-12 mx-auto mt-20">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 text-center">
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Gamepad2 className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold text-slate-800 dark:text-slate-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Stress Relief <span className="text-teal-500">Games</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Relax and unwind with our collection of calming, interactive games designed to reduce stress and promote
              mindfulness.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Tabs defaultValue="bubbles" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="bubbles" className="flex items-center space-x-2">
                  <Waves className="w-4 h-4" />
                  <span className="hidden sm:inline">Bubble Pop</span>
                </TabsTrigger>
                <TabsTrigger value="colors" className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Color Therapy</span>
                </TabsTrigger>
                <TabsTrigger value="garden" className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                  <span className="hidden sm:inline">Zen Garden</span>
                </TabsTrigger>
                <TabsTrigger value="focus" className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Focus</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bubbles">
                <Card className="border-teal-200 dark:border-teal-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Bubble Pop Meditation
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Pop the floating bubbles to release stress and find your inner calm
                      </p>
                    </div>
                    <BubblePopGame />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="colors">
                <Card className="border-teal-200 dark:border-teal-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Color Therapy Canvas
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Paint with soothing colors to express yourself and find peace
                      </p>
                    </div>
                    <ColorTherapyGame />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="garden">
                <Card className="border-teal-200 dark:border-teal-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Digital Zen Garden
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Create patterns in the sand and arrange stones for meditation
                      </p>
                    </div>
                    <ZenGardenGame />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="focus">
                <Card className="border-teal-200 dark:border-teal-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Mindful Focus Game
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Follow the moving circle to improve concentration and mindfulness
                      </p>
                    </div>
                    <FocusGame />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
