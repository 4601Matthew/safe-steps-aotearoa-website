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
      // Verify token with API (checks expiration)
      authAPI.verify()
        .then((response) => {
          if (response.valid) {
            setUser(response.user)
            localStorage.setItem('user', JSON.stringify(response.user))
          } else {
            // Token expired or invalid, clear storage
            authAPI.logout()
            setUser(null)
          }
        })
        .catch(() => {
          // Token verification failed, clear storage
          authAPI.logout()
          setUser(null)
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

    // Set up periodic token verification (every 5 minutes)
    const verifyInterval = setInterval(() => {
      const currentToken = localStorage.getItem('token')
      if (currentToken) {
        authAPI.verify()
          .then((response) => {
            if (!response.valid) {
              // Token expired
              authAPI.logout()
              setUser(null)
            }
          })
          .catch(() => {
            authAPI.logout()
            setUser(null)
          })
      }
    }, 5 * 60 * 1000) // Check every 5 minutes

    return () => clearInterval(verifyInterval)
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
    if (!user || !user.roles || user.roles.length === 0) return false
    
    const userRole = user.roles[0] // Only one role allowed
    
    // Load roles and role hierarchy from localStorage (set by developers) or use default
    const storedRoles = localStorage.getItem('roles')
    const storedHierarchy = localStorage.getItem('roleHierarchy')
    
    let roles = ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin']
    let roleHierarchy = {
      'developer': ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      'administrator': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      'healthcare': ['healthcare'],
      'contractor': ['contractor'],
      'volunteer': ['volunteer'],
      'admin': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'], // Legacy admin support
    }
    
    if (storedRoles) {
      try {
        roles = JSON.parse(storedRoles)
      } catch (e) {
        console.error('Error parsing roles:', e)
      }
    }
    
    if (storedHierarchy) {
      try {
        roleHierarchy = JSON.parse(storedHierarchy)
      } catch (e) {
        console.error('Error parsing role hierarchy:', e)
      }
    }
    
    // Only check hierarchy if the user's role exists
    if (!roles.includes(userRole)) {
      return false
    }
    
    const allowedRoles = roleHierarchy[userRole] || []
    return allowedRoles.includes(requiredRole)
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

