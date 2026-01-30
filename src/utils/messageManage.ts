let listeners = new Set<(msg: any) => void>()
export type MessageType = {
  type: string
  message: string
} 

export function showError(message: string) {
  listeners.forEach((fn) => fn({ type: 'error', message }))
}

export function clearMessage() {
  listeners.forEach((fn) => fn(null))
}

export function subscribeMessages(fn: (msg: MessageType|null) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn) //destructer
}
