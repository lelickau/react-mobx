import { URL } from '../constants'
import { Todo } from '../types/todos'

export const removeTodo = async (id: Todo['id']) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data
}
