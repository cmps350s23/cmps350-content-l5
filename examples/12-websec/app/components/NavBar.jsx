import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"
import SignOutLink from "./SignOutLink"
import SignInLink from "./SignInLink"

export default async function NavBar() {
  const session = await getServerSession(authOptions)
  console.log("getServerSession:", session)
  return (
    <header>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/posts"}>Posts</Link>
        {session ? (
          <span>
            <span>{session?.user?.name}</span>
            <SignOutLink />
          </span>
        ) : (
          <SignInLink />
        )}
      </nav>
    </header>
  )
}
