import express from 'express'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import { getUsers, saveUsers, updateUserRoles } from '../utils/database.js'

const router = express.Router()

// Get all users (admin only)
router.get('/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    const users = getUsers().map(({ passwordHash: _, ...user }) => user)
    res.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Failed to get users' })
  }
})

// Update user roles (admin only)
router.put('/users/:userId/roles', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { userId } = req.params
    const { roles } = req.body

    if (!Array.isArray(roles)) {
      return res.status(400).json({ error: 'Roles must be an array' })
    }

    const updatedUser = updateUserRoles(userId, roles)
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { passwordHash: _, ...userWithoutPassword } = updatedUser
    res.json({
      message: 'User roles updated successfully',
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Update roles error:', error)
    res.status(500).json({ error: 'Failed to update user roles' })
  }
})

export default router

