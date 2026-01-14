import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const applicationRoot = document.getElementById('root');
if(applicationRoot !== null) {
  createRoot(applicationRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  throw new Error("Root element not found");
}
