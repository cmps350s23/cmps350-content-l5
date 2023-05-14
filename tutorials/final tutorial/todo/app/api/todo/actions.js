'use server'

import * as repo from './todo-repo'
import { revalidatePath } from 'next/cache'

export const createTodo = async (formData) => {
    const { title } = Object.fromEntries(formData.entries())
    await repo.createTodo({ title })
    revalidatePath('/')
}
export const updateTodo = async (id, todo) => {
    await repo.updateTodo(id, todo)
    revalidatePath('/')
}
export const deleteTodo = async (id) => {
    await repo.deleteTodo(id)
    revalidatePath('/')
}
