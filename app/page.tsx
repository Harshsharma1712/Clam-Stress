"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Wind, Droplets, Sun } from "lucide-react"
import ZenIllustration from "@/components/zen-illustration"
import BreathingCircle from "@/components/breathing-circle"
import { Header } from "@/components/header"
import Link from "next/link"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <div className="container px-4 py-12 mx-auto mt-20">
        {/* Hero Section */}
        <motion.div
          className="flex flex-col items-center justify-center py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Calm<span className="text-teal-500">-stress</span>
          </motion.h1>
          <motion.p
            className="max-w-2xl mt-6 text-xl text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Find your inner peace through guided meditation, breathing exercises, and calming visualizations.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            
            <Link href="/chat" className="bg-teal-500 hover:bg-teal-600 text-white rounded-md text-xl p-3">
              Chat with our coach
            </Link>

            {/* <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
              Chat with our coach
            </Button> */}

            {/* <Button
              size="lg"
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950"
            >
              Learn More
            </Button> */}

          </motion.div>
        </motion.div>

        {/* Illustration Section */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="flex justify-center">
            <ZenIllustration />
          </div>
        </motion.div>

        {/* Breathing Exercise */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="mb-8 text-3xl font-semibold text-center text-slate-800 dark:text-slate-100">
            Take a Moment to Breathe
          </h2>
          <div className="flex justify-center">
            <BreathingCircle />
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="mb-12 text-3xl font-semibold text-center text-slate-800 dark:text-slate-100">
            Find Your Path to Tranquility
          </h2>

          <Tabs defaultValue="nature" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="nature">
                <Leaf className="w-5 h-5 mr-2" />
                Nature
              </TabsTrigger>
              <TabsTrigger value="breath">
                <Wind className="w-5 h-5 mr-2" />
                Breath
              </TabsTrigger>
              <TabsTrigger value="water">
                <Droplets className="w-5 h-5 mr-2" />
                Water
              </TabsTrigger>
              <TabsTrigger value="light">
                <Sun className="w-5 h-5 mr-2" />
                Light
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nature" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-2xl font-medium text-slate-800 dark:text-slate-100">
                        Connect with Nature
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Even in the darkest seasons of life, nature stands as a gentle reminder that healing is possible. When the world feels too loud and heavy, step outside—feel the sun warm your skin, hear the quiet rustle of leaves, and breathe with the rhythm of the earth.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 4,
                          ease: "easeInOut",
                        }}
                        className="relative w-48 h-48 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center"
                      >
                        <Leaf className="w-24 h-24 text-teal-500" />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breath" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-2xl font-medium text-slate-800 dark:text-slate-100">
                        Mindful Breathing
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Mindful breathing is a simple yet powerful tool that brings you back to the present moment, especially when everything feels overwhelming. By gently focusing on your breath—inhaling slowly, holding for a moment, and exhaling with intention—you can quiet the noise in your mind, slow your racing thoughts, and reconnect with a sense of inner peace.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 4,
                          ease: "easeInOut",
                        }}
                        className="relative w-48 h-48 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                      >
                        <Wind className="w-24 h-24 text-blue-500" />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="water" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-2xl font-medium text-slate-800 dark:text-slate-100">Flow Like Water</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        “Flow like water” is a reminder that true strength often lies in softness and surrender. Just as water adapts to every shape, moves past every obstacle, and carves its path over time, so too can we learn to navigate our struggles with quiet resilience.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 6,
                          ease: "easeInOut",
                        }}
                        className="relative w-48 h-48 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center"
                      >
                        <Droplets className="w-24 h-24 text-cyan-500" />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="light" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-2xl font-medium text-slate-800 dark:text-slate-100">Inner Light</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Even in your darkest moments, there is a quiet flame inside you—a steady glow of strength, wisdom, and hope. Tune into that inner light through calm reflection and gentle awareness, allowing it to guide your thoughts, uplift your spirit, and remind you that you are never truly lost.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{
                          opacity: [0.8, 1, 0.8],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 3,
                          ease: "easeInOut",
                        }}
                        className="relative w-48 h-48 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center"
                      >
                        <Sun className="w-24 h-24 text-amber-500" />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
