import Image from 'next/image'
import styles from './page.module.css'
import TodoForm from './TodoForm'
import { getTodos, updateTodo, deleteTodo } from './api/todo/todo-repo'
import Todos from './Todos'


export default async function Home() {
  const todos = await getTodos()
  return (
    <div className='container'>
      <h1>Welcome to my Todo List app!</h1>
      <TodoForm />
      <br />
      <Todos todos={todos} />
    </div >
  )
}


// repository