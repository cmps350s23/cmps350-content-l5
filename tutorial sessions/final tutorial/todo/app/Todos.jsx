'use client'
import { updateTodo, deleteTodo } from './api/todo/actions'

export default function Todos({ todos }) {
    return (
        <div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>
                        <tr>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{<input type='checkbox' checked={todo.status}
                                onChange={async () => await updateTodo(todo.id, { status: !todo.status })} />}</td>
                            <td>{<input type='button' value='Delete'
                                onClick={async () => deleteTodo(todo.id)} />}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
