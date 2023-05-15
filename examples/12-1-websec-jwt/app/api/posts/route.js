import { verifyJwt } from "@/app/lib/jwt"
import { getPostsByAuthor } from "./posts-repo"

export async function GET(request) {
  const idToken = request.headers.get("authorization")

  if (!idToken) {
    return Response.json(
      { error: "🚫 Unauthorized - id token is missing" },
      { status: 401 }
    )
  }

  const user = verifyJwt(idToken)
  console.log("Posts - GET user:", user)

  if (!user) {
    return Response.json(
      { error: "🚫 Unauthorized - id token is invalid" },
      { status: 401 }
    )
  }

  const authorId = parseInt(user.id)
  console.log("** Posts - GET authorId:", authorId)
  if (!authorId) {
    return Response.json({ error: "Error - user id missing" }, { status: 500 })
  }

  const posts = await getPostsByAuthor(authorId)
  return Response.json(posts)
}
