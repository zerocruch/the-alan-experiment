import { create } from 'zustand'

type AlanStore = {
  isTerminalOpen: boolean
  setIsTerminalOpen: (isOpen: boolean) => void
}

export const useAlanStore = create<AlanStore>((set) => ({
  isTerminalOpen: false,
  setIsTerminalOpen: (isOpen) => set({ isTerminalOpen: isOpen }),
}))
