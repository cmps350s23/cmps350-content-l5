import { Author, Paper, Review } from "../scripts/classes.js";
const BASE_URL = "/api/";

//A class to communicate with the API

class API {
  //To be able to track who is logged in while browsing website
  setLoggedInUser(userEmail) {
    localStorage.setItem("user", userEmail);
  }

  async getLoggedInUser() {
    const email = localStorage.getItem("user");
    if (!email) return undefined;
    return await this.getUserByEmail(email);
  }

  //Dates
  async getDates() {
    const response = await fetch(`${BASE_URL}/confdates`);
    const dates = response.json();
    return dates;
  }

  //Institutions
  async getInstitutions() {
    const response = await fetch(`${BASE_URL}/institutions`);
    const institutions = await response.json();
    return institutions;
  }

  //Locations
  async getLocations() {
    const response = await fetch(`${BASE_URL}/locations`);
    const locations = await response.json();
    return locations;
  }

  //Users
  async getUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const users = await response.json();
    return users;
  }

  async getUserByEmail(email) {
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    if (response.status === 404) return undefined;
    const user = await response.json();
    return user;
  }

  async getUserById(id) {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    const user = await response.json();
    return user;
  }

  //scheduleule
  async getSchedule() {
    const response = await fetch(`${BASE_URL}/schedule`);
    const schedule = await response.json();
    return schedule;
  }

  async getSession(id) {
    const response = await fetch(`${BASE_URL}/schedule/${id}`);
    const session = await response.json();
    return session;
  }

  async getSessionsByDate(date) {
    date = date.replaceAll(" ", "+");
    const response = await fetch(`${BASE_URL}/schedule?date=${date}`);
    const sessions = await response.json();
    return sessions;
  }

  async getPresentations(sessID) {
    const response = await fetch(
      `${BASE_URL}/schedule/${sessID}/presentations`
    );
    const presentations = await response.json();
    return presentations;
  }

  async getPresentation(sessID, presId) {
    const response = await fetch(
      `${BASE_URL}/schedule/${sessID}/presentations/${presId}`
    );
    const presentation = await response.json();
    return presentation;
  }

  async updateSession(session) {
    const response = await fetch(`${BASE_URL}/schedule/${session.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });
    return response.json();
  }

  async updatePresentation(sessID, presentation) {
    const response = await fetch(
      `${BASE_URL}/schedule/${sessID}/presentations/${presentation.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presentation),
      }
    );
    return response.json();
  }

  async addSession(session) {
    const response = await fetch(`${BASE_URL}/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });
    return response.json();
  }

  async addPresentation(sessID, presentation) {
    const response = await fetch(
      `${BASE_URL}/schedule/${sessID}/presentations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presentation),
      }
    );
    return response.json();
  }

  async deleteSession(id) {
    const response = await fetch(`${BASE_URL}/schedule/${id}`, {
      method: "DELETE",
    });
    //return response.json();
  }

  async deletePresentation(sessID, presId) {
    const response = await fetch(
      `${BASE_URL}/schedule/${sessID}/presentations/${presId}`,
      {
        method: "DELETE",
      }
    );
    //return response.json();
  }

  async deleteSchedule() {
    const response = await fetch(`${BASE_URL}/schedule`, {
      method: "DELETE",
    });
    //return response.json();
  }

  //Papers
  async getPapers() {
    const response = await fetch(`${BASE_URL}/papers`);
    const papers = await response.json();
    for (let paper of papers) {
      Object.setPrototypeOf(paper, Paper.prototype);
      for (let author of paper.authors) {
        Object.setPrototypeOf(author, Author.prototype);
      }
      for (let review of paper.reviews) {
        Object.setPrototypeOf(review, Review.prototype);
      }
    }
    return papers;
  }

  async getPaper(id) {
    const response = await fetch(`${BASE_URL}/papers/${id}`);
    const paper = await response.json();
    Object.setPrototypeOf(paper, Paper.prototype);
    for (let author of paper.authors) {
      Object.setPrototypeOf(author, Author.prototype);
    }
    for (let review of paper.reviews) {
      Object.setPrototypeOf(review, Review.prototype);
    }
    return paper;
  }

  async updatePaper(paper) {
    const response = await fetch(`${BASE_URL}/papers/${paper.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paper),
    });
    return response.json();
  }

  async addPaper(paper) {
    const response = await fetch(`${BASE_URL}/papers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paper),
    });
    return response.json();
  }

  //For Reviews
  async getPaperByReviewerId(id) {
    const response = await fetch(`${BASE_URL}/papers?reviewerID=${id}`);
    const papers = await response.json();
    for (let paper of papers) {
      Object.setPrototypeOf(paper, Paper.prototype);
      for (let author of paper.authors) {
        Object.setPrototypeOf(author, Author.prototype);
      }
      for (let review of paper.reviews) {
        Object.setPrototypeOf(review, Review.prototype);
      }
    }
    return papers;
  }

  async getAcceptedPapers() {
    const papers = await fetch(`${BASE_URL}/papers/accepted`);
    return await papers.json();
  }
  async updateReview(paperId, review) {
    const response = await fetch(`${BASE_URL}/papers/${paperId}/reviews`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }

  async addReview(paperId, review) {
    const response = await fetch(`${BASE_URL}/papers/${paperId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }
}
export const api = new API();
