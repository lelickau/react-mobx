import { URL } from '../constants'
import { Todo } from '../types/todos'

export const completedTodo = async (id: Todo['id'], completed: Todo['completed']) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      completed
    })
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data
}
