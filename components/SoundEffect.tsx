'use client'

import { useEffect, useRef } from 'react'

type SoundEffectProps = {
  src: string
  volume?: number
}

export default function SoundEffect({ src, volume = 0.5 }: SoundEffectProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.volume = volume
  }, [src, volume])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  return { play }
}
