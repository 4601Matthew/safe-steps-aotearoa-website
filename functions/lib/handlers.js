// Request handlers for Cloudflare Pages Functions

import { getUsers, saveUsers, findUserByEmail, findUserById, updateUserRoles } from './storage.js'
import { hashPassword, verifyPassword, generateToken, verifyToken } from './crypto.js'

// Helper for JSON responses
function jsonResponse(data, corsHeaders = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })
}

// Health check
export async function handleHealth(corsHeaders) {
  return jsonResponse({ 
    status: 'ok', 
    message: 'Safe Steps Aotearoa API is running' 
  }, corsHeaders)
}

// Auth handlers
export async function handleAuth(request, env, corsHeaders) {
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

async function handleRegister(request, env, corsHeaders) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validation
    if (!email || !password || !name) {
      return jsonResponse({ error: 'Missing required fields' }, corsHeaders, 400)
    }

    if (password.length < 6) {
      return jsonResponse({ error: 'Password must be at least 6 characters' }, corsHeaders, 400)
    }

    // Check if user exists
    const users = await getUsers(env)
    if (findUserByEmail(users, email)) {
      return jsonResponse({ error: 'User with this email already exists' }, corsHeaders, 400)
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const newUser = {
      id: Date.now().toString(),
      email,
      passwordHash,
      name,
      roles: [],
      provider: 'local',
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    await saveUsers(env, users)

    // Generate token
    const token = generateToken(newUser, env.JWT_SECRET || 'default-secret-change-in-production')

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = newUser

    return jsonResponse({
      message: 'User created successfully',
      user: userWithoutPassword,
      token,
    }, corsHeaders, 201)
  } catch (error) {
    console.error('Registration error:', error)
    return jsonResponse({ error: 'Failed to create user' }, corsHeaders, 500)
  }
}

async function handleLogin(request, env, corsHeaders) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return jsonResponse({ error: 'Email and password required' }, corsHeaders, 400)
    }

    // Find user
    const users = await getUsers(env)
    const user = findUserByEmail(users, email)

    if (!user || user.provider !== 'local') {
      return jsonResponse({ error: 'Invalid email or password' }, corsHeaders, 401)
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return jsonResponse({ error: 'Invalid email or password' }, corsHeaders, 401)
    }

    // Generate token
    const token = generateToken(user, env.JWT_SECRET || 'default-secret-change-in-production')

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user

    return jsonResponse({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    }, corsHeaders)
  } catch (error) {
    console.error('Login error:', error)
    return jsonResponse({ error: 'Failed to login' }, corsHeaders, 500)
  }
}

async function handleGoogleLogin(request, env, corsHeaders) {
  try {
    const body = await request.json()
    const { credential } = body

    if (!credential) {
      return jsonResponse({ error: 'Google credential required' }, corsHeaders, 400)
    }

    // Decode Google token
    const base64Url = credential.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    const googleUser = JSON.parse(jsonPayload)
    const { sub: googleId, email, name, picture } = googleUser

    // Find or create user
    const users = await getUsers(env)
    let user = findUserByEmail(users, email)

    if (!user) {
      // Create new user from Google
      user = {
        id: googleId,
        email,
        name,
        picture,
        roles: [],
        provider: 'google',
        createdAt: new Date().toISOString(),
      }
      users.push(user)
      await saveUsers(env, users)
    } else if (user.provider !== 'google') {
      return jsonResponse({
        error: 'An account with this email already exists. Please use email/password login.',
      }, corsHeaders, 400)
    }

    // Generate token
    const token = generateToken(user, env.JWT_SECRET || 'default-secret-change-in-production')

    // Return user
    const { passwordHash: _, ...userWithoutPassword } = user

    return jsonResponse({
      message: 'Google login successful',
      user: userWithoutPassword,
      token,
    }, corsHeaders)
  } catch (error) {
    console.error('Google login error:', error)
    return jsonResponse({ error: 'Google authentication failed' }, corsHeaders, 500)
  }
}

async function handleVerify(request, env, corsHeaders) {
  try {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return jsonResponse({ error: 'No token provided' }, corsHeaders, 401)
    }

    const decoded = verifyToken(token, env.JWT_SECRET || 'default-secret-change-in-production')
    if (!decoded) {
      return jsonResponse({ error: 'Invalid token' }, corsHeaders, 401)
    }

    const users = await getUsers(env)
    const user = users.find(u => u.id === decoded.id)

    if (!user) {
      return jsonResponse({ error: 'User not found' }, corsHeaders, 401)
    }

    const { passwordHash: _, ...userWithoutPassword } = user

    return jsonResponse({
      valid: true,
      user: userWithoutPassword,
    }, corsHeaders)
  } catch (error) {
    return jsonResponse({ error: 'Invalid token' }, corsHeaders, 401)
  }
}

// User handlers
export async function handleUsers(request, env, corsHeaders) {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  if (path === '/api/users/me' && method === 'GET') {
    return handleGetMe(request, env, corsHeaders)
  }

  return jsonResponse({ error: 'Not found' }, corsHeaders, 404)
}

async function handleGetMe(request, env, corsHeaders) {
  try {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return jsonResponse({ error: 'No token provided' }, corsHeaders, 401)
    }

    const decoded = verifyToken(token, env.JWT_SECRET || 'default-secret-change-in-production')
    if (!decoded) {
      return jsonResponse({ error: 'Invalid token' }, corsHeaders, 401)
    }

    const users = await getUsers(env)
    const user = findUserById(users, decoded.id)

    if (!user) {
      return jsonResponse({ error: 'User not found' }, corsHeaders, 404)
    }

    const { passwordHash: _, ...userWithoutPassword } = user
    return jsonResponse(userWithoutPassword, corsHeaders)
  } catch (error) {
    console.error('Get user error:', error)
    return jsonResponse({ error: 'Failed to get user' }, corsHeaders, 500)
  }
}

// Admin handlers
export async function handleAdmin(request, env, corsHeaders) {
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

async function handleGetUsers(request, env, corsHeaders) {
  try {
    // Verify admin access
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return jsonResponse({ error: 'No token provided' }, corsHeaders, 401)
    }

    const decoded = verifyToken(token, env.JWT_SECRET || 'default-secret-change-in-production')
    if (!decoded || !decoded.roles?.includes('admin')) {
      return jsonResponse({ error: 'Admin access required' }, corsHeaders, 403)
    }

    const users = await getUsers(env)
    const safeUsers = users.map(({ passwordHash: _, ...user }) => user)
    return jsonResponse(safeUsers, corsHeaders)
  } catch (error) {
    console.error('Get users error:', error)
    return jsonResponse({ error: 'Failed to get users' }, corsHeaders, 500)
  }
}

async function handleUpdateRoles(request, env, corsHeaders, userId) {
  try {
    // Verify admin access
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return jsonResponse({ error: 'No token provided' }, corsHeaders, 401)
    }

    const decoded = verifyToken(token, env.JWT_SECRET || 'default-secret-change-in-production')
    if (!decoded || !decoded.roles?.includes('admin')) {
      return jsonResponse({ error: 'Admin access required' }, corsHeaders, 403)
    }

    const body = await request.json()
    const { roles } = body

    if (!Array.isArray(roles)) {
      return jsonResponse({ error: 'Roles must be an array' }, corsHeaders, 400)
    }

    const updatedUser = await updateUserRoles(env, userId, roles)
    if (!updatedUser) {
      return jsonResponse({ error: 'User not found' }, corsHeaders, 404)
    }

    const { passwordHash: _, ...userWithoutPassword } = updatedUser
    return jsonResponse({
      message: 'User roles updated successfully',
      user: userWithoutPassword,
    }, corsHeaders)
  } catch (error) {
    console.error('Update roles error:', error)
    return jsonResponse({ error: 'Failed to update user roles' }, corsHeaders, 500)
  }
}

