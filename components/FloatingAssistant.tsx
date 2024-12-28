'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'

const messages = [
  "Did you know? The Gayboys are always watching.",
  "Try the Konami code for a surprise!",
  "Alan Turing would be proud of our progress.",
  "The future of currency is being shaped right now.",
  "Have you explored all the terminal commands?",
]

export default function FloatingAssistant() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const showAssistant = () => {
      setIsVisible(true)
      setMessage(messages[Math.floor(Math.random() * messages.length)])
      setTimeout(() => setIsVisible(false), 10000)
    }

    const interval = setInterval(showAssistant, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-green-500 text-black p-4 rounded-lg shadow-lg max-w-sm"
        >
          <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2">
            <X size={16} />
          </button>
          <div className="flex items-start">
            <MessageSquare className="mr-2 mt-1" />
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
