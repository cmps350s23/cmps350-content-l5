export class Author {
  id;
  firstName;
  lastName;
  email;
  affiliation;
  isPresenter;

  getFullastName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class Review {
  userID;
  overallRating;
  contribution;
  weakness;
  strength;
}

export class Paper {
  id;
  paperURL;
  title;
  authors; //array of Author objects
  abstract;
  reviewers; //an int array of the userIDs for the reviews of this paper
  isPresented; //boolean;
  reviews; //array of Review objects

  getPresenter() {
    return this.authors.find((a) => a.isPresenter);
  }

  getSumOverallEvaluation() {
    return this.reviews.reduce((sum, review) => sum + review.overallRating, 0);
  }
}

export class Presentation {
  id;
  paperId;
  startTime;
  endTime;
}

export class Session {
  id;
  title;
  date;
  location;
  presentations; //Array of presentations on this session
}
