import { papersRepo } from "../../repos/papers-repo";

export async function GET(request) {
  //get all accepted papers
  return Response.json(await papersRepo.getAcceptedPapers());
}
