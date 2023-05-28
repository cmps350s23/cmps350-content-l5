import { getPapers, addPaper } from "./papers-repo"

export async function GET(request) {
  //get all papers
  const { searchParams } = new URL(request.url)
  const reviewerID = searchParams.get("reviewerID")
  const papers = await getPapers()
  if (reviewerID) {
    //filter papers that the reviewer is assigned to
    const filteredPapers = papers.filter((p) =>
      p.reviewers?.some((r) => r == reviewerID)
    )
    //note: some() returns true if at least one element in the array meets the condition
    return Response.json(filteredPapers)
  }
  return Response.json(papers)
}

export async function POST(request) {
  // Add a new paper
  let paper = await request.json()
  paper = await addPaper(paper)
  return Response.json(paper)
}
