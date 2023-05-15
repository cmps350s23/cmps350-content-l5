import Link from "next/link"
import SignInOutLink from "./SignInOutLink"

export default async function NavBar() {
  return (
    <header>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/posts"}>Posts</Link>
        <SignInOutLink />
      </nav>
    </header>
  )
}
