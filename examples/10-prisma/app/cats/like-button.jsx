"use client";
import { useState } from "react";
import { onLikeCat } from "./actions";

export default function LikeButton({ catId, likesCount }) {
  const [likes, setLikes] = useState(likesCount);
  return (
    <button
      onClick={async () => {
        const likesCount = await onLikeCat(catId);
        setLikes(likesCount);
      }}
    >
      Like 👍 (count: {likes} )
    </button>
  );
}
