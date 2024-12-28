'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MiniTerminal() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOutput([...output, `> ${input}`, processCommand(input)])
    setInput('')
  }

  const processCommand = (cmd: string): string => {
    switch (cmd.toLowerCase()) {
      case 'help':
        return 'Available commands: help, about, clear'
      case 'about':
        return 'Welcome to the Alan Experiment. Prepare to enter a world of advanced AI.'
      case 'clear':
        setOutput([])
        return ''
      default:
        return 'Command not recognized. Type "help" for available commands.'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black border-2 border-green-500 p-4 rounded-lg w-80 h-60 overflow-hidden"
    >
      <div className="h-48 overflow-y-auto mb-2">
        {output.map((line, index) => (
          <p key={index} className="text-green-500 text-sm">{line}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-green-500 mr-2">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent text-green-500 outline-none text-sm"
        />
      </form>
    </motion.div>
  )
}
