"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  // Workaround to force refresh the page after login
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [])

  return (
    <article>
      <h1>Welcome Web Security examples</h1>
    </article>
  )
}
