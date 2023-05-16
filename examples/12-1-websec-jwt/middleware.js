export function middleware(req) {
  console.log("request", req.nextUrl.pathname)
  const idToken = req.cookies.get("id_token")?.value
  console.log("middleware - idToken", idToken)
  if (!idToken) {
    return Response.redirect("http://localhost:3000/auth/login")
  }
}
//This redirect rule only apply requests for /posts/:path*
export const config = {
  matcher: ["/posts/:path*"],
}
