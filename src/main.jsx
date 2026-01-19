import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider } from './context/ThemeContext/ThemeContext.jsx';
import { AuthProvider } from './context/ThemeContext/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      
    
      <AuthProvider>
        <App />
      </AuthProvider>
    
      
    </ThemeProvider>
    
  </StrictMode>,
)
