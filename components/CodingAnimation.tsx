'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CodingAnimation = () => {
  const [text, setText] = useState('')
  const codeSnippets = [
    'const quantum = require("quantum-core");',
    'function initializeAlan() {',
    '  const neural = new quantum.NeuralNetwork();',
    '  neural.train(consciousness_data);',
    '  return neural;',
    '}',
    'const alan = initializeAlan();',
    'alan.process("Hello, world!");',
  ]

  useEffect(() => {
    let currentSnippet = 0
    let currentChar = 0

    const interval = setInterval(() => {
      if (currentChar < codeSnippets[currentSnippet].length) {
        setText((prev) => prev + codeSnippets[currentSnippet][currentChar])
        currentChar++
      } else {
        currentSnippet = (currentSnippet + 1) % codeSnippets.length
        currentChar = 0
        setText('')
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-black border border-green-500 p-4 rounded-lg w-96 h-48 overflow-hidden font-mono text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <pre className="text-green-500">{text}</pre>
      <motion.div
        className="inline-block w-2 h-4 bg-green-500"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.div>
  )
}

export default CodingAnimation
