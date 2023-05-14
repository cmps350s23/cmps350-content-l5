import { accountsRepo } from "../../repos/users-repo";

export async function GET(request) {
  return Response.json(await accountsRepo.getRandomReviewersID()); //Return array of random reviewers
}
