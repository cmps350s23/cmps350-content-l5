"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

const SignInButton = () => {
  const { data: session } = useSession()
  console.log(session?.user)

  if (session && session.user) {
    return (
      <>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }
  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  )
}

export default SignInButton
