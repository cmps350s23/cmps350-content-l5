import { getTodos, createTodo } from './todo-repo'

export async function GET(request) {
    const todos = await getTodos()
    return Response.json(todos, { status: 200 })
}

export async function POST(request) {
    const todo = await request.json()
    const newTodo = await createTodo(todo)
    return Response.json(newTodo, { status: 200 })
}

