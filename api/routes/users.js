import express from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { getUsers, findUserById } from '../utils/database.js'

const router = express.Router()

// Get current user profile
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = findUserById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { passwordHash: _, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Failed to get user' })
  }
})

export default router

