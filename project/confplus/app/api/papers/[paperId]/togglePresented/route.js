import { papersRepo } from "../../../repos/papers-repo";

export async function GET(request, { params }) {
  const { paperId } = params;
  return Response.json(await papersRepo.togglePresented(paperId));
}
