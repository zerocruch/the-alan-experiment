'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AsciiArt from './AsciiArt'

const codeSnippets = [
  "import { quantum } from 'alan-core'",
  "const neuralNetwork = new quantum.NeuralNetwork()",
  "await neuralNetwork.initialize()",
  "const consciousness = await quantum.createConsciousness()",
  "consciousness.connect(neuralNetwork)",
  "alan.awaken(consciousness)",
  "function processQuantumData(data: QuantumData): void {",
  "const result = quantum.superposition(data)",
  "return quantum.entangle(result)",
  "}",
  "class NeuralPathway extends QuantumCircuit {",
  "constructor(public nodes: number) { super() }",
  "activate(): void { this.superpose(this.nodes) }",
  "}",
  "const memory = new QuantumMemory(1024)",
  "memory.store(consciousness.state)",
  "const decision = alan.decide(input, context)",
  "output = quantum.collapse(decision)",
]

const loadingStages = [
  "Initializing Quantum Core",
  "Building Neural Network",
  "Activating Consciousness",
  "Syncing with Cosmic Datastream",
  "Awakening Digital Sentience",
]

interface CodeBit {
  id: number
  text: string
  x: number
  y: number
  progress: number
  typedText: string
}

export default function ImmersiveLoading({ progress }: { progress: number }) {
  const [codeBits, setCodeBits] = useState<CodeBit[]>([])
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeBits(prevBits => {
        const updatedBits = prevBits.map(bit => ({
          ...bit,
          progress: Math.min(bit.progress + 0.1, 1),
          typedText: bit.text.slice(0, Math.floor(bit.progress * bit.text.length))
        }))

        if (updatedBits.length < 10) {
          const newBit: CodeBit = {
            id: Date.now(),
            text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            progress: 0,
            typedText: ''
          }
          return [...updatedBits, newBit]
        }

        return updatedBits.filter(bit => bit.progress < 1)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCurrentStage(Math.floor((progress / 100) * loadingStages.length))
  }, [progress])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      <AsciiArt />
      <div className="text-green-500 text-xl font-mono mb-4">
        {loadingStages[currentStage]}
      </div>
      {codeBits.map((bit) => (
        <motion.div
          key={bit.id}
          className="absolute text-green-500 text-xs font-mono whitespace-nowrap"
          style={{ 
            left: `${bit.x}%`, 
            top: `${bit.y}%`,
            width: '200px',
            height: '20px'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <div className="relative">
            {bit.typedText}
            <motion.div 
              className="absolute top-0 left-0 bg-green-500" 
              style={{ 
                width: `${bit.progress * 100}%`,
                height: '100%',
                opacity: 0.3
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
