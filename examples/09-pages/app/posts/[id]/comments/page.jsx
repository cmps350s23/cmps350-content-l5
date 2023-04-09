const fetchComments = async (id) => {
  // Incremental Static Regeneration
  await new Promise((resolve) => setTimeout(resolve, 3000))
  throw new Error('Error loading comments!');

  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    {
      next: {
        revalidate: 60
      }
    }
  )
  return data.json()
}

export default async function Post ({ params }) {
  const { id } = params
  const comments = await fetchComments(id)
  return (
    <ul style={{ background: '#bcbcbc', fontSize: '10px' }}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  )
}
