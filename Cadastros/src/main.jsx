import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Pages/Home/Index'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
