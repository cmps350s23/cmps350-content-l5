"use client";

export default function LikeButton({ catId, likesCount, onLikeCat }) {
  return (
    <button
      onClick={async () => {
        await onLikeCat(catId);
      }}
    >
      Like 👍 (count: {likesCount} )
    </button>
  );
}
