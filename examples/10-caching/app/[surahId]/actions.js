"use server"
import { revalidatePath } from "next/cache"

export async function onRevalidatePath(path) {
  console.log("onRevalidatePath - path", path)
  revalidatePath(path)
}
