import { login } from "@/app/api/users/users-repo"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

let errorMsg = ""
export default async function RegistrationForm() {
  async function onSubmitHandler(formData) {
    "use server"
    const { email, password } = Object.fromEntries(formData.entries())
    let user = null
    try {
      user = await login(email, password)
      console.log("Login onSubmit - user:", user)
      // Save id_token in a cookie
      const maxAge = 60 * 60 * 24 * 7 // 1 week
      cookies().set("id_token", user.id_token, { path: "/", maxAge })
    } catch (error) {
      errorMsg = error.message
      revalidatePath("/auth/login")
      console.error("Login failed:", error)
    }
    // Workaround as redirect inside try fails
    if (user) {
      redirect("/")
    }
  }

  return (
    <div className="center">
      <p className="error-message">{errorMsg}</p>
      <h3>Login</h3>
      <br />
      <form action={onSubmitHandler}>
        <label>Email</label>
        <input name="email" type="email" required />
        <label>Password</label>
        <input name="password" type="password" required />
        <button type="submit">Submit</button>
      </form>
      <br />
    </div>
  )
}
