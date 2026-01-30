import { useState} from 'react'

const prefix = 'CODEPILOT-'

function useLocalStorage<T>(key: string, initialValue: T) {
  key = prefix+key;
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      if (item !== null) {
        console.warn('Error key exsisted, remove it first“' + key)
        return JSON.parse(item)
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }
    } catch (error) {
      console.warn('Error reading localStorage key “' + key + '”: ', error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn('Error setting localStorage key “' + key + '”: ', error)
    }
  }

  const remove = () => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn('Error removing localStorage key “' + key + '”: ', error)
    }
  }

  return [storedValue, setValue, remove] as const
}

export default useLocalStorage