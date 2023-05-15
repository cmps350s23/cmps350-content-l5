import styles from "./posts.module.css"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getPostsByAuthor } from "@/app/api/posts/posts-repo"
import Post from "./post"

export default async function UserPosts() {
  const session = await getServerSession(authOptions)
  console.log("getServerSession:", session)

  let posts = []
  if (session) {
    const authorId = parseInt(session.user.id)
    posts = await getPostsByAuthor(authorId)
  }

  return (
    <>
      {!posts || posts.length == 0 ? (
        <h2>No posts found.</h2>
      ) : (
        <>
          <h1>Posts for {session.user.name}</h1>
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
