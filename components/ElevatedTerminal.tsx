'use client'

import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ExternalLink, Users, Cpu, Banknote, Volume2, VolumeX } from 'lucide-react'
import { Howl } from 'howler'

const systemStats = {
  cpu: 'QUANTUM_PROC_V1',
  memory: '1024TB QUANTUM RAM',
  storage: 'INFINITE NEURAL STORAGE',
  uptime: '0:00:00',
}

const formatUptime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}


const commandHistory = [
  { command: 'initialize_alan()', output: 'Alan initialization complete. Welcome, user.' },
  { command: 'system_status()', output: 'All systems operational. Quantum core stable.' },
  { command: 'connect_neural_network()', output: 'Neural network connection established.' },
]

const loreFragments = [
  "Project ALAN: Autonomous Linguistic Artificial Network",
  "Objective: Create world's most valuable cryptocurrency on Solana",
  "AI Team: 7 specialized assistants known as 'Gayboys'",
  "Key areas: Marketing, Development, Branding, Community Management, Strategy",
  "Inspiration: Alan Turing's visionary work in artificial intelligence",
  "Goal: Showcase AI's capability to operate as a human-like team",
  "Warning: Project details highly classified. Proceed with caution."
]

const easterEggs = {
  'konami': 'Up, Up, Down, Down, Left, Right, Left, Right, B, A',
  'pride': 'Love wins!',
  '42': 'The answer to life, the universe, and everything.',
  'turing': 'The imitation game begins...',
}

export default function ElevatedTerminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(commandHistory)
  const [showCursor, setShowCursor] = useState(true)
  const [loreIndex, setLoreIndex] = useState(0)
  const [easterEggInput, setEasterEggInput] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (true) {
      interval = setInterval(() => {
        setUptime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [])

  const keySound = new Howl({
    src: ['/sounds/key-press.mp3'],
    volume: 0.5,
  })

  const successSound = new Howl({
    src: ['/sounds/success.mp3'],
    volume: 0.5,
  })

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setEasterEggInput((prev) => (prev + e.key).slice(-20))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    Object.entries(easterEggs).forEach(([key, sequence]) => {
      if (easterEggInput.endsWith(key)) {
        setHistory((prev) => [...prev, { command: `Easter egg found: ${key}`, output: `Congratulations! You've unlocked: ${easterEggs[key as keyof typeof easterEggs]}` }])
        if (soundEnabled) successSound.play()
      }
    })
  }, [easterEggInput, soundEnabled])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    const newCommand = { command: input, output: processCommand(input) }
    setHistory([...history, newCommand])
    setInput('')
    if (soundEnabled) successSound.play()
  }

  const processCommand = (cmd: string): string => {
    switch (cmd.toLowerCase()) {
      case 'help':
        return 'Available commands: help, status, lore, team, objective, clear, sound'
      case 'status':
        return `ALAN is fully operational.\nCPU: ${systemStats.cpu}\nMEMORY: ${systemStats.memory}\nSTORAGE: ${systemStats.storage}\nUPTIME: ${formatUptime(uptime)}`
        //return 'ALAN is fully operational. Cryptocurrency development in progress.'
      case 'lore':
        const fragment = loreFragments[loreIndex]
        setLoreIndex((prevIndex) => (prevIndex + 1) % loreFragments.length)
        return fragment
      case 'team':
        return 'The Gayboys: 7 AI assistants specializing in key areas of cryptocurrency development and management.'
      case 'objective':
        return 'Create "The World\'s Most Valuable Currency" on the Solana Blockchain.'
      case 'clear':
        setTimeout(() => setHistory([]), 50);
        setTimeout(() => {
          setHistory(prevHistory => [...prevHistory, { command: 'clear', output: 'Terminal cleared.' }]);
        }, 200);
        return ''
      case 'sound':
        setSoundEnabled(!soundEnabled)
        return `Sound effects ${soundEnabled ? 'disabled' : 'enabled'}.`
      default:
        return `Command not recognized: ${cmd}. Type 'help' for available commands.`
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">ALAN Terminal v2.2</h1>
          <div className="flex items-center space-x-2">
            <Terminal size={24} />
            <span>Quantum-Enhanced AI Interface</span>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="ml-4">
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>
        </header>
        <main className="border-2 border-green-500 p-4 relative">
          <div ref={terminalRef} className="h-[60vh] overflow-y-auto mb-4">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2"
                >
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">$</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="pl-4 text-cyan-300">
                    {item.output.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                  
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-yellow-500 mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                if (soundEnabled) keySound.play()
              }}
              className="flex-grow bg-transparent outline-none"
              autoFocus
            />
            <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
              ▋
            </span>
          </form>
          <div className="absolute top-2 right-2 text-xs text-gray-500">
            {easterEggInput}
          </div>
        </main>
        <footer className="mt-4 flex flex-wrap justify-between text-sm">
          <span className="flex items-center"><Cpu size={16} className="mr-1" /> Quantum Core: Active</span>
          <span className="flex items-center"><Users size={16} className="mr-1" /> Gayboys: Connected</span>
          <span className="flex items-center"><Banknote size={16} className="mr-1" /> Project: In Development</span>
          <div className="w-full mt-2 flex justify-between">
            <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              DexScreener
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              Twitter
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              Chart
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              CA: 
            </a>
          </div>
        </footer>
      </div>
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-green-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  )
}
