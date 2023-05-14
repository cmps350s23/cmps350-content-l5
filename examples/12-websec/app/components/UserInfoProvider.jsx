"use client"
import { SessionProvider } from "next-auth/react"

const UserInfoProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default UserInfoProvider
