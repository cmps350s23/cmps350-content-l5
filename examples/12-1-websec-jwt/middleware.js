export function middleware(req) {
  console.log("request", req.nextUrl.pathname)
  req.cookies.set("nextjs", "middleware")
  const idToken = req.cookies.get("id_token")?.value
  if (idToken) {
    console.log("middleware - id_token", idToken)
  } else {
    return Response.redirect("http://localhost:3000/auth/login")
  }
}

export const config = {
  matcher: ["/posts/:path*"],
}
