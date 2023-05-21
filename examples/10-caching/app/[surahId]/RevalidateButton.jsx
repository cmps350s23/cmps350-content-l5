"use client"

import { onRevalidatePath } from "./actions"

export default function RevalidateButton({ surahId }) {
  return (
    <button
      onClick={async () => {
        console.log("RevalidateButton - surahId", surahId)
        await onRevalidatePath(`/${surahId}`)
      }}
    >
      Revalidate 🔄
    </button>
  )
}
