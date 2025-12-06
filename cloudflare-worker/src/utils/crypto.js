// Crypto utilities for Cloudflare Workers
// Note: Cloudflare Workers don't support Node.js crypto, so we use Web Crypto API

export async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password, hash) {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Simple JWT-like token generation (for production, use a proper JWT library)
export function generateToken(user, secret) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const payload = {
    id: user.id,
    email: user.email,
    roles: user.roles || [],
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
  }

  // In production, use proper JWT signing
  // For now, return a simple token
  const tokenData = btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(payload))
  return tokenData
}

export function verifyToken(token, secret) {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null

    const payload = JSON.parse(atob(parts[1]))
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch (error) {
    return null
  }
}

