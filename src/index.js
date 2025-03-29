// src/index.js
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ApiModeProvider } from './contexts/ApiModeContext'
import { Provider } from 'react-redux'
import store from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ApiModeProvider>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ApiModeProvider>
  </Provider>
)
