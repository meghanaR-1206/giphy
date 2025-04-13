import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GifProvider from './context/Gif_context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GifProvider> {/* Wrap the entire app */}
      <App />
    </GifProvider>
  </StrictMode>,
)
