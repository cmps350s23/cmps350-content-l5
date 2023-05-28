import { getPaperById } from "../papers-repo"

export async function GET(request, { params }) {
  //get paper by id
  const { paperId } = params
  const paper = await getPaperById(paperId)
  return Response.json(paper)
}

export async function PUT(request, { params }) {
  // Update paper
  // const {paperId} = params;
  const paper = await request.json()
  await papersRepo.updatePaper(paper)
  return Response.json(paper)
}
