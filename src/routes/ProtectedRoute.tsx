import React, { useEffect, useState } from 'react'
import LoginPortal from '../components/LoginPortal'
import { useUserContext } from '../contexts/userContext'
import { checkToken } from '../api/userApi'
import MessageBox from '../components/MessageBox'
import { useNavigate } from 'react-router'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUserContext()
  const [isTokenValid, setIsTokenValid] = useState(false)
  const navigate = useNavigate()

  const load = async () => {
    if (token) {
      const res = await checkToken()
      if (res === true) setIsTokenValid(true)
      else navigate('/login')
    } else navigate('/login')
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <>
      <MessageBox />
      {isTokenValid ? <>{children}</> : <LoginPortal />}
    </>
  )
}
