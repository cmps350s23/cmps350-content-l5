import { api } from "./API-services.js";

//Grab all needed elements
let popupContainer = document.getElementById("popupContainer");
let schedRegion = document.querySelector("#sessionsList");
let addformRegion;
let updateformRegion;
let addPresForm;

//Set some functions to be gobal so they can be called from the HTML
window.delSession = delSession;
window.loadAsPopupWithID = loadAsPopupWithID;
window.loadAsPopup = loadAsPopup;
window.deletePresent = deletePresent;
window.sessionEditor = sessionEditor;
window.pressEditor = pressEditor;
window.closePopup = closePopup;

displaySchedEditor();

async function loadAsPopup(pageUrl) {
  //Load a page as a popup (mostly used for forms )
  const page = await fetch(pageUrl);
  const pageHTMLContent = await page.text();
  setHTMLasPopup(pageHTMLContent);
  if (pageUrl == "newSessionForm.html") {
    addformRegion = document.getElementById("add-session-form");
    addformRegion.addEventListener("submit", newSession);
    loadDates("");
    loadLocations("");
  }
}

async function loadAsPopupWithID(pageUrl, sessID) {
  //Load a page as a popup but pass a session ID to load the form with, used for editing presentations
  const page = await fetch(pageUrl);
  const pageHTMLContent = await page.text();
  setHTMLasPopup(pageHTMLContent);
  if (pageUrl == "newPressForm.html") {
    addPresForm = document.getElementById("add-presentation-form");
    addPresForm.addEventListener("submit", newPresentation);
    const sessionId = document.getElementById("sessionId");
    sessionId.value = sessID;
    loadReviewedPapers("");
  }
}

function setHTMLasPopup(html) {
  //Set the HTML of the popup container
  popupContainer = document.getElementById("popupContainer");
  html = `<a href="#" class="card close" onclick="closePopup()"><i class="fa fa-times"></i></a> ${html}`;
  popupContainer.innerHTML = html;
  popupContainer.classList.remove("hidden");
}

function closePopup() {
  popupContainer = document.getElementById("popupContainer");
  popupContainer.innerHTML = "";
  popupContainer.classList.add("hidden");
}

function formToObject(form) {
  //Convert a form to an object
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData) {
    data[key] = value;
  }
  return data;
}
async function newSession(e) {
  //Create a new session
  e.preventDefault();
  const s = formToObject(e.target);
  s.presentations = []; //Create an empty array for presentations so that the API doesn't throw an error
  await api.addSession(s);
  closePopup();
  displaySchedEditor();
}

async function updateSession(e) {
  e.preventDefault();
  const s = formToObject(e.target);
  s.presentations = await api.getPresentations(s.id); //Get the presentations for the session so that the information isn't lost
  await api.updateSession(s);
  closePopup();
  displaySchedEditor();
}

async function delSession(id) {
  await api.deleteSession(id);
  displaySchedEditor();
}

async function deletePresent(presID, sessID) {
  await api.deletePresentation(sessID, presID);
  displaySchedEditor();
}

async function newPresentation(e) {
  e.preventDefault();
  const p = formToObject(e.target);
  const sessID = p.sessionId;
  delete p.sessionId; //Remove the session ID from the object since this is not stored in the json file
  await api.addPresentation(sessID, p);
  closePopup();
  displaySchedEditor();
}

async function updatePresentation(e) {
  e.preventDefault();
  const p = formToObject(e.target);
  const sessID = p.sessionId;
  delete p.sessionId; //Remove the session ID from the object since this is not stored in the json file
  await api.updatePresentation(sessID, p);
  closePopup();
  displaySchedEditor();
}

async function displaySchedEditor() {
  //Display the session editor
  const Schedule = await api.getSchedule();
  if (Schedule.length == 0) {
    schedRegion.innerHTML = `<p class="unavailable">No Sessions found.</p>`;
  } else {
    const text = [];
    for (let s of Schedule) {
      const temp = `<div class="session-card">
            <div class="session-header">
                <h3>${s.title}</h3>
                
                <div class="date-location">
                    <p><i class="fa fa-calendar"></i> ${s.date} </p>
                    <p><i class="fa fa-map-marker"></i> ${s.location}</p>
                </div>
                <div class="manageBtns">
                    <button class="button edit-btn" onclick="sessionEditor(${
                      s.id
                    })"><i class="fa fa-pencil"></i>Edit Session</button>
                    <button class="button del-btn" onclick="delSession(${
                      s.id
                    })"><i class="fa fa-trash"></i>Delete Session</button>
                </div>
            </div>
            <div class="presentList" id="presentList"> 
                ${await presentationToHTML(s.presentations, s.id)}
            </div>
            <button class="button add-btn" onclick="loadAsPopupWithID('newPressForm.html',${
              s.id
            })"> <i class="fa fa-plus"></i> New Presentation</button>
        </div>`;
      text.push(temp);
    }
    schedRegion.innerHTML = text.join(` <hr> `);
  }
}

async function presentationToHTML(presArray, sessID) {
  //Convert an array of presentations to HTML of presentation editor cards
  if (presArray.length == 0) {
    return `<p class="unavailable">No Presentations found.</p>`;
  } else {
    let text = "";
    for (let p of presArray) {
      const paper = await api.getPaper(p.paperId);
      text =
        text +
        `<div class="presentation-card card">
            <div class="title-button">
                <h4>${paper.title}</h4>
                <div>
                    <button class="button del-btn" onclick="deletePresent(${
                      p.id
                    },${sessID})"><i class="fa fa-trash"></i></button>
                    <button class="button edit-btn" onclick="pressEditor(${
                      p.id
                    },${sessID})"><i class="fa fa-pencil"></i></button>
                </div>
            </div>
            <p><i class="fa fa-clock-o"></i> ${p.startTime} - ${p.endTime}</p>
            <p class="presenters">presenter: ${paper
              .getPresenter()
              .getFullastName()}</p>
        </div> `;
    }

    return text;
  }
}

async function sessionEditor(sessID) {
  //Display the session editor form
  const sess = await api.getSession(sessID);
  setHTMLasPopup(
    `<form action="#" id="update-session-form" class="center">
        <h1>Create Session</h1>
        <hr>
            <input type="hidden" id="id" name="id" value="${sess.id}">
            <div>
                <label for="title">Session Name:</label>
                <input type="text" id="title" name="title" placeholder="Enter Session Title" value="${sess.title}" required>
            </div>
            <div>
            <label for="date">Date: </label>
            <select name="date" id="dates" required aria-placeholder="Choose Date"></select>
            </div>
            <div>
                <label for="location">Location: </label>
                <select name="location" id="locations" required aria-placeholder="Enter Location Information"></select>
            </div>
    
        <input type="submit" value="Update Session" class="button">
    </form>`
  );
  addformRegion = document.getElementById("update-session-form");
  addformRegion.addEventListener("submit", updateSession);
  loadDates(sess.date);
  loadLocations(sess.location);
}

async function pressEditor(presId, sessID) {
  //Display the presentation editor form
  const press = await api.getPresentation(sessID, presId);
  setHTMLasPopup(`
    <form action="#" id="update-presentation-form" class="center">
            <h1>Set Presentation</h1>
            <hr>
            <input type="hidden" name="sessionId" id="sessionId" value="${sessID}">
            <input type="hidden" name="id" id="id" value="${presId}">
            <input type="hidden" name="paperId" id="paperId" value="${press.paperId}">
            <label for="researchPaper">Please select a Research paper to review:</label>
            <select name="paperId" id="researchPapers" required disabled onload="loadReviewedPapers()" aria-placeholder="Choose Paper">
                <!-- <option value="" disabled selected>Select Paper</option> -->
            </select>

            <div>
                <label for="startTime">Presentation Starts: </label>
                <input type="time" name="startTime" id="startTime" class="textinput" required value="${press.startTime}">
            </div>
            <div>
                <label for="endTime">Presentation Ends: </label>
                <input type="time" id="endTime" name="endTime" class="textinput" required value="${press.endTime}">
            </div>
            <input type="submit" value="Update Presentation" class="button">
    </form>`);
  updateformRegion = document.getElementById("update-presentation-form");
  updateformRegion.addEventListener("submit", updatePresentation);
  loadReviewedPapers(press.paperId);
}

async function loadReviewedPapers(selected) {
  //Load all papers that have been reviewed and accepted (>=2) and not presented yet
  const revPapers = await api.getAcceptedPapers();
  let html = revPapers
    .filter((p) => !p.isPresented)
    .map(
      (p) =>
        `<option value="${p.id}" ${selected == p.id ? "selected" : ""}>${
          p.title
        }</option>`
    )
    .join("");
  if (html == "" || html == " " || html == null) {
    html = `<option value="" disabled selected>No Papers to Present</option>`;
  }
  const papersDD = document.querySelector("#researchPapers");
  papersDD.innerHTML = html;
}

async function loadLocations(selected) {
  //Load all locations to the dropdown
  const locs = await api.getLocations();
  const html = locs
    .map(
      (l) =>
        `<option value="${l}" ${selected == l ? "selected" : ""}>${l}</option>`
    )
    .join(" ");
  const locDD = document.querySelector("#locations");
  locDD.innerHTML = html;
}

async function loadDates(selected) {
  //Load all dates to the dropdown
  const dates = await api.getDates();
  const html = dates
    .map(
      (d) =>
        `<option value="${d}" ${selected == d ? "selected" : ""}>${d}</option>`
    )
    .join(" ");
  const dateDD = document.querySelector("#dates");
  dateDD.innerHTML = html;
}
