import { URL } from '../constants'
import { Todo } from '../types/todos'

type FetchTodos = {
  limit: number
  skip: number
  total: number
  todos: Array<Todo>
}

export const getTodos = async () => {
  const response = await fetch(URL)

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: FetchTodos = await response.json()
  return data.todos
}