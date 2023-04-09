import Link from 'next/link'
import styles from './comments.module.css'
import { PostItem } from '../PostItem'

const fetchPost = async (id) => {
  // Incremental Static Regeneration
  const data = await fetch(`http://localhost:3500/posts/${id}`, {
    next: {
      revalidate: 60
    }
  })
  return data.json()
}

export default async function Post ({ params, children }) {
  const { id } = params
  const post = await fetchPost(id)
  return (
    <article>
      <PostItem post={post} />
      <Link className={styles.comments} href={`/posts/${id}/comments`}>See comments</Link>
      {children}
    </article>
  )
}
