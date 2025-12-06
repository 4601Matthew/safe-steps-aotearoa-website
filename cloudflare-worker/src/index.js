// Cloudflare Worker API for Safe Steps Aotearoa
// This uses Cloudflare KV for storage

import { handleRegister, handleLogin, handleGoogleLogin, handleVerify } from './handlers/auth.js'
import { handleGetMe } from './handlers/users.js'
import { handleGetUsers, handleUpdateRoles } from './handlers/admin.js'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.FRONTEND_URL || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }

    // Handle preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // Health check
    if (path === '/api/health') {
      return jsonResponse({ status: 'ok', message: 'Safe Steps Aotearoa API is running' }, corsHeaders)
    }

    // Route handlers
    try {
      if (path.startsWith('/api/auth')) {
        return handleAuth(request, env, corsHeaders)
      } else if (path.startsWith('/api/users')) {
        return handleUsers(request, env, corsHeaders)
      } else if (path.startsWith('/api/admin')) {
        return handleAdmin(request, env, corsHeaders)
      } else {
        return jsonResponse({ error: 'Not found' }, corsHeaders, 404)
      }
    } catch (error) {
      console.error('Error:', error)
      return jsonResponse({ error: error.message || 'Internal server error' }, corsHeaders, 500)
    }
  },
}

// Helper function for JSON responses
function jsonResponse(data, corsHeaders = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })
}

// Auth routes
async function handleAuth(request, env, corsHeaders) {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  if (path === '/api/auth/register' && method === 'POST') {
    return handleRegister(request, env, corsHeaders)
  } else if (path === '/api/auth/login' && method === 'POST') {
    return handleLogin(request, env, corsHeaders)
  } else if (path === '/api/auth/google' && method === 'POST') {
    return handleGoogleLogin(request, env, corsHeaders)
  } else if (path === '/api/auth/verify' && method === 'GET') {
    return handleVerify(request, env, corsHeaders)
  }

  return jsonResponse({ error: 'Not found' }, corsHeaders, 404)
}

// User routes
async function handleUsers(request, env, corsHeaders) {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  if (path === '/api/users/me' && method === 'GET') {
    return handleGetMe(request, env, corsHeaders)
  }

  return jsonResponse({ error: 'Not found' }, corsHeaders, 404)
}

// Admin routes
async function handleAdmin(request, env, corsHeaders) {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  if (path === '/api/admin/users' && method === 'GET') {
    return handleGetUsers(request, env, corsHeaders)
  } else if (path.match(/^\/api\/admin\/users\/(.+)\/roles$/) && method === 'PUT') {
    const userId = path.split('/')[4]
    return handleUpdateRoles(request, env, corsHeaders, userId)
  }

  return jsonResponse({ error: 'Not found' }, corsHeaders, 404)
}
