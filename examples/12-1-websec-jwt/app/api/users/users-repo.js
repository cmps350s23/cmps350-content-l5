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
  delete newUser.password
  return newUser
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
    delete user.password
    const idToken = signJwt(user)
    const userWithJwt = {
      ...user,
      id_token: idToken,
    }
    return userWithJwt
  } else {
    throw new Error("Authentication failed. Invalid email or password")
  }
}

export const getUsers = async () => {
  const users = await prisma.user.findMany()
  const usersWithoutPass = users.map((user) => {
    const { password, ...userWithoutPass } = user
    return userWithoutPass
  })
  return usersWithoutPass
}
