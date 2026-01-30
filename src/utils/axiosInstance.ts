// src/utils/axiosInstance.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('CODEPILOT-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Axios Error]', error)
    return Promise.reject(error)
  }
)

export default axiosInstance