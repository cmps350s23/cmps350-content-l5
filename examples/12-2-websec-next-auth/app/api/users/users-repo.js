import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import * as bcrypt from "bcrypt"
import { signJwt } from "@/app/lib/jwt"
import { use } from "react"
import { get } from "http"

export const addUser = async (user) => {
  const saltRounds = 10 // makes encryption more secure
  user.password = await bcrypt.hash(user.password, saltRounds)
  const newUser = await prisma.user.create({
    data: user,
  })
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

export const getUserByEmail = async (email) =>
  await prisma.user.findFirst({
    where: {
      email,
    },
  })

export const login = async (email, password) => {
  const user = await getUserByEmail(email)
  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...userWithoutPass } = user
    const id_token = signJwt(userWithoutPass)
    const userWithJwt = {
      ...userWithoutPass,
      id_token,
    }
    return userWithJwt
  } else {
    throw new Error("Authentication failed. Invalid email or password")
  }
}

export const getUsers = async () => {
  const users = await prisma.user.findMany()
  const usersWithoutPassword = users.map((user) => {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  })
  return usersWithoutPassword
}
