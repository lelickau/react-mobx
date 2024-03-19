import { FC } from 'react'
import TodoForm from '../components/TodoForm'
import TodosList from '../components/TodosList'

const Todos: FC = () => {
  return (
    <article>
      <TodosList />
      <TodoForm />
    </article>
  )
}

export default Todos
