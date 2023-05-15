"use client"
import { signIn } from "next-auth/react"

export default function SignInLink() {
  return (
    <a href="#" onClick={() => signIn()}>
      Sign In
    </a>
  )
}
