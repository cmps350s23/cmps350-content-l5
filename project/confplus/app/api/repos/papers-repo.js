import fs from "fs-extra";
import path from "path";
import { accountsRepo } from "./users-repo";
import { readJSON } from "../utils";

const filePath = "data/papers.json";
export const getPapers = async () => await readJSON(filePath);

export async function getPaperById(id) {
  const papers = await getPapers();
  return papers.find((p) => p.id == id);
}

class PapersRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "/data/papers.json");
  }

  async getPapers() {
    const papers = await fs.readJSON(this.filePath);
    return papers;
  }

  async getPaperById(id) {
    const papers = await this.getPapers();
    return papers.find((a) => a.id == id);
  }

  async getAcceptedPapers() {
    const papers = await this.getPapers();
    return papers.filter((p) => {
      const sum = this.getSumOverallEvaluation(p);
      return sum != null && sum >= 2;
    });
  }

  getSumOverallEvaluation(paper) {
    return paper.reviews.reduce((sum, review) => sum + review.overallRating, 0);
  }

  async getReviews(paperId) {
    const paper = await this.getPaperById(paperId);
    return paper.reviews;
  }

  async addReview(paperId, review) {
    const paper = await this.getPaperById(paperId);
    paper.reviews.push(review);
    await this.updatePaper(paper);
  }

  async updateReview(paperId, review) {
    const paper = await this.getPaperById(paperId);
    const index = paper.reviews.findIndex((r) => r.userID == review.userID);
    paper.reviews[index] = review;
    await this.updatePaper(paper);
  }

  async addPaper(paper) {
    const papers = await this.getPapers();
    paper.id =
      papers.legth > 0 ? Math.max(...papers.map((paper) => paper.id)) + 1 : 1;
    paper.reviewers = await accountsRepo.getRandomReviewersID(); //assign paper to random reviewers
    paper.isPresented = false;
    paper.reviews = [];
    papers.push(paper);
    await fs.writeJSON(this.filePath, papers);
  }

  async togglePresented(id) {
    const paper = await this.getPaperById(id);
    paper.isPresented = !paper.isPresented;
    await this.updatePaper(paper);
    return paper.isPresented;
  }

  async updatePaper(paper) {
    const papers = await this.getPapers();
    const index = papers.findIndex((a) => a.id == paper.id);
    papers[index] = paper;
    await fs.writeFile(this.filePath, JSON.stringify(papers, null, 2));
    return paper;
  }
}

export const papersRepo = new PapersRepo();
