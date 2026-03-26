'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type User = {
  name: string
  unit: string
  email: string
}

type UserContextType = {
  user: User | null
  setUser: (u: User | null) => void
  logout: () => void
  votes: Record<string, number>   // enqueteId -> optionIndex
  setVote: (enqueteId: string, optionIndex: number) => void
  myReservas: string[]            // ids das reservas feitas (mock)
  addReserva: (id: string) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [myReservas, setMyReservas] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mc_user')
      if (stored) setUserState(JSON.parse(stored))
      const storedVotes = localStorage.getItem('mc_votes')
      if (storedVotes) setVotes(JSON.parse(storedVotes))
      const storedReservas = localStorage.getItem('mc_reservas')
      if (storedReservas) setMyReservas(JSON.parse(storedReservas))
    } catch {
      // ignore
    }
  }, [])

  const setUser = (u: User | null) => {
    setUserState(u)
    if (u) localStorage.setItem('mc_user', JSON.stringify(u))
    else localStorage.removeItem('mc_user')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mc_user')
  }

  const setVote = (enqueteId: string, optionIndex: number) => {
    const updated = { ...votes, [enqueteId]: optionIndex }
    setVotes(updated)
    localStorage.setItem('mc_votes', JSON.stringify(updated))
  }

  const addReserva = (id: string) => {
    const updated = [...myReservas, id]
    setMyReservas(updated)
    localStorage.setItem('mc_reservas', JSON.stringify(updated))
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, votes, setVote, myReservas, addReserva }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
