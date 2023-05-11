import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
const prisma = new PrismaClient()

export const getTodos = async () => await prisma.todo.findMany()
export const getTodo = async (id) => await prisma.todo.findUnique({ where: { id } })
export const createTodo = async (todo) => {
    await prisma.todo.create({ data: todo })
    revalidatePath('/')
}
export const updateTodo = async (id, todo) => {
    await prisma.todo.update({ where: { id }, data: todo })
    revalidatePath('/')
}
export const deleteTodo = async (id) => {
    await prisma.todo.delete({ where: { id } })
    revalidatePath('/')
}
