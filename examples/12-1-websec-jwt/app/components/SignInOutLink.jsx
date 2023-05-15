"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInOutLink({ user, onSignOut }) {
  const router = useRouter()
  return (
    <>
      {user ? (
        <span>
          {user?.image && (
            <img src={user.image} alt={user.name} className="user-image" />
          )}
          <span>{user?.name}</span>
          <a
            href="#"
            onClick={async () => {
              await onSignOut()
              router.refresh()
            }}
          >
            (Sign Out)
          </a>
        </span>
      ) : (
        <span>
          <Link href={"/auth/login"}>Login</Link>
          <span>/</span>
          <Link href={"/auth/register"}>Register</Link>
        </span>
      )}
    </>
  )
}
