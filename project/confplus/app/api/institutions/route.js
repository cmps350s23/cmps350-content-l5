import { readJSON } from "@/app/lib/utils"

export async function GET(request) {
  const institutions = await readJSON("data/institutions.json")
  return Response.json(institutions)
}
