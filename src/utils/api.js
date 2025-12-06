// API utility functions for frontend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Auth API
export const authAPI = {
  register: async (email, password, name) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    return response
  },

  login: async (email, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    return response
  },

  googleLogin: async (credential) => {
    const response = await apiRequest('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    })
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    return response
  },

  verify: async () => {
    return apiRequest('/auth/verify')
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

// User API
export const userAPI = {
  getMe: async () => {
    return apiRequest('/users/me')
  },
}

// Admin API
export const adminAPI = {
  getUsers: async () => {
    return apiRequest('/admin/users')
  },

  updateUserRoles: async (userId, roles) => {
    return apiRequest(`/admin/users/${userId}/roles`, {
      method: 'PUT',
      body: JSON.stringify({ roles }),
    })
  },
}

