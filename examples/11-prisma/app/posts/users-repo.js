import { prisma } from "@/app/lib/db"

export const addUser = async (user) => prisma.user.create({ data: user })

export const getUsers = async () => prisma.user.findMany()

/*
Notice that you're passing the include option to findMany which tells Prisma Client 
to include the posts on the returned User objects.
*/
export const getUsersWithPosts = async () =>
  prisma.user.findMany({
    include: { posts: true },
  })
export const getUser = async (id) => prisma.user.findUnique({ where: { id } })
export const updateUser = async (id, user) =>
  prisma.user.update({ where: { id }, data: user })

export const deleteUser = async (id) => prisma.user.delete({ where: { id } })
export const deleteUserByEmail = async (email) =>
  prisma.user.delete({ where: { email } })
