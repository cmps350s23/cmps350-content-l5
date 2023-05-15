export default function Post({ post }) {
  return (
    <>
      <h2>{post.title}</h2>
      <small>By {post.author?.name}</small>
      <p>{post.content}</p>
    </>
  )
}
