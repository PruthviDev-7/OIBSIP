// React App Entry Point - This file starts the entire React application
// It connects React to the HTML page and renders the App component

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Import global styles
import App from './App.jsx'

// Find the 'root' element in the HTML page (in index.html)
const rootElement = document.getElementById('root');
if (rootElement) {
  // Create React root and render the App component inside it
  // StrictMode helps catch bugs during development
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
