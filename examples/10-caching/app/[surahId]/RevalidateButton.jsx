"use client"

import { onRevalidatePath } from "./actions"

export default function RevalidateButton({ surahId }) {
  return (
    <button
      onClick={async () => {
        console.log("RevalidateButton - surahId", surahId)
        const response = await fetch(`/api/revalidate?path=/${surahId}`)
        const json = await response.json()
        console.log("RevalidateButton - json", json)
        // This does not work because of Next.js bug
        // Details @ https://github.com/nrwl/nx/issues/16964
        //await onRevalidatePath(`/${surahId}`)
      }}
    >
      Revalidate 🔄
    </button>
  )
}
