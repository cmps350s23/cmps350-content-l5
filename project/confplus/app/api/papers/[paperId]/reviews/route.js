import { papersRepo } from "../../../repos/papers-repo";

// export async function GET(request, { params }){//get reviews of a paper
//     const { paperId } = params;
//     const reviews = await papersRepo.getReviews(paperId);
//     return Response.json(reviews);
// }

export async function POST(request, { params }) {
  //add a review to a paper
  const { paperId } = params;
  const review = await request.json();
  await papersRepo.addReview(paperId, review);
  return Response.json(review);
}

export async function PUT(request, { params }) {
  //update a review of a paper
  const { paperId } = params;
  const review = await request.json();
  await papersRepo.updateReview(paperId, review);
  return Response.json(review);
}
