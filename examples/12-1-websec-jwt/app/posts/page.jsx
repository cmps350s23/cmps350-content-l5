import styles from "./posts.module.css"
import { cookies } from "next/headers"
import { verifyJwt } from "@/app/lib/jwt"
import { getPostsByAuthor } from "@/app/api/posts/posts-repo"
import Post from "./post"

export default async function UserPosts() {
  // Get id_token cookie
  const idToken = cookies().get("id_token")?.value
  console.log("UserPosts - id_token:", idToken)

  if (!idToken) {
    return (
      <p className="error-message">🚫 Unauthorized - id token is missing</p>
    )
  }

  const user = verifyJwt(idToken)
  console.log("UserPosts user:", user)

  if (!user) {
    return (
      <p className="error-message">🚫 Unauthorized - id token is invalid</p>
    )
  }

  let posts = []
  if (user) {
    const authorId = parseInt(user.id)
    posts = await getPostsByAuthor(authorId)
  }

  return (
    <>
      {!posts || posts.length == 0 ? (
        <h2>No posts found.</h2>
      ) : (
        <>
          <h1>Posts for {user.name}</h1>
          <div>
            {posts.map((post) => (
              <div key={post.id} className="styles.post">
                <Post post={post} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
