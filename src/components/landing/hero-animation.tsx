"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-purple-900/20 to-black rounded-lg overflow-hidden">
      {/* App UI mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute inset-0 p-4"
      >
        <div className="bg-gray-900 rounded-lg h-full w-full overflow-hidden shadow-xl border border-purple-500/20">
          {/* App Header */}
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm font-medium">NoteGenius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            </div>
          </div>

          {/* App Content */}
          <div className="p-4 flex gap-4 h-[calc(100%-4rem)]">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 rounded-lg p-3 flex flex-col gap-2">
              <div className="bg-purple-600 rounded-lg p-2 text-xs font-medium">All Notes</div>
              <div className="bg-gray-700 rounded-lg p-2 text-xs">Work</div>
              <div className="bg-gray-700 rounded-lg p-2 text-xs">Personal</div>
              <div className="bg-gray-700 rounded-lg p-2 text-xs">Ideas</div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Note Title */}
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="w-3/4 h-6 bg-gray-700 rounded"></div>
              </div>

              {/* Note Content */}
              <div className="flex-1 bg-gray-800 rounded-lg p-3 flex flex-col gap-2">
                <div className="w-full h-4 bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-700 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
              </div>

              {/* AI Summary */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isVisible ? [0, 1, 1] : 0,
                  scale: isVisible ? [0.95, 1.02, 1] : 0.95,
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.5,
                  times: [0, 0.7, 1],
                }}
                className="bg-purple-900/50 rounded-lg p-3 border border-purple-500/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <div className="text-xs font-medium text-purple-300">AI Summary</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="w-full h-3 bg-purple-800/50 rounded"></div>
                  <div className="w-full h-3 bg-purple-800/50 rounded"></div>
                  <div className="w-2/3 h-3 bg-purple-800/50 rounded"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating elements for decoration */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: isVisible ? 1 : 0, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute top-10 left-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute bottom-10 right-10 w-20 h-20 bg-purple-600/20 rounded-full blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? [0, 0.5, 0.3] : 0,
          scale: isVisible ? [0.8, 1.1, 1] : 0.8,
        }}
        transition={{
          duration: 2,
          delay: 1.2,
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
      />
    </div>
  )
}
