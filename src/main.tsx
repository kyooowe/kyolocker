import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </CookiesProvider>
  </StrictMode>,
)
