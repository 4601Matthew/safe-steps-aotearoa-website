import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      // Verify token with API
      authAPI.verify()
        .then((response) => {
          if (response.valid) {
            setUser(response.user)
            localStorage.setItem('user', JSON.stringify(response.user))
          } else {
            // Token invalid, clear storage
            authAPI.logout()
          }
        })
        .catch(() => {
          // Token verification failed, clear storage
          authAPI.logout()
        })
        .finally(() => {
          setLoading(false)
        })
    } else if (storedUser) {
      // Fallback to stored user if no token (for backward compatibility)
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error loading user session:', error)
        localStorage.removeItem('user')
      }
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem('token', token)
    }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    authAPI.logout()
    setUser(null)
  }

  const hasAccess = (requiredRole) => {
    if (!user) return false
    if (user.roles?.includes('admin')) return true // Admins have access to everything
    return user.roles?.includes(requiredRole)
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

