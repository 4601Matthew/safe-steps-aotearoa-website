// Minimal test version
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App-test'

console.log('main.jsx is loading...')

const rootElement = document.getElementById('root')
if (rootElement) {
  console.log('Root element found, rendering...')
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
  console.log('Render called')
} else {
  console.error('Root element not found!')
  document.body.innerHTML = '<h1 style="color: red;">Error: Root element not found</h1>'
}

