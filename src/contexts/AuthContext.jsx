import { createContext, useContext, useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'

const AuthContext = createContext()

// Encryption key - in production, this should be stored securely
// For now, using a simple key. In production, use environment variables
const ENCRYPTION_KEY = process.env.VITE_ENCRYPTION_KEY || 'safe-steps-aotearoa-2024-secure-key'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const decrypted = decryptData(storedUser)
        setUser(decrypted)
      } catch (error) {
        console.error('Error loading user session:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
  }

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }

  const login = (userData) => {
    const userWithTimestamp = {
      ...userData,
      loginTime: new Date().toISOString(),
    }
    const encrypted = encryptData(userWithTimestamp)
    localStorage.setItem('user', encrypted)
    setUser(userWithTimestamp)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const hasAccess = (requiredRole) => {
    if (!user) return false
    if (user.role === 'admin') return true // Admins have access to everything
    return user.roles?.includes(requiredRole) || user.role === requiredRole
  }

  const value = {
    user,
    login,
    logout,
    hasAccess,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

