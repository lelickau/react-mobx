import {ChangeEvent, useState} from 'react'
import { useStores } from '../context/root-store-context'
import Input from './ui/Input'
import { observer } from 'mobx-react-lite'

const userId = 5

const TodoForm = observer(() => {
  const { todosStore: { addTodoAction } } = useStores()
  const [todo, setTodo] = useState('')

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value)
  }

  const addTodoHandler = () => {
    addTodoAction({
      todo,
      completed: false,
      userId,
    })
  }

  return (
    <div className="form">
      <Input onChange={inputHandler} name="todo" value={todo} />
      <button onClick={addTodoHandler}>
        Add todo
      </button>
    </div>
  )
})

export default TodoForm
