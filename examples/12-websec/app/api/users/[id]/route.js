import { verifyJwt } from "@/lib/jwt"
import { PrismaClient } from "@prisma/client"

export async function GET(request, { params }) {
  const prisma = new PrismaClient()

  const accessToken = request.headers.get("authorization")
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    )
  }
  const userPosts = await prisma.post.findMany({
    where: { authorId: +params.id },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  })

  return new Response(JSON.stringify(userPosts))
}
