"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  ngoName: string
  ngoId: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // In a real app, these would come from the authentication system
  const ngoName = "Example NGO"
  const ngoId = "demo-ngo"

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, ngoName, ngoId }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

