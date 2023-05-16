import { addUser, getUsers } from "./users-repo"
import { verifyJwt } from "@/app/lib/jwt"

export async function POST(request) {
  const body = await request.json()
  try {
    const user = await addUser(body)
    return Response.json(user, { status: 201 })
  } catch (error) {
    console.log("Error - POST user:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

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
      { error: "🚫 Unauthorized - id token is invalid.☹️ مضروب" },
      { status: 401 }
    )
  }

  if (!user.role || user.role.toLowerCase() !== "admin") {
    return Response.json(
      { error: `⛔ Forbidden - Role should be Admin. Désolé ${user.name}!` },
      { status: 403 }
    )
  }

  const users = await getUsers()
  return Response.json(users)
}
