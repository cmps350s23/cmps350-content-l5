"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function SignInOutLink() {
  const { data: session } = useSession()
  console.log("SignInOutLink - session.user", session?.user)

  return (
    <>
      {session ? (
        <span>
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="user-image"
            />
          )}
          <span>{session?.user?.name}</span>
          <a
            href="#"
            onClick={() => signOut()}
            style={{ paddingLeft: "0.5rem" }}
          >
            (Sign Out)
          </a>
        </span>
      ) : (
        <span>
          {/*           <a href="#" onClick={() => signIn()}>
            Sign In
          </a> */}
          <Link href={"/auth/login"}>Login</Link>
          <span>/</span>
          <Link href={"/auth/register"}>Register</Link>
        </span>
      )}
    </>
  )
}
