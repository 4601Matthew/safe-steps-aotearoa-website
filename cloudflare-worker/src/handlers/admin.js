import { getUsers, updateUserRoles } from '../utils/storage.js'
import { verifyToken } from '../utils/crypto.js'

export async function handleGetUsers(request, env, corsHeaders) {
  try {
    // Verify admin access
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return jsonResponse({ error: 'No token provided' }, corsHeaders, 401)
    }

    const decoded = verifyToken(token, env.JWT_SECRET)
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

export async function handleUpdateRoles(request, env, corsHeaders, userId) {
  try {
    // Verify admin access
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return jsonResponse({ error: 'No token provided' }, corsHeaders, 401)
    }

    const decoded = verifyToken(token, env.JWT_SECRET)
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

function jsonResponse(data, corsHeaders = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })
}

