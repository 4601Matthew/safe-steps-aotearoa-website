import { getUsers, findUserById } from '../utils/storage.js'
import { verifyToken } from '../utils/crypto.js'

export async function handleGetMe(request, env, corsHeaders) {
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

function jsonResponse(data, corsHeaders = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })
}

