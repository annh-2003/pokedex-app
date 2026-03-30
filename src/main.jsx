import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { ToastProvider } from './context/ToastContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
)
