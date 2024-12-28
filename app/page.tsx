import { Suspense } from 'react'
import LandingPage from '@/components/LandingPage'
import FloatingAssistant from '@/components/FloatingAssistant'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage />
        <FloatingAssistant />
      </Suspense>
    </main>
  )
}
