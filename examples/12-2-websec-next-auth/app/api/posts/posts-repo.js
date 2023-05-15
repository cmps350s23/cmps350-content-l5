import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getPosts = async () =>
  prisma.post.findMany({ include: { author: true } })

export const getPostsByAuthor = async (authorId) =>
  prisma.post.findMany({
    where: { authorId: authorId },
    include: { author: true },
  })

export const getPost = async (id) => prisma.post.findUnique({ where: { id } })
export const addPost = async (post) => prisma.post.create({ data: post })
export const updatePost = async (id, post) =>
  prisma.post.update({ where: { id }, data: post })
export const deletePost = async (id) => prisma.post.delete({ where: { id } })
