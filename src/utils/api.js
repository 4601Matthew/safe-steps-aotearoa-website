// API utility functions for frontend
// Uses relative URLs for Cloudflare Pages Functions (same domain as frontend)

const API_URL = import.meta.env.VITE_API_URL || '/api'

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
    
    // Handle non-JSON responses
    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      throw new Error(text || 'API request failed')
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    // If it's a network error, provide helpful message
    if (error.message === 'Failed to fetch' || 
        error.message.includes('NetworkError') ||
        error.message.includes('Network request failed') ||
        error.name === 'TypeError') {
      throw new Error('Cannot connect to API server. Please make sure the API is running at ' + API_URL)
    }
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
    const response = await apiRequest('/admin/users')
    // Handle both array response and object with users property
    return Array.isArray(response) ? response : (response.users || [])
  },

  updateUserRoles: async (userId, roles) => {
    return apiRequest(`/admin/users/${userId}/roles`, {
      method: 'PUT',
      body: JSON.stringify({ roles }),
    })
  },
}

