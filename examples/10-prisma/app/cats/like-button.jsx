"use client";
import { useState } from "react";
// Import onLikeCatHandler server action function
// Strangely, this import does NOT work!!!
//import { create } from "../_actions";

export default function LikeButton({ catId, likesCount, onLikeCat }) {
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
