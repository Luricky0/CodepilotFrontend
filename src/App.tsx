import React from 'react'
import LoginPortal from './components/LoginPortal'
import { UserProvider } from './contexts/userContext'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './routes/routes'

const AppRoutes = () => useRoutes(routes)

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
