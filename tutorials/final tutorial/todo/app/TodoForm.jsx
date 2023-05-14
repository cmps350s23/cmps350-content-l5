'use client'
import { useRef } from 'react'
import { createTodo } from './api/todo/actions'
export default function TodoForm() {
    const formRef = useRef()
    return (
        <div>
            <form action={async (formData) => {
                await createTodo(formData)
                formRef.current.reset()
            }}
                ref={formRef}>

                <div className="mb-3 mt-3">
                    <label for="title">Email:</label>
                    <input type="title" className="form-control" id="title" placeholder="Enter title"
                        name="title" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>)
}
