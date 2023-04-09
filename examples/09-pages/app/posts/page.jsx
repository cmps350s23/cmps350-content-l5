
import { PostsList } from './PostsList'

// Server-side rendering
export default async function PostPage ({ params }) {
  return (
    <section>
      <PostsList />
    </section>
  )
}
