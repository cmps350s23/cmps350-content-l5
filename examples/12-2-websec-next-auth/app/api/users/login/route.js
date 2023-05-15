import { login } from "@/app/api/users/users-repo"

export async function POST(request) {
  const body = await request.json()
  try {
    const userWithJwt = await login(body.email, body.password)
    return Response.json(userWithJwt)
  } catch (error) {
    return Response.json(
      { error: `🚫 Unauthorized - ${error}` },
      { status: 401 }
    )
  }
}
