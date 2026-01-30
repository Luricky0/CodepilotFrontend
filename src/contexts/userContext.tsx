import React, { createContext, useContext } from 'react'
import useUser from '../hooks/useUser' 

const UserContext = createContext<ReturnType<typeof useUser> | null>(null)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userHook = useUser()
  return <UserContext.Provider value={userHook}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUserContext must be used within a UserProvider')
  return context
}