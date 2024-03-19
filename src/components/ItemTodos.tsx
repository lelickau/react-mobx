import { FC } from 'react'
import { Todo } from '../types/todos'
import DoneIcon from './ui/DoneIcon'
import Checkbox from './ui/Checkbox'
import RemoveIcon from './ui/RemoveIcon'
import { useStores } from '../context/root-store-context'
import { observer } from 'mobx-react-lite'

interface Props {
  todo: Todo
}

const RemoveButton: FC<{id: Todo['id']}> = observer(({id}) => {
  const { todosStore: { removeTodoAction } } = useStores()

  const removeTodoHandler = () => {
    removeTodoAction(id)
  }

  return (
    <div onClick={removeTodoHandler}>
      <RemoveIcon />
    </div>
  )
})

const CompleteButton: FC<Props> = observer(({todo}) => {
  const { todosStore: { completeTodoAction } } = useStores()

  const completeTodoHandler = () => {
    completeTodoAction(todo.id, !todo.completed)
  }

  return (
    <div onClick={completeTodoHandler}>
      {todo.completed ? (
        <DoneIcon />
      ): (
        <Checkbox />
      )}
    </div>
  )
})

const ItemTodos: FC<Props> = ({todo}) => {
  return (
    <li style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
      <div style={{display: 'flex', gap: '15px'}}>
        <RemoveButton id={todo.id} />
        {todo.todo}
      </div>
      <CompleteButton todo={todo} />
    </li>
  )
}

export default ItemTodos
