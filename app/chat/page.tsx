"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Loader2, User, Bot, Sparkles, Heart, Leaf } from "lucide-react"
import { Header } from "@/components/header"
import { FloatingThemeToggle } from "@/components/floating-theme-toggle"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from "react-markdown";

const suggestedPrompts = [
  "How can I reduce stress at work?",
  "Guide me through a 5-minute breathing exercise",
  "I'm feeling anxious, what can I do?",
  "How to start a daily meditation practice?",
  "Help me sleep better tonight",
  "Quick mindfulness exercise for busy days",
]

export default function Chat() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (response) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [response])

  const handleSubmit = async () => {
    if (input.trim() === "") return

    setLoading(true)
    setShowResponse(false)

    try {
      const res = await fetch("/api/gemini/textGenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()
      setResponse(data.result)
      setShowResponse(true)
    } catch (error) {
      setResponse("Something went wrong. Please try again.")
      setShowResponse(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <FloatingThemeToggle />

      <div className="container px-4 py-12 mx-auto mt-20">
        <motion.div
          className="max-w-4xl mx-auto"
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
              <div className="relative">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold text-slate-800 dark:text-slate-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Mindful <span className="text-teal-500">Assistant</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Powered by Gemini AI • Your personal guide to inner peace and mindfulness
            </motion.p>
          </div>

          <Card className="border-teal-200 dark:border-teal-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg">
            <CardContent className="p-0">
              {/* Chat messages container */}
              <div className="h-[60vh] overflow-y-auto p-6 space-y-6">
                {!input && !response && !loading ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                    >
                      <Bot className="w-12 h-12 text-teal-500" />
                    </motion.div>
                    <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-2">
                      Welcome to Your Mindful Space
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 max-w-md mb-6">
                      I'm here to help you with meditation, breathing exercises, stress relief, and mindfulness
                      practices.
                    </p>

                    {/* Suggested prompts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                      {suggestedPrompts.map((prompt, index) => (
                        <motion.button
                          key={index}
                          className="p-3 text-sm text-left bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 dark:hover:bg-teal-900 rounded-lg border border-teal-200 dark:border-teal-800 transition-colors duration-200"
                          onClick={() => handleSuggestedPrompt(prompt)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center">
                            <Leaf className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0" />
                            <span className="text-slate-700 dark:text-slate-300">{prompt}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* User message */}
                    {input && (
                      <motion.div
                        className="flex justify-end"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-start max-w-[85%] flex-row-reverse">
                          <motion.div
                            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 ml-3 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                          >
                            <User className="w-5 h-5 text-white" />
                          </motion.div>
                          <motion.div
                            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-2xl rounded-tr-md"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.05 }}
                          >
                            <div className="whitespace-pre-wrap leading-relaxed">{input}</div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Loading indicator */}
                    {loading && (
                      <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-md border border-teal-200 dark:border-teal-800">
                            <div className="flex items-center space-x-2">
                              <motion.div
                                className="w-2 h-2 bg-teal-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-teal-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-teal-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* AI Response */}
                    <AnimatePresence>
                      {showResponse && response && (
                        <motion.div
                          className="flex justify-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start max-w-[85%]">
                            <motion.div
                              className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            >
                              <Bot className="w-5 h-5 text-white" />
                            </motion.div>
                            <motion.div
                              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-4 rounded-2xl rounded-tl-md border border-teal-200 dark:border-teal-800 shadow-sm"
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.05 }}
                            >
                              <div className="whitespace-pre-wrap leading-relaxed">{response}</div>
                              <div className="flex items-center mt-2 text-xs text-slate-500 dark:text-slate-400">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Powered by Gemini
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input form */}
              <div className="border-t border-teal-200 dark:border-teal-800 p-4 bg-white/50 dark:bg-slate-900/50">
                <div className="flex space-x-3">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about meditation, breathing exercises, or stress relief..."
                    className="flex-grow min-h-[60px] max-h-[120px] bg-white/80 dark:bg-slate-800/80 border-teal-200 dark:border-teal-800 focus:border-teal-500 focus:ring-teal-500 dark:focus:border-teal-400 dark:focus:ring-teal-400 resize-none"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleSubmit}
                      disabled={loading || input.trim() === ""}
                      className="self-end bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-[60px] w-[60px] rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      <span className="sr-only">Send message</span>
                    </Button>
                  </motion.div>
                </div>
                <div className="flex items-center justify-center mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Press Enter to send • Shift + Enter for new line
                </div>
              </div>
            </CardContent>
          </Card>

          <motion.div
            className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="flex items-center justify-center">
              <Heart className="w-4 h-4 mr-1 text-pink-400" />
              Your conversations are private and secure
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
