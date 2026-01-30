import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { fetchRegister } from '../api/accountApi'
import { useUserContext } from '../contexts/userContext'
import { clearMessage, showError } from '../utils/messageManage'
import { useNavigate } from 'react-router'
import { Turnstile } from '@marsidev/react-turnstile'

const LoginPortal = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const user = useUserContext()
  const { setToken } = user
  const navigate = useNavigate()

  const tryLogin = async (id: string, password: string) => {
    if (!captchaToken) {
      showError('Please complete the captcha')
      return
    }
    try {
      const res = await axiosInstance.post('/login', {
        id: username,
        password,
        captchaToken,
      })

      if (res.status === 200) {
        const { token } = res.data
        setToken(token)
        user.setUsername(username)
        navigate('/')
      }
    } catch (err) {
      showError('Username or password error.')
      console.error(err)
    }
  }

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await tryLogin(username, password)
  }

  const onRegister = async () => {
    if (!captchaToken) {
      showError('Please complete the captcha')
      return
    }
    try {
      await fetchRegister(
        { id: username, password, captchaToken },
        { setToken },
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-screen flex justify-evenly place-items-center">
      <div className="flex gap-2 items-center">
        <img src="/logo.png" alt="logo" className="w-16 h-16" />
        <h1 className="text-7xl font-menlo">Codepilot</h1>
      </div>
      <form
        className="rounded w-96 bg-white p-4 flex flex-col space-y-4 items-center justify-center"
        onSubmit={onLogin}>
        <h2>Login</h2>

        <div className="w-full">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="py-2">
          <Turnstile
            siteKey="0x4AAAAAACM9-o5h76brkYd2"
            onSuccess={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-700 transition">
          Login
        </button>

        <button
          type="button"
          className="text-blue-400"
          onClick={() => {
            showError('Please contact the author for login credentials.')
          }}>
          No account
        </button>

        {/* <button
          type="button"
          onClick={onRegister}
          className="w-full bg-black text-white py-2 rounded hover:bg-yellow-700 transition">
          Register
        </button> */}
      </form>
    </div>
  )
}
export default LoginPortal
