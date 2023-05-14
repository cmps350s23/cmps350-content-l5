import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

export async function POST(request) {
  const prisma = new PrismaClient()

  const body = await request.json()
  const saltRounds = 10 // makes encryption more secure
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, saltRounds),
    },
  })

  const { password, ...userWithoutPassword } = user
  return new Response(JSON.stringify(userWithoutPassword))
}
