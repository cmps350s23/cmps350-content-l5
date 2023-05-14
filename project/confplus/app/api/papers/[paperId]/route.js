import { papersRepo } from "../../repos/papers-repo";

export async function GET(request, { params }) {
  //get paper by id
  const { paperId } = params;
  const paper = await papersRepo.getPaperById(paperId);
  return Response.json(paper);
}

export async function PUT(request, { params }) {
  //update paper
  // const {paperId} = params;
  const paper = await request.json();
  await papersRepo.updatePaper(paper);
  return Response.json(paper);
}
