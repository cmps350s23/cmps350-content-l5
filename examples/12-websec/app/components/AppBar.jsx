import Link from "next/link"
import SignInButton from "./SignInButton"

const AppBar = () => {
  return (
    <header>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/posts"}>Posts</Link>
        <SignInButton />
      </nav>
    </header>
  )
}

export default AppBar
