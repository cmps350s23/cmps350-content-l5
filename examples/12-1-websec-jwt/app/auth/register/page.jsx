import { login } from "@/app/api/users/users-repo"
import { redirect } from "next/navigation"

export default async function LoginForm() {
  async function onSubmitHandler(formData) {
    "use server"
    const { name, email, password, image } = Object.fromEntries(
      formData.entries()
    )
    const user = { name, email, password, image }
    console.log("onSubmit - user:", user)
    await addUser(user)
    redirect("/")
  }

  return (
    <div className="center">
      <h3>Register</h3>
      <br />
      <form action={onSubmitHandler}>
        <label>Name</label>
        <input name="name" type="text" required />
        <label>Email</label>
        <input name="email" type="email" required />
        <label>Password</label>
        <input name="password" type="password" required />
        <label>Image Url</label>
        <input name="image" type="text" required />
        <button type="submit">Submit</button>
      </form>
      <br />
    </div>
  )
}
