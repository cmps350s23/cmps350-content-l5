"use client"
import { SessionProvider } from "next-auth/react"
export default function UserInfoProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}
