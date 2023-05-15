import Link from "next/link"
import SignInOutLink from "./SignInOutLink"
import { cookies } from "next/headers"
import { verifyJwt } from "@/app/lib/jwt"
import { revalidatePath } from "next/cache"

export default async function NavBar() {
  // Get id_token cookie
  const idToken = cookies().get("id_token")?.value
  console.log("NavBar - id_token:", idToken)

  let currentUser = null
  if (idToken) {
    currentUser = verifyJwt(idToken)
    console.log("NavBar user:", currentUser)
  }

  async function onSignOutHandler() {
    "use server"
    // clear the cookie
    cookies().set("id_token", "", { maxAge: 0 })
    // for a strange reason, the following redirect does not work
    //redirect("/auth/login")
  }

  return (
    <header>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/posts"}>Posts</Link>
        <SignInOutLink user={currentUser} onSignOut={onSignOutHandler} />
      </nav>
    </header>
  )
}
