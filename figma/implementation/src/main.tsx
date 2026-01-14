import React from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App'
import ChooseAFile from './pages/choose-a-file';
import './styles.css'

const applicationRoot = document.getElementById('root');
if(applicationRoot !== null) {
  createRoot(applicationRoot).render(
    <React.StrictMode>
      <ChooseAFile />
    </React.StrictMode>
  )
} else {
  throw new Error("Root element not found");
}
