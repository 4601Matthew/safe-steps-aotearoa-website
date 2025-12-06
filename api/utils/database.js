import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DATA_DIR = join(__dirname, '../data')
const USERS_FILE = join(DATA_DIR, 'users.json')

// Ensure data directory exists
import { mkdirSync } from 'fs'
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize users file if it doesn't exist
if (!existsSync(USERS_FILE)) {
  writeFileSync(USERS_FILE, JSON.stringify([], null, 2))
}

// Read users from file
export const getUsers = () => {
  try {
    const data = readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return []
  }
}

// Save users to file
export const saveUsers = (users) => {
  try {
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
    return true
  } catch (error) {
    console.error('Error saving users file:', error)
    return false
  }
}

// Find user by email
export const findUserByEmail = (email) => {
  const users = getUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

// Find user by ID
export const findUserById = (id) => {
  const users = getUsers()
  return users.find(u => u.id === id)
}

// Update user roles
export const updateUserRoles = (userId, roles) => {
  const users = getUsers()
  const userIndex = users.findIndex(u => u.id === userId)

  if (userIndex === -1) {
    return null
  }

  users[userIndex].roles = roles
  users[userIndex].updatedAt = new Date().toISOString()
  saveUsers(users)

  return users[userIndex]
}

// Create user (for registration)
export const createUser = (userData) => {
  const users = getUsers()
  users.push(userData)
  saveUsers(users)
  return userData
}

