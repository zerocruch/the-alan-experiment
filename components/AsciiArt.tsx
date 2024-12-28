'use client'

import { useState, useEffect } from 'react'

const asciiFrames = [
  `
   _____
  /     \\
 /       \\
|   O O   |
|    <    |
 \\  ___  /
  \\_____/
  `,
  `
   _____
  /     \\
 /       \\
|   - -   |
|    <    |
 \\  ___  /
  \\_____/
  `,
]

export default function AsciiArt() {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % asciiFrames.length)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <pre className="text-green-500 text-xs whitespace-pre font-mono">
      {asciiFrames[frameIndex]}
    </pre>
  )
}
