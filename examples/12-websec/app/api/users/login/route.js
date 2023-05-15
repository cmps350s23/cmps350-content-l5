import { signJwtAccessToken } from "@/app/lib/jwt"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

export async function POST(request) {
  const prisma = new PrismaClient()
  const body = await request.json()
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user
    const id_token = signJwtAccessToken(userWithoutPass)
    const result = {
      ...userWithoutPass,
      id_token,
    }
    return new Response(JSON.stringify(result))
  } else return new Response(JSON.stringify(null))
}
