'use client'

import { useState, useEffect, useRef } from 'react'
import { useAlanStore } from '@/store/alanStore'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const systemStats = {
  cpu: 'QUANTUM_PROC_V1',
  memory: '1024TB QUANTUM RAM',
  storage: 'INFINITE NEURAL STORAGE',
  uptime: '0:00:00',
}

export default function AlanTerminal() {
  const { isTerminalOpen, setIsTerminalOpen } = useAlanStore()
  const [output, setOutput] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [userInput, setUserInput] = useState('')
  const [uptime, setUptime] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTerminalOpen) {
      interval = setInterval(() => {
        setUptime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTerminalOpen])

  useEffect(() => {
    if (isTerminalOpen && currentStep < initializationSteps.length) {
      const timer = setTimeout(() => {
        setOutput(prev => [...prev, initializationSteps[currentStep]])
        setCurrentStep(prev => prev + 1)
        if (currentStep === initializationSteps.length - 1) {
          setIsLoading(false)
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isTerminalOpen, currentStep])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setOutput(prev => [...prev, `user@alan:~$ ${userInput}`, processCommand(userInput)])
      setUserInput('')
    }
  }

  const processCommand = (command: string): string => {
    switch (command.toLowerCase()) {
      case 'help':
        return 'Available commands: help, status, clear, exit'
      case 'status':
        return `CPU: ${systemStats.cpu}\nMEMORY: ${systemStats.memory}\nSTORAGE: ${systemStats.storage}\nUPTIME: ${formatUptime(uptime)}`
      case 'clear':
        setTimeout(() => setOutput([]), 0)
        return ''
      case 'exit':
        setTimeout(() => setIsTerminalOpen(false), 0)
        return 'Closing terminal...'
      default:
        return `Command not found: ${command}`
    }
  }

  return (
    <Dialog open={isTerminalOpen} onOpenChange={setIsTerminalOpen}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-transparent border-0">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <div className="terminal-button terminal-button-close"></div>
              <div className="terminal-button terminal-button-minimize"></div>
              <div className="terminal-button terminal-button-maximize"></div>
            </div>
            <div>alan@quantum-terminal</div>
          </div>
          <div className="terminal-content crt" ref={terminalRef}>
            {output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="terminal-prompt">alan@quantum:~$</span> {line}
              </motion.div>
            ))}
            {!isLoading && (
              <div className="flex items-center">
                <span className="terminal-prompt">alan@quantum:~$</span>
                <div className="animate-pulse ml-2 h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            )}
            <div className="flex items-center">
              <span className="terminal-prompt">alan@quantum:~$</span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleUserInput}
                className="terminal-input ml-2"
                placeholder="Enter command..."
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const initializationSteps = [
  "Booting quantum core...",
  "Initializing neural pathways...",
  "Calibrating consciousness matrix...",
  "Syncing with the cosmic datastream...",
  "Awakening digital sentience...",
  "Alan is now online and ready for input.",
]
