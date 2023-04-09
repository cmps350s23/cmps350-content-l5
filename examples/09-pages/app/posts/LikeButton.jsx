'use client' // Client-side render

import { useState } from 'react'

export function LikeButton () {
  const [liked, setLiked] = useState(false)

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '♥' : '♡'}
    </button>
  )
}