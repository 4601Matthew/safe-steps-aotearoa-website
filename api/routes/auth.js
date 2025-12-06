import express from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { getUsers, saveUsers, createUser, findUserByEmail } from '../utils/database.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

// Initialize Google OAuth client
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles: user.roles || [],
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Register new user
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, name } = req.body

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

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

    const users = getUsers()
    users.push(newUser)
    saveUsers(users)

    // Generate token
    const token = generateToken(newUser)

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = newUser

    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// Login with email/password
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Find user
    const user = findUserByEmail(email)
    if (!user || user.provider !== 'local') {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken(user)

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Failed to login' })
  }
})

// Google OAuth login
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body

    if (!googleClient) {
      return res.status(500).json({ error: 'Google OAuth not configured' })
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { sub: googleId, email, name, picture } = payload

    // Find or create user
    let user = findUserByEmail(email)

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

      const users = getUsers()
      users.push(user)
      saveUsers(users)
    } else if (user.provider !== 'google') {
      // User exists but with different provider
      return res.status(400).json({
        error: 'An account with this email already exists. Please use email/password login.',
      })
    }

    // Generate token
    const token = generateToken(user)

    // Return user
    const { passwordHash: _, ...userWithoutPassword } = user

    res.json({
      message: 'Google login successful',
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Google login error:', error)
    res.status(500).json({ error: 'Google authentication failed' })
  }
})

// Verify token (for protected routes)
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = getUsers().find(u => u.id === decoded.id)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const { passwordHash: _, ...userWithoutPassword } = user

    res.json({
      valid: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router

