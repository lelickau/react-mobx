import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import { Todo } from '../types/todos'
import { getTodos } from '../api/getTodods'
import { addTodo } from '../api/addTodo'
import { removeTodo } from '../api/removeTodo'
import { completedTodo } from '../api/completedTodo'

class TodosStore {
  todos: Array<Todo> = []
  loading = {
    getTodos: false,
    addTodo: false,
    removeTodo: false,
    completeTodo: false,
  }
  error = {
    getTodos: '',
    addTodo: '',
    removeTodo: '',
    completeTodo: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  getTodosAction = async () => {
    try {
      this.loading.getTodos = true
      const response = await getTodos()
      this.todos = response
      runInAction(() => {
        this.loading.getTodos = false
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.loading.getTodos = false
        this.error.getTodos = 'Error when receiving get'
      })
    }
  }

  addTodoAction = async (todo: Omit<Todo, 'id'>) => {
    runInAction(() => {
      this.loading.addTodo = true
      this.error.addTodo = ''
    })
    try {
      const response = await addTodo(todo)
      if (response) {
        runInAction(() => {
          this.todos = [...this.todos, response]
          this.loading.addTodo = false
        })
      }
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.loading.addTodo = false
        this.error.addTodo = 'Error when receiving add'
      })
    }
  }

  removeTodoAction = async (id: Todo['id']) => {
    runInAction(() => {
      this.loading.removeTodo = true
      this.error.removeTodo = ''
    })
    try {
      const response = await removeTodo(id)
      console.log(response)
      if (response) {
        runInAction(() => {
          console.log('object', id, this.todos)
          this.todos = this.todos.filter((todo) => todo.id !== id)
          this.loading.removeTodo = false
        })
      }
    } catch (error) {
      runInAction(() => {
        this.loading.removeTodo = false
        this.error.removeTodo = 'Error when receiving remove'
      })
    }
  }

  completeTodoAction = async (id: Todo['id'], completed: Todo['completed']) => {
    runInAction(() => {
      this.loading.completeTodo = true
      this.error.completeTodo = ''
    })
    try {
      const response = await completedTodo(id, completed)
      if (response) {
        runInAction(() => {
          this.todos= this.todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed } : todo)
          this.loading.completeTodo = false
        })
      }
    } catch (error) {
      runInAction(() => {
        this.loading.completeTodo = false
        this.error.completeTodo = 'Error when receiving complete'
      })
    }
  }
}

export default new TodosStore()
