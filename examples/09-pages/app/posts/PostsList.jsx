import Link from 'next/link'
import { LikeButton } from './LikeButton'
import { PostItem } from './PostItem'

const fetchPosts = async () => {
  //https://jsonplaceholder.typicode.com
  const data = await fetch('http://localhost:3500/posts', {
    next: {
      revalidate: 60
    }
  })
  return data.json()
}
// Server-side rendering
export async function PostsList () {
  const posts = await fetchPosts()
  return posts.map((post) => <PostItem post={post} />)
}