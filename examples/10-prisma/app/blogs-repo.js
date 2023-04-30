import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

/*
Notice that you're passing the include option to findMany which tells Prisma Client 
to include the posts on the returned User objects.
*/
export const addUser = async (user) => prisma.user.create({ data: user })
export const getUsers = async () => prisma.user.findMany()
export const getUsersWithPosts = async () => prisma.user.findMany({ 
    include: { posts: true }
})
export const getUser = async (id) => prisma.user.findUnique({ where: { id } })
export const updateUser = async (id, user) => prisma.user.update({ where: { id }, data: user })
export const deleteUser = async (id) => prisma.user.delete({ where: { id } })
export const deleteUserByEmail = async (email) => prisma.user.delete({ where: { email } })

export const getPosts = async () => prisma.post.findMany()
export const getPost = async (id) => prisma.post.findUnique({ where: { id } })
export const addPost = async (post) => prisma.post.create({ data: post })
export const updatePost = async (id, post) => prisma.post.update({ where: { id }, data: post })
export const deletePost = async (id) => prisma.post.delete({ where: { id } })
