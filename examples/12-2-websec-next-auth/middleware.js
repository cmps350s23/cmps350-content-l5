import { NextResponse } from "next/server"
export { default } from "next-auth/middleware"

export function middleware(req) {
  console.log("request", req.nextUrl.pathname)
  //return NextResponse.next()
}

export const config = {
  matcher: ["/posts/:path*"],
}
