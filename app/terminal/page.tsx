'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ElevatedTerminal from '@/components/ElevatedTerminal'


export default function TerminalPage() {
  const [showTerminal, setShowTerminal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTerminal(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {showTerminal ? (
        <motion.div
          key="terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <ElevatedTerminal />
        </motion.div>
      ) : (
        <motion.div
          key="loading"
          className="min-h-screen bg-black flex items-center justify-center"
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-green-500 text-4xl font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Entering ALAN Interface...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
  )
}
