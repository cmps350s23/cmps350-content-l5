import { login } from "../users-repo"

export async function POST(request) {
  const body = await request.json()
  try {
    const user = await login(body.email, body.password)
    console.log("/api/users/login - user:", user)
    return Response.json(user)
  } catch (error) {
    console.log("/api/users/login - error:", error)
    return Response.json(
      { error: `🚫 Unauthorized - ${error}` },
      { status: 401 }
    )
  }
}
