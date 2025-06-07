"use client"

import { motion } from "framer-motion"

export default function ZenIllustration() {
  return (
    <div className="relative w-full max-w-3xl h-[400px] md:h-[500px]">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden">
        {/* Sun/Moon */}
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-amber-200 dark:bg-slate-300"
          style={{ top: "15%", left: "75%" }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        {/* Clouds */}
        <motion.div
          className="absolute w-32 h-12 bg-white dark:bg-slate-600 rounded-full opacity-80"
          style={{ top: "20%", left: "20%" }}
          animate={{ x: [0, 20, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-24 h-10 bg-white dark:bg-slate-600 rounded-full opacity-70"
          style={{ top: "15%", left: "50%" }}
          animate={{ x: [0, -15, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Mountains */}
      <motion.div
        className="absolute bottom-0 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <svg viewBox="0 0 1200 300" className="w-full">
          <path
            d="M0,300 L0,150 Q300,50 600,200 T1200,100 L1200,300 Z"
            fill="#4B5563"
            className="dark:fill-slate-700"
          />
          <path
            d="M0,300 L0,200 Q400,100 800,180 T1200,150 L1200,300 Z"
            fill="#6B7280"
            className="dark:fill-slate-800"
          />
          <path
            d="M0,300 L0,250 Q200,200 400,220 T800,200 T1200,250 L1200,300 Z"
            fill="#9CA3AF"
            className="dark:fill-slate-900"
          />
        </svg>
      </motion.div>

      {/* Water */}
      <motion.div
        className="absolute bottom-0 w-full h-1/4 bg-teal-300 dark:bg-teal-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {/* Water ripples */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-1 bg-white dark:bg-teal-700 opacity-30"
            style={{ bottom: `${i * 15 + 10}%` }}
            animate={{
              x: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3 + i,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Lotus flower */}
      <motion.div
        className="absolute"
        style={{ bottom: "20%", left: "50%", marginLeft: "-50px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {/* Lotus petals */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-8 bg-pink-200 dark:bg-pink-800 rounded-full origin-bottom"
            style={{
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: "center bottom",
            }}
            animate={{
              scaleY: [1, 1.05, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Lotus center */}
        <motion.div
          className="absolute w-10 h-10 bg-yellow-300 dark:bg-yellow-600 rounded-full"
          style={{ top: "-5px", left: "50%", marginLeft: "-20px" }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Zen stones */}
      <motion.div
        className="absolute"
        style={{ bottom: "15%", left: "30%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.div
          className="w-12 h-6 bg-gray-600 dark:bg-gray-700 rounded-full"
          animate={{ y: [0, -2, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-10 h-5 bg-gray-500 dark:bg-gray-600 rounded-full mt-[-2px]"
          animate={{ y: [0, -1, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3.5,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-8 h-4 bg-gray-400 dark:bg-gray-500 rounded-full mt-[-2px]"
          animate={{ y: [0, -1.5, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Zen stones on the right */}
      <motion.div
        className="absolute"
        style={{ bottom: "15%", right: "25%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="w-10 h-5 bg-gray-600 dark:bg-gray-700 rounded-full"
          animate={{ y: [0, -1.5, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3.7,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-8 h-4 bg-gray-500 dark:bg-gray-600 rounded-full mt-[-2px]"
          animate={{ y: [0, -1, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3.2,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Birds */}
      <motion.div
        className="absolute"
        style={{ top: "30%", left: "10%" }}
        animate={{
          x: [0, 500],
          y: [0, -50, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "linear",
        }}
      >
        <svg width="40" height="20" viewBox="0 0 40 20">
          <path
            d="M0,10 Q10,0 20,10 Q30,0 40,10"
            fill="none"
            stroke="#475569"
            strokeWidth="2"
            className="dark:stroke-slate-400"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "25%", left: "15%" }}
        animate={{
          x: [0, 400],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 25,
          ease: "linear",
          delay: 2,
        }}
      >
        <svg width="30" height="15" viewBox="0 0 30 15">
          <path
            d="M0,7.5 Q7.5,0 15,7.5 Q22.5,0 30,7.5"
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
            className="dark:stroke-slate-400"
          />
        </svg>
      </motion.div>
    </div>
  )
}
