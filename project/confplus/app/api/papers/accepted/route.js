import { getAcceptedPapers } from "../papers-repo"

export async function GET(request) {
  return Response.json(await getAcceptedPapers())
}
