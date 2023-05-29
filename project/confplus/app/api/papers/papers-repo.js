import { getRandomReviewers } from "@/app/api/users/users-repo"
import { readJSON, writeJSON } from "@/app/lib/utils"

const dataFilePath = "data/papers.json"
export const getPapers = async () => await readJSON(dataFilePath)

export async function getPaperById(id) {
  const papers = await getPapers()
  return papers.find((p) => p.id == id)
}

export async function addPaper(paper) {
  try {
    const papers = await getPapers()
    console.log("addPaper - paper: ", paper)
    paper.id = Math.max(...papers.map((paper) => paper.id)) + 1 ?? 1
    paper.reviewers = await getRandomReviewers() //assign paper to random reviewers
    papers.push(paper)
    await writeJSON(dataFilePath, papers)
    return paper
  } catch (error) {
    console.log("addPaper - error: ", error)
    throw error
  }
}

export async function getAcceptedPapers() {
  let papers = await getPapers()
  papers = papers.filter((p) => {
    const sum = sumOverallEvaluation(p)
    return sum && sum >= 2
  })

  papers = papers.map((p) => {
    //add presenter to each paper
    const presenter = p.authors.find((a) => a.isPresenter)
    console.log("presenter: ", `${presenter.firstName} ${presenter.lastName}`)
    if (presenter) {
      p.presenter = `${presenter.firstName} ${presenter.lastName}`
    }
    return p
  })
  return papers
}

function sumOverallEvaluation(paper) {
  return paper.reviews?.reduce((sum, review) => sum + review.overallRating, 0)
}

export async function updatePaper(paper) {
  const papers = await getPapers()
  const index = papers.findIndex((p) => p.id == paper.id)
  papers[index] = paper
  await writeJSON(dataFilePath, papers)
  return paper
}

export async function getReviews(paperId) {
  const paper = await getPaperById(paperId)
  return paper.reviews
}

export async function addReview(paperId, review) {
  const paper = await getPaperById(paperId)
  if (!paper.reviews) paper.reviews = []
  paper.reviews.push(review)
  await updatePaper(paper)
}

export async function updateReview(paperId, review) {
  const paper = await getPaperById(paperId)
  const index = paper.reviews?.findIndex((r) => r.userID == review.reviewerId)
  paper.reviews[index] = review
  await updatePaper(paper)
}
