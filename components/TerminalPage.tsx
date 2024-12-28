'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleVortex from './ParticleVortex'
import { Button } from '@/components/ui/button'

export default function TerminalPage() {
  const [output, setOutput] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
      setOutput(['Welcome to the Alan Terminal. Type "help" for available commands.'])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case 'help':
        return 'Available commands: help, about, links, clear'
      case 'about':
        return 'The Alan Experiment is a cutting-edge AI research project.'
      case 'links':
        return 'Useful links:\n- Documentation: https://docs.alanexperiment.com\n- GitHub: https://github.com/alanexperiment\n- Community: https://community.alanexperiment.com'
      case 'clear':
        setOutput([])
        return ''
      default:
        return `Command not recognized: ${command}`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = handleCommand(input)
    setOutput([...output, `> ${input}`, result])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-black text-green-500 flex justify-center items-center relative">
      <ParticleVortex />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl bg-black bg-opacity-80 p-6 border-2 border-green-500 z-10"
      >
        <div className="h-64 overflow-y-auto mb-4">
          {output.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-1"
            >
              {line}
            </motion.p>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-black text-green-500 border-2 border-green-500 p-2 mr-2"
            placeholder="Enter command..."
          />
          <Button type="submit" className="bg-green-500 text-black border-2 border-green-500">
            Submit
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
