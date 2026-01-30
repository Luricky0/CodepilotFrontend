import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  clearMessage,
  MessageType,
  subscribeMessages,
} from '../utils/messageManage'

const MessageBox = () => {
  const [message, setMessage] = useState<MessageType | null>(null)
  useEffect(() => {
    const unsubscribe = subscribeMessages((data) => {
      setMessage(data)
      if (data) {
        setTimeout(() => setMessage(null), 80000)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  if (message)
    return (
      <div className="fixed top-5 right-5 px-4 py-3 rounded-md shadow-md z-[9999]">
        <strong>{message.type}：</strong> {message.message}
        <button
          onClick={() => clearMessage()}
          style={{
            marginLeft: '10px',
            background: 'transparent',
            color: 'black',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
          ✕
        </button>
      </div>
    )
  return <></>
}
export default MessageBox
