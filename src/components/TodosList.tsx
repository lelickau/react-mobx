import { useEffect } from "react"
import { useStores } from "../context/root-store-context"
import ItemTodos from "./ItemTodos"
import { observer } from "mobx-react-lite"

const TodosList = observer(() => {
  const { todosStore: { todos, getTodosAction, loading, error } } = useStores()

  useEffect(() => {
    getTodosAction()
  }, [])

  if (!todos) {
    return null
  }

  return (
    <ul>
      {loading.getTodos || error.getTodos ? (
        <li>
          {loading.getTodos && 'Loading...'}
          {error.getTodos && 'Error'}
        </li>
      ) : (
        todos.map((todo) => (
          <ItemTodos key={todo.id} todo={todo} />
        ))
      )}
    </ul>
  )
})

export default TodosList
