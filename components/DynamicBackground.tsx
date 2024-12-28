'use client'

import { useEffect, useState } from 'react'

export default function DynamicBackground() {
  const [hue, setHue] = useState(120) // Start with green hue

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundColor: `hsl(${hue}, 100%, 2%)`,
        transition: 'background-color 0.5s ease',
      }}
    />
  )
}
