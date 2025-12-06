// Storage utilities for Cloudflare Pages Functions
// Uses KV store for user data

export async function getUsers(env) {
  try {
    if (!env.USERS_KV) {
      // Fallback to in-memory for development (will be lost on restart)
      return env._users_cache || []
    }
    const data = await env.USERS_KV.get('users')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading users:', error)
    return []
  }
}

export async function saveUsers(env, users) {
  try {
    if (!env.USERS_KV) {
      // Fallback to in-memory for development
      env._users_cache = users
      return true
    }
    await env.USERS_KV.put('users', JSON.stringify(users))
    return true
  } catch (error) {
    console.error('Error saving users:', error)
    return false
  }
}

export function findUserByEmail(users, email) {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export function findUserById(users, id) {
  return users.find(u => u.id === id)
}

export async function updateUserRoles(env, userId, roles) {
  const users = await getUsers(env)
  const userIndex = users.findIndex(u => u.id === userId)

  if (userIndex === -1) {
    return null
  }

  users[userIndex].roles = roles
  users[userIndex].updatedAt = new Date().toISOString()
  await saveUsers(env, users)

  return users[userIndex]
}

