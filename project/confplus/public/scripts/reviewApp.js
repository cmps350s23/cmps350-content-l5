import { api } from "./API-services.js";

const paperDD = document.querySelector("#researchPapers"); //Dropdown to select paper
let paperArea = document.querySelector("#variablePaperArea"); //Area to display paper info
let reviewForm; //Review form
let arrow; //Arrow to collapse abstract
let abstract; //Abstract text
let isNewReview = false; //Flag to check if review is new or existing

//Login
let user = await api.getLoggedInUser();
if (!user) {
  //For testing purposes
  user = await api.getUserByEmail("lukeharris@reviewer.com");
}

await loadReviewedPapers();
await loadReviewPage();

paperDD.addEventListener("change", loadReviewPage); //Load paper info when paper is selected

function reselectElements() {
  //Reassign elements after paper info is loaded
  arrow = document.querySelector("#collapseButton");
  abstract = document.querySelector("#paperAbstract");
  reviewForm = document.querySelector("#reviewForm");

  reviewForm.addEventListener("submit", submitReview);
  arrow.addEventListener("click", toggleCollapse);
}

function toggleCollapse() {
  //Collapse/expand abstract
  arrow.classList.toggle("arrowUp");
  abstract.classList.toggle("collapseText");
}

function toggleHidden() {
  //Show/hide loading gif
  const hidden = document.querySelector("#messageArea");
  hidden.classList.toggle("hidden");
}

async function submitReview(e) {
  //Submit review
  e.preventDefault();
  toggleHidden();
  //Get review info
  const paperId = paperDD.value;
  const userID = user.id;
  const overallRating = document.querySelector(
    'input[name="overallRating"]:checked'
  ).value;
  const contribution = document.querySelector(
    'input[name="contribution"]:checked'
  ).value;
  const strength = document.querySelector("#strength").value;
  const weakness = document.querySelector("#weakness").value;
  const review = {
    userID: userID,
    overallRating: overallRating,
    contribution: contribution,
    weakness: weakness,
    strength: strength,
  };
  //Submit review
  if (isNewReview) {
    await api.addReview(paperId, review);
  } else {
    await api.updateReview(paperId, review);
  }
  toggleHidden();
  alert("Review Submitted");
}

async function loadReviewPage() {
  //Load paper info and review form
  toggleHidden();
  const paperId = paperDD.value;
  const paper = await api.getPaper(paperId);
  const userID = user.id;
  let review = paper.reviews.find((review) => review.userID == userID);
  if (!review) {
    //If no review exists, set default values
    isNewReview = true;
    review = {
      userID: userID,
      overallRating: -1,
      contribution: -1,
      weakness: "",
      strength: "",
    };
  }

  let html = `
    <div class="paperInfo">
                    <div class="resetStyle">
                        <h4>Paper Information</h4>
                        <hr>
                    </div>
                    <p id="title">Title: &#8205; <span class="title">${
                      paper.title
                    }</span> </p>
                    <p id="paperAuthor">Author(s): </p>
                    <div class="authorsList">
                        ${authorsToHTML(paper.authors)}
                    </div>
                    <div class="collapsableAbstract">
                        <p id="paperAbstract" class="collapseText">Abstract: &#8205; &#8205; &#8205; ${
                          paper.abstract
                        }</p>
                        <button  class="arrowDown" id="collapseButton"><i class="fa fa-angle-down"></i></button>
                    </div>
                    <a href="${
                      paper.paperURL
                    }" target="_blank" class="button">View PDF</a>
    </div>
    <form action="#" id="reviewForm" class="">
                    <h4>Paper Review</h4>
                    <hr>
                    <fieldset>
                        <div class="form-group">
                            <label for="overallRating">1- Please evaluate the research paper according to these choices:
                            </label><br>
                            ${overallRatingToHTML(review.overallRating)}
                        </div>
                        <div class="form-group">
                            <label for="contribution">2- How was the paper contribution?</label> <br>
                            ${contributionToHTML(review.contribution)}
                        </div>
                        <div class="textarea">
                            <label for="strength">Paper Strengths: </label>
                            <textarea id="strength" name="strength" class="textinput" required>${
                              review.strength
                            }
                            </textarea>
                        </div>
                        <div class="textarea">
                            <label for="weakness">Paper Weakness: </label>
                            <textarea id="weakness" name="weakness" class="textinput" required>${
                              review.weakness
                            }
                            </textarea>
                        </div>
                
                    </fieldset>
                    <input type="submit" value="Submit" class="button">
    </form>`;
  paperArea.innerHTML = html;
  toggleHidden();
  reselectElements();
}

function authorsToHTML(authors) {
  return authors
    .map(
      (a) => `<table class="card">
    <tr>
        <th>Name: </th>
        <td>${a.getFullastName()}</td>
    </tr>
    <tr>
        <th>Email: </th>
        <td>${a.email}</td>
    </tr>
    <tr>
        <th>Affiliation:</th>
        <td>${a.affiliation}</td>
    </tr>
</table>`
    )
    .join("");
}

function overallRatingToHTML(selected) {
  //Create overall rating radio buttons and select previous value if it exists
  let defaultOpts = [
    `<input type="radio" id="stronglyAccept" name="overallRating" value="2" required>
    <label for="stronglyAccept">Strongly accept</label><br>`,
    `<input type="radio" id="accept" name="overallRating" value="1">
    <label for="accpet">Accept</label><br>`,
    `<input type="radio" id="borderline" name="overallRating" value="0">
    <label for="borderline">Borderline</label><br>`,
    `<input type="radio" id="reject" name="overallRating" value="-1">
    <label for="reject">Reject</label><br>`,
    `<input type="radio" id="stronglyreject" name="overallRating" value="-2">
    <label for="stronglyReject">Strongly reject</label><br>`,
  ];

  selected = parseInt(selected);
  if (selected != -1) {
    //If a review exists, select the previous values
    const checkedOpts = [
      `<input checked type="radio" id="stronglyAccept" name="overallRating" value="2" required>
        <label for="stronglyAccept">Strongly accept</label><br>`,
      `<input checked type="radio" id="accept" name="overallRating" value="1">
        <label for="accpet">Accept</label><br>`,
      `<input checked type="radio" id="borderline" name="overallRating" value="0">
        <label for="borderline">Borderline</label><br>`,
      `<input checked type="radio" id="reject" name="overallRating" value="-1">
        <label for="reject">Reject</label><br>`,
      `<input checked type="radio" id="stronglyreject" name="overallRating" value="-2">
        <label for="stronglyReject">Strongly reject</label><br>`,
    ];

    defaultOpts[selected + 2] = checkedOpts[selected + 2];
  }
  return defaultOpts.join("");
}

function contributionToHTML(selected) {
  //Create radio buttons for contribution and select the previous value if exists
  //Unselected radio buttons
  let defaultOpts = [
    `<input type="radio" id="major&sig" name="contribution" value="5" required>
    <label for="major&sig">A major and significant contribution</label><br>`,
    `<input type="radio" id="clear" name="contribution" value="4">
    <label for="clear">A clear contribution</label><br>`,
    `<input type="radio" id="minor" name="contribution" value="3">
    <label for="minor">A minor contribution</label><br>`,
    `<input type="radio" id="noObv1" name="contribution" value="2">
    <label for="noObv1">No obvious contribution</label><br>`,
    `<input type="radio" id="noObv2" name="contribution" value="1">
    <label for="noObv2">No contribution at all</label><br>`,
  ];

  selected = parseInt(selected);
  if (selected != -1) {
    //If a review exists, select the previous values

    //selected radio button elements
    const checkedOpts = [
      `<input checked type="radio" id="major&sig" name="contribution" value="5" required>
        <label for="major&sig">A major and significant contribution</label><br>`,
      `<input checked type="radio" id="clear" name="contribution" value="4">
        <label for="clear">A clear contribution</label><br>`,
      `<input checked type="radio" id="minor" name="contribution" value="3">
        <label for="minor">A minor contribution</label><br>`,
      `<input checked type="radio" id="noObv1" name="contribution" value="2">
        <label for="noObv1">No obvious contribution</label><br>`,
      `<input checked type="radio" id="noObv2" name="contribution" value="1">
        <label for="noObv2">No contribution at all</label><br>`,
    ];

    selected = 5 - selected;
    defaultOpts[selected] = checkedOpts[selected];
  }
  return defaultOpts.join("");
}

async function loadReviewedPapers() {
  //Load all papers that can be reviewed by the current user
  toggleHidden();
  const revPapers = await api.getPaperByReviewerId(user.id);
  let html = revPapers
    .filter((p) => !p.isPresented)
    .map((p) => `<option value="${p.id}">${p.title}</option>`)
    .join("");
  if (html == "" || html == " ") {
    //If there are no papers to review, display a disabled option
    html = `<option value="" disabled selected>No Papers to Review</option>`;
  }
  const papersDD = document.querySelector("#researchPapers");
  papersDD.innerHTML = html;
  toggleHidden();
}
