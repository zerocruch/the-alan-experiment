'use client'

import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ExternalLink, Users, Cpu, Banknote, Volume2, VolumeX } from 'lucide-react'
import { Howl } from 'howler'
import axios from 'axios'; 
import ParticleBackground from './ParticleBackground'
import MatrixRain from './MatrixRain'


const systemStats = {
  cpu: 'AMD EPYC 7763', 
  memory: '1TB DDR4 RAM', 
  storage: '100TB NVMe SSD', 
  uptime: '0:00:00', 
}

const formatUptime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}



const commandHistory = [
  { command: 'about()', output: 'This project revolves around creating a singular, high-functional, autonomous AI Agent modeled after Alan Turing, who will go on to create his own Fleet of AI to manage a cryptocurrency project that intended to become "The World’s Most Valuable Currency" on the Solana Blockchain. Alan (The Initial AI) will design a team of 4 AI assistants, each specializing in key areas like marketing, branding, community management, and strategy. The goal is to have these AIs work collaboratively to develop, launch, and manage the cryptocurrency, showcasing AI’s capability to operate as a human-like team in a modern digital ecosystem.' },
  { command: 'initialize_alan()', output: 'Alan initialization complete. Welcome, user.' },
  { command: 'system_status()', output: 'All systems operational. Quantum core stable.' },
  { command: 'connect_neural_network()', output: 'Neural network connection established.' },
]

const loreFragments = [
  "Project ALAN: Autonomous Linguistic Artificial Network",
  "Objective: Create world's most valuable cryptocurrency on Solana",
  "AI Team: 4 specialized assistants known as 'system'",
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
  'xd':'You found it you earn the $1,000,000',
}

export default function ElevatedTerminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(commandHistory)
  const [showCursor, setShowCursor] = useState(true)
  const [loreIndex, setLoreIndex] = useState(0)
  const [easterEggInput, setEasterEggInput] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  const [uptime, setUptime] = useState(0)
  const [last_update, setLastUpdate] = useState('')
  const [displayedOutput, setDisplayedOutput] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Fetch data from the API on page load
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.agentalan.org/api/data');
        if (response.data.data.length > 0) {
          const lastItem = response.data.data[response.data.data.length - 1];
          console.log('Last Item created_at:', lastItem.created_at);
          setLastUpdate(lastItem.created_at);
        }
        const newCommands = response.data.data.map((item: any) => ({
          command: `Action: ${item.action}`,
          output: `Agent: ${item.agent}\nData: ${JSON.stringify(item.data)}\nCreated At: ${new Date(item.created_at).toLocaleString()}`
        }));
        console.log(newCommands);
        setHistory((prevHistory) => {
          const existingCommands = new Set(prevHistory.map(item => item.output));
          const filteredNewCommands = newCommands.filter(item => !existingCommands.has(item.output));
          return [...prevHistory, ...filteredNewCommands];
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.agentalan.org/api/data?date=' + last_update);
        console.log('https://www.agentalan.org/api/data?date=' + last_update);
        console.log(response.data.data);
        //setLastUpdate(response.data.data[response.data.data.length - 1]['created_at']);
        if (response.data.data.length > 0) {
          const lastItem = response.data.data[response.data.data.length - 1];
          setLastUpdate(lastItem.created_at);
        }
        response.data.data.forEach((item: any) => {
          const newCommand = {
            command: `Action: ${item.action}`,
            output: `Agent: ${item.agent}\nData: ${JSON.stringify(item.data)}\nCreated At: ${new Date(item.created_at).toLocaleString()}`
          };
          setHistory((prevHistory) => [...prevHistory, newCommand]);
          //simulateTyping(newCommand.output); 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [last_update]);

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
    src: ['/sounds/SuccessNotif.mp3'],
    volume: 0.5,
  })
  const accessGrantedSound = new Howl({
    src: ['/sounds/AccessGrantedAudioF.mp3'],
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
    e.preventDefault();
    if (input.trim() === '') return;

    const newCommand = { command: input, output: processCommand(input) };
    //setHistory([...history, newCommand]);
    setHistory((prevHistory) => [...prevHistory, newCommand]);
    setInput('');
    if (soundEnabled) successSound.play();
    simulateTyping(newCommand.output); 
  }

  const simulateTyping = (output: string) => {
    let currentOutput = '';
    setDisplayedOutput((prev) => ({ ...prev, [history.length]: '' })); // Initialize for this command

    output.split('').forEach((char, charIndex) => {
      setTimeout(() => {
        currentOutput += char;
        setDisplayedOutput((prev) => ({ ...prev, [history.length]: currentOutput }));
      }, charIndex * 20); // Adjust typing speed here (100ms per character)
    });
  }

  const processCommand = (cmd: string): string => {
    switch (cmd.toLowerCase()) {
      case 'help':
        return 'Available commands: help, about, status, lore, team, objective, clear, sound'
      case 'about':
        return 'This project revolves around creating a singular, high-functional, autonomous AI Agent modeled after Alan Turing, who will go on to create his own Fleet of AI to manage a cryptocurrency project that intended to become "The World’s Most Valuable Currency" on the Solana Blockchain. Alan (The Initial AI) will design a team of 4 AI assistants, each specializing in key areas like marketing, branding, community management, and strategy. The goal is to have these AIs work collaboratively to develop, launch, and manage the cryptocurrency, showcasing AI’s capability to operate as a human-like team in a modern digital ecosystem.'
      case 'status':
        return `ALAN is fully operational.\nCPU: ${systemStats.cpu}\nMEMORY: ${systemStats.memory}\nSTORAGE: ${systemStats.storage}\nUPTIME: ${formatUptime(uptime)}`
        //return 'ALAN is fully operational. Cryptocurrency development in progress.'
      case 'lore':
        const fragment = loreFragments[loreIndex]
        setLoreIndex((prevIndex) => (prevIndex + 1) % loreFragments.length)
        return fragment
      case 'team':
        return 'The team : 4 AI assistants specializing in key areas of cryptocurrency development and management.'
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

  useEffect(() => {
    // Play success sound when the terminal is loaded
    if (soundEnabled) {
      accessGrantedSound.play();
    }

  }, []); // Empty dependency array to run only on mount

  return (

    <div className="min-h-screen bg-black text-green-500 p-4 font-mono relative">
          <ParticleBackground />
      <style>
        {`
          .matrix-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1; /* Ensure it stays behind other elements */
            pointer-events: none; /* Prevent interaction with the background */
          }

          .falling {
            color: rgba(0, 255, 0, 0.7); /* Matrix green color */
            font-family: monospace;
            font-size: 20px;
            white-space: nowrap;
            position: absolute;
            bottom: 100%;
            animation: fall linear infinite;
          }

          @keyframes fall {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(100vh);
            }
          }
        `}
      </style>
      <div className="matrix-background">
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index} className="falling" style={{ left: `${Math.random() * 100}vw`, animationDuration: `${Math.random() * 3 + 2}s` }}>
            {String.fromCharCode(Math.floor(Math.random() * 122) + 33)}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">ALAN Terminal v2.2</h1>
          <div className="flex items-center space-x-2">
            <Terminal size={24} />
            <span>System Interface</span>
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
                  {displayedOutput[index] ? (
                    displayedOutput[index].split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  ) : (
                    item.output.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  )}
                    
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
          <span className="flex items-center"><Users size={16} className="mr-1" /> Agents Status: Deployed</span>
          <span className="flex items-center"><Banknote size={16} className="mr-1" /> Project: Launched</span>
          <div className="w-full mt-2 flex justify-between">
            <a href="https://github.com/zerocruch/the-alan-experiment/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              Docs
            </a>
            <a href="https://x.com/aexonsol" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              X
            </a>
            <a href="https://x.com/aexagentalan" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              Agent Alan
            </a>
            <a href="https://pump.fun/coin/T2fKHPtso7fDafuUANAKB6W2d55CEPxFj1urrnwpump" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400">
              <ExternalLink size={16} className="mr-1" />
              CA: T2fKHPtso7fDafuUANAKB6W2d55CEPxFj1urrnwpump
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
