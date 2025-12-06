import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

console.log('main.jsx: Starting...')

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: red;">
        <h1>JavaScript Error</h1>
        <p>${event.error?.message || 'Unknown error'}</p>
        <pre style="text-align: left; background: #f5f5f5; padding: 1rem; margin: 1rem 0; overflow: auto;">${event.error?.stack || ''}</pre>
        <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; cursor: pointer; margin-top: 1rem;">Reload Page</button>
      </div>
    `
  }
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

// Ensure root element exists
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<h1 style="padding: 2rem; color: red;">Error: Root element not found</h1>'
} else {
  console.log('Root element found, creating root...')
  try {
    const root = ReactDOM.createRoot(rootElement)
    console.log('Root created, rendering...')
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
    console.log('Render complete!')
  } catch (error) {
    console.error('Failed to render app:', error)
    rootElement.innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h1 style="color: red;">Error Loading Application</h1>
        <p>${error.message}</p>
        <pre style="text-align: left; background: #f5f5f5; padding: 1rem; margin: 1rem 0; overflow: auto;">${error.stack}</pre>
        <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; cursor: pointer; margin-top: 1rem;">Reload Page</button>
      </div>
    `
  }
}

