import Link from "next/link";
import { LikeButton } from "./LikeButton";

export function PostItem ({post}) {
    return (
      <article key={post.id}>
        <Link href={`/posts/${post.id}`}>
        <h2 style={{ color: '#09f' }}>{post.title}</h2>
        </Link>
        <p>{post.body}</p>
        <LikeButton id={post.id} />
      </article>
    )
  }