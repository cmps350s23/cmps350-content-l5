// app/blogs/[id]/page.js
export default function PostPage({ params }) {
  return <p>Blog id# ${params.id}</p>;
}
