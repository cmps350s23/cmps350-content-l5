import { getRandomReviewers } from "@/app/api/users/users-repo"
import { readJSON, writeJSON } from "@/app/lib/utils"

const filePath = "data/papers.json"
export const getPapers = async () => await readJSON(filePath)

export async function getPaperById(id) {
  const papers = await getPapers()
  return papers.find((p) => p.id == id)
}

export async function addPaper(paper) {
  const papers = await getPapers()
  console.log("addPaper - paper: ", paper)
  paper.id = Math.max(...papers.map((paper) => paper.id)) + 1 ?? 1
  paper.reviewers = await getRandomReviewers() //assign paper to random reviewers
  console.log("addPaper - reviewers: ", reviewers)
  //paper.isPresented = false
  //paper.reviews = []
  papers.push(paper)
  await writeJSON(filePath, papers)
  return paper
}

export async function getAcceptedPapers() {
  const papers = await getPapers()
  return papers.filter((p) => {
    const sum = this.getSumOverallEvaluation(p)
    return sum && sum >= 2
  })
}

function getSumOverallEvaluation(paper) {
  return paper.reviews.reduce((sum, review) => sum + review.overallRating, 0)
}

export async function updatePaper(paper) {
  const papers = await getPapers()
  const index = papers.findIndex((p) => p.id == paper.id)
  papers[index] = paper
  await writeJSON(filePath, papers)
  return paper
}

export async function getReviews(paperId) {
  const paper = await getPaperById(paperId)
  return paper.reviews
}

export async function addReview(paperId, review) {
  const paper = await getPaperById(paperId)
  paper.reviews.push(review)
  await updatePaper(paper)
}

export async function updateReview(paperId, review) {
  const paper = await getPaperById(paperId)
  const index = paper.reviews.findIndex((r) => r.userID == review.userID)
  paper.reviews[index] = review
  await updatePaper(paper)
}
