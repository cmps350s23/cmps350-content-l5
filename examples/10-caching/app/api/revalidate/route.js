import { revalidatePath } from "next/cache"

export async function GET(request) {
  const path = request.nextUrl.searchParams.get("path") || "/"
  console.log("onRevalidatePath - path", path)
  revalidatePath(path)
  return Response.json({ path, revalidated: true, dateTime: Date.now() })
}
