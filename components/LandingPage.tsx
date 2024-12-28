'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingAnimation from './LoadingAnimation'
import ParticleBackground from './ParticleBackground'
import MatrixRain from './MatrixRain'

export default function LandingPage() {
  const router = useRouter()
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [subtitle, setSubtitle] = useState('')
  const fullSubtitle = "Explore the realm of advanced artificial intelligence"

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullSubtitle.length) {
        setSubtitle(prev => prev + fullSubtitle[i])
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [])

  const handleInitialize = () => {
    setShowPasswordPrompt(true)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'alan2023') {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 5000))
      router.push('/terminal')
    } else {
      setError('Incorrect. Alan remains silent. Try again.')
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <ParticleBackground />
      <MatrixRain />
      <AnimatePresence>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <motion.div
            className="z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold mb-6 text-green-500 glitch title-3d"
              data-text="THE ALAN EXPERIMENT"
            >
              THE ALAN EXPERIMENT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl text-green-400 mb-8 glitch-text"
              data-text={subtitle}
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {!showPasswordPrompt ? (
                <Button
                  onClick={handleInitialize}
                  className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg sharp-edges glitch-hover"
                  data-text="Initiate Sequence"
                >
                  Initiate Sequence
                </Button>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="mt-4">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Listen closely to Alan..."
                    className="mb-2 bg-black text-green-500 border-2 border-green-500 sharp-edges glitch-input"
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 sharp-edges glitch-hover"
                    data-text="Submit"
                  >
                    Submit
                  </Button>
                  {error && <p className="text-red-500 mt-2 glitch-text" data-text={error}>{error}</p>}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
