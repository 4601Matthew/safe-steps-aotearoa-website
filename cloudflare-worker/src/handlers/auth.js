import { getUsers, saveUsers, findUserByEmail } from '../utils/storage.js'
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../utils/crypto.js'

export async function handleRegister(request, env, corsHeaders) {
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
    const token = generateToken(newUser, env.JWT_SECRET)

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

export async function handleLogin(request, env, corsHeaders) {
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
    const token = generateToken(user, env.JWT_SECRET)

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

export async function handleGoogleLogin(request, env, corsHeaders) {
  try {
    const body = await request.json()
    const { credential } = body

    if (!credential) {
      return jsonResponse({ error: 'Google credential required' }, corsHeaders, 400)
    }

    // Verify Google token (simplified - in production, verify properly)
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
    const token = generateToken(user, env.JWT_SECRET)

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

export async function handleVerify(request, env, corsHeaders) {
  try {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return jsonResponse({ error: 'No token provided' }, corsHeaders, 401)
    }

    const decoded = verifyToken(token, env.JWT_SECRET)
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

function jsonResponse(data, corsHeaders = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })
}

