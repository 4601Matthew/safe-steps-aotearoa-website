// Cloudflare Pages Function - handles all /api/* routes
// This automatically deploys with your Pages site

import { handleAuth, handleUsers, handleAdmin, handleHealth } from '../lib/handlers.js'

export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': env.FRONTEND_URL || request.headers.get('Origin') || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }

  // Handle preflight
  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Route to appropriate handler
    if (path === '/api/health') {
      return handleHealth(corsHeaders)
    } else if (path.startsWith('/api/auth')) {
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
}

function jsonResponse(data, corsHeaders = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })
}

