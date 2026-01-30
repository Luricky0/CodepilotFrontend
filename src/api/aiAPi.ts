import axiosInstance from '../utils/axiosInstance'

export const getEvaluation = (title: string, code: string, model='deepseek') => {
  try {
    const res = axiosInstance.post('/evaluate', { title, code, model })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAnswer = (title: string, content: string, lang: string, model='deepseek') => {
  try {
    const res = axiosInstance.post('/answer', { title, content, lang, model })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAnalyzation = (title: string, content: string, model='deepseek') => {
  try {
    const res = axiosInstance.post('/analyze', { title, content, model })
    return res
  } catch (error) {
    console.log(error)
  }
}
