"use client"
import { signOut } from "next-auth/react"

export default function SignOutLink() {
  return (
    <a href="#" onClick={() => signOut()} style={{ paddingLeft: "0.5rem" }}>
      (Sign Out)
    </a>
  )
}
