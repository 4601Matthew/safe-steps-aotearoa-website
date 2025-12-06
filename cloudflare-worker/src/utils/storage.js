// Storage utilities for Cloudflare Workers
// Uses KV store for user data

export async function getUsers(env) {
  try {
    const data = await env.USERS_KV.get('users')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading users:', error)
    return []
  }
}

export async function saveUsers(env, users) {
  try {
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

