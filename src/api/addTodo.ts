import { URL } from '../constants'
import { Todo } from '../types/todos'

export const addTodo = async (todo: Omit<Todo, 'id'>) => {
  const response = await fetch(`${URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  })

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: Todo = await response.json()
  return data
}
