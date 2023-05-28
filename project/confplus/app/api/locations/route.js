import { readJSON } from "@/app/lib/utils"

export async function GET(request) {
  const locations = await readJSON("data/locations.json")
  return Response.json(locations)
}
