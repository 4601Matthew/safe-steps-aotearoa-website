import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = process.env.VITE_ENCRYPTION_KEY || 'safe-steps-aotearoa-2024-secure-key'
const USERS_FILE_KEY = 'safe_steps_users'

// Encrypt data
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
}

// Decrypt data
export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  } catch (error) {
    throw new Error('Failed to decrypt data')
  }
}

// Hash password (using SHA256 - in production, use bcrypt on backend)
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString()
}

// Get all users from encrypted storage
export const getUsers = () => {
  try {
    const encrypted = localStorage.getItem(USERS_FILE_KEY)
    if (!encrypted) return []
    return decryptData(encrypted)
  } catch (error) {
    console.error('Error loading users:', error)
    return []
  }
}

// Save users to encrypted storage
export const saveUsers = (users) => {
  try {
    const encrypted = encryptData(users)
    localStorage.setItem(USERS_FILE_KEY, encrypted)
    return true
  } catch (error) {
    console.error('Error saving users:', error)
    return false
  }
}

// Create a new user
export const createUser = (email, password, name, roles = []) => {
  const users = getUsers()
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    throw new Error('User with this email already exists')
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    passwordHash: hashPassword(password),
    name,
    roles,
    createdAt: new Date().toISOString(),
    provider: 'local',
  }

  users.push(newUser)
  saveUsers(users)
  return newUser
}

// Authenticate user
export const authenticateUser = (email, password) => {
  const users = getUsers()
  const passwordHash = hashPassword(password)
  
  const user = users.find(
    u => u.email === email && u.passwordHash === passwordHash
  )

  if (!user) {
    throw new Error('Invalid email or password')
  }

  // Return user without password hash
  const { passwordHash: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Update user roles (for admin)
export const updateUserRoles = (userId, roles) => {
  const users = getUsers()
  const userIndex = users.findIndex(u => u.id === userId)
  
  if (userIndex === -1) {
    throw new Error('User not found')
  }

  users[userIndex].roles = roles
  users[userIndex].updatedAt = new Date().toISOString()
  saveUsers(users)
  return users[userIndex]
}

