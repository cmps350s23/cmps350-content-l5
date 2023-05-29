let sessions = []
const dialogDiv = document.getElementById("dialogDiv")

document.addEventListener("DOMContentLoaded", async () => {
  await displayScheduleEditor()
  await loadDateOptions()
  await loadLocationOptions()
  setLoginMenu()
})

function setLoginMenu() {
  const user = localStorage.user ? JSON.parse(localStorage.user) : null
  const authMenu = user
    ? `<span>
        ${
          user.role == "reviewer"
            ? '<a href="/review-paper.html">Review Paper</a>'
            : ""
        }
        ${
          user.role == "author"
            ? '<a href="/submit-paper.html">Submit Paper</a>'
            : ""
        }
        ${
          user.role == "organizer"
            ? '<a href="/edit-schedule.html">Edit Schedule</a>'
            : ""
        }
          <span>Welcome ${user.firstName} ${user.lastName}</span>
          <a href="#" onClick="onSignOut()">
            (Sign Out)
          </a>
        </span>
        `
    : '<a href="/login.html">Login</a>'
  document.querySelector("#auth-menu").innerHTML = authMenu
}

function onSignOut() {
  localStorage.removeItem("user")
  setLoginMenu()
  window.location.href = "/index.html"
}

async function displayScheduleEditor() {
  const sessionsList = document.querySelector("#sessionsList")
  sessions = await getSchedule()
  console.log("displayScheduleEditor - schedule", sessions)
  if (sessions.length == 0) {
    sessionsList.innerHTML = '<p class="unavailable">No Sessions found.</p>'
    return
  }
  sessionsList.innerHTML = scheduleToHTML(sessions)
}

function onSessionDialogSubmit() {
  window.event.preventDefault()
  let isNewSession = false
  const sessionDialog = document.querySelector("#sessionDialog")
  const sessionForm = sessionDialog.querySelector("form")
  if (!sessionForm.reportValidity()) {
    return
  }
  const formData = new FormData(sessionForm)
  let session = Object.fromEntries(formData.entries())
  if (!session.id) {
    isNewSession = true
    session.id =
      sessions.map((s) => s.id).reduce((a, b) => Math.max(a, b)) + 1 || 1 //get max id and add 1
    console.log("onSessionDialogSubmit - session", session)
    sessions.push(session)
  } else {
    const sessionIndex = sessions.findIndex((s) => s.id == session.id)
    // Merge the old session with the new session
    // to preserve the presentations array
    session = { ...sessions[sessionIndex], ...session }
    sessions[sessionIndex] = session
  }
  const sessionHtml = sessionCard(session)
  const sessionsList = document.querySelector("#sessionsList")

  if (isNewSession) {
    sessionsList.innerHTML += "<hr>" + sessionHtml
  } else {
    const sessionCard = sessionsList.querySelector(
      `[data-session-id='${session.id}']`
    )
    sessionCard.innerHTML = sessionHtml
  }
  sessionDialog.close()
}

function onSessionDialogCancel() {
  window.event.preventDefault()
  const sessionDialog = document.querySelector("#sessionDialog")
  sessionDialog.close()
}

function addSession() {
  const sessionDialog = document.querySelector("#sessionDialog")
  const sessionForm = sessionDialog.querySelector("form")
  sessionForm.reset()
  sessionDialog.showModal()
}

function editSession(sessionId) {
  const sessionDialog = document.querySelector("#sessionDialog")
  const h1 = sessionDialog.querySelector("h1")
  h1.textContent = "Edit Session"
  const sessionForm = sessionDialog.querySelector("form")
  sessionForm.reset()
  const session = sessions.find((s) => s.id == sessionId)
  console.log("editSession - session", session)
  Object.entries(session).forEach((entry) => {
    const [key, value] = entry
    const input = sessionForm.querySelector(`[name='${key}']`)
    if (input) {
      input.value = value
    }
  })
  sessionDialog.showModal()
}

async function deleteSession(id) {
  sessions = sessions.filter((s) => s.id != id)
  const sessionsList = document.querySelector("#sessionsList")
  sessionsList.querySelector(`[data-session-id='${id}']`).remove()
}

async function addPresentation(sessionId) {
  try {
    await loadUnscheduledPapers()
  } catch (err) {
    alert(err.message)
    return
  }

  const presentationDialog = document.querySelector("#presentationDialog")
  const presForm = presentationDialog.querySelector("form")
  presForm.reset()
  presForm.querySelector("[name='sessionId']").value = sessionId
  presentationDialog.showModal()
}

async function editPresentation(sessionId, presId, paperId) {
  try {
    await loadUnscheduledPapers(paperId)
  } catch (err) {
    alert(err.message)
    return
  }
  const presDialog = document.querySelector("#presentationDialog")
  const h1 = presDialog.querySelector("h1")
  h1.textContent = "Edit Presentation"
  const presForm = presDialog.querySelector("form")
  presForm.reset()
  const session = sessions.find((s) => s.id == sessionId)
  const pres = session.presentations.find((p) => p.id == presId)
  console.log("editPresentation - pres", pres)
  Object.entries(pres).forEach((entry) => {
    const [key, value] = entry
    const input = presForm.querySelector(`[name='${key}']`)
    if (input) {
      input.value = value
    }
  })
  presForm.querySelector("[name='sessionId']").value = sessionId
  presDialog.showModal()
}

function onPresentationDialogCancel() {
  window.event.preventDefault()
  const presDialog = document.querySelector("#presentationDialog")
  presDialog.close()
}

function onPresentationDialogSubmit() {
  window.event.preventDefault()
  let isNewPres = false
  const presDialog = document.querySelector("#presentationDialog")
  const presForm = presDialog.querySelector("form")
  if (!presForm.reportValidity()) {
    return
  }
  const formData = new FormData(presForm)
  let pres = Object.fromEntries(formData.entries())

  console.log("onPresentationDialogSubmit - pres", pres)

  const session = sessions.find((s) => s.id == pres.sessionId)
  const presentations = session?.presentations || []
  if (!pres.id) {
    isNewPres = true
    //get max id and add 1
    pres.id =
      presentations.length == 0
        ? 1
        : presentations.map((s) => s.id).reduce((a, b) => Math.max(a, b)) + 1

    console.log("onPresentationDialogSubmit - presentation", pres)
    delete pres.sessionId
    presentations.push(pres)
  } else {
    const presIndex = presentations.findIndex((s) => s.id == pres.id)
    delete pres.sessionId
    presentations[presIndex] = pres
  }
  session.presentations = presentations
  // Add the presentation title and presenter
  const papersDD = presForm.querySelector("[name='paperId']")
  pres.paperId = parseInt(pres.paperId)
  pres.id = parseInt(pres.id)
  pres.title = papersDD.options[papersDD.selectedIndex].text
  pres.presenter = papersDD.options[papersDD.selectedIndex].dataset.presenter

  const presHtml = presentationCard(session.id, pres)

  const sessionCard = document.querySelector(
    `[data-session-id='${session.id}']`
  )
  const presSection = sessionCard.querySelector(
    "section[data-title='presentations']"
  )

  if (isNewPres) {
    presSection.innerHTML += "<hr>" + presHtml
  } else {
    const presCard = sessionCard.querySelector(
      `[data-presentation-id='${pres.id}']`
    )
    presCard.innerHTML = presHtml
  }
  presDialog.close()
}

async function deletePresentation(sessionId, presentationId) {
  const session = sessions.find((s) => s.id == sessionId)
  session.presentations = session.presentations.filter(
    (p) => p.id != presentationId
  )
  const sessionCard = document.querySelector(`[data-session-id='${sessionId}']`)
  sessionCard
    .querySelector(`[data-presentation-id='${presentationId}']`)
    .remove()
}

async function saveSchedule(session) {
  const response = await fetch("/api/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessions),
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  alert("Schedule saved successfully")
  window.location.href = "/schedule.html"
}

function scheduleToHTML(sessions) {
  return sessions.map((session) => sessionCard(session)).join("<hr>")
}

const sessionCard = (session) =>
  `<article class="session-card" 
      data-session-id='${session.id}'>
      <section class="session-header">
          <h3>Session ${session.id}: ${session.title}
            <div class="action-buttons">
              <button class="button edit-btn"
                title="Edit Session"
                onclick="editSession(${session.id})">
                <i class="fa fa-pencil"></i>Session
              </button>
              <button class="button delete-button"
                title="Delete Session"
                onclick="deleteSession(${session.id})">
                <i class="fa fa-trash"></i>Session
              </button>
              <button class="button add-btn"
                title="Add Presentation" 
                onclick="addPresentation(${session.id})"> 
                <i class="fa fa-plus"></i> 
                Presentation
          </button>
          </div>
          </h3>
          <div class="date-location">
              <p>
                <i class="fa fa-calendar"></i>${session.date}
              </p>
              <p>
                <i class="fa fa-map-marker"></i>${session.location}
              </p>
          </div>
      </section>
      <section data-title='presentations'> 
          ${presentationsToHTML(session.id, session.presentations)}
      </section>
  </article>`

function presentationsToHTML(sessionId, presentations) {
  if (!presentations || presentations.length == 0) {
    return `<p class="unavailable">No Presentations found.</p>`
  }
  return presentations.map((p) => presentationCard(sessionId, p)).join("<hr>")
}

const presentationCard = (sessionId, presentation) =>
  `<div class="presentation-card card"
      data-presentation-id='${presentation.id}'>
      <div class="title-button">
          <h4>${presentation.title}</h4>
          <div class="action-buttons">
              <button class="button delete-button" 
                title="Delete Presentation"
                onclick="deletePresentation(${sessionId}, ${presentation.id})">
                <i class="fa fa-trash"></i>
              </button>
              <button class="button edit-btn"
                title="Edit Presentation"
                onclick="editPresentation(${sessionId}, ${presentation.id}, ${presentation.paperId})">
                <i class="fa fa-pencil"></i>
              </button>
          </div>
      </div>
      <p>Presenter: ${presentation.presenter} 
        <i class="fa fa-clock-o"></i> 
        ${presentation.startTime} - ${presentation.endTime}
      </p>
  </div>`

async function getUnscheduledPapers(paperIdToEdit) {
  const res = await fetch("api/papers/accepted")
  let papers = await res.json()
  // remove the papers that are already scheduled
  const scheduledPapers = sessions
    .flatMap((s) => s.presentations)
    .map((p) => p.paperId)
  papers = papers.filter(
    (p) => p.id == paperIdToEdit || !scheduledPapers.includes(p.id)
  )
  return papers
}

async function loadUnscheduledPapers(paperIdToEdit) {
  const papers = await getUnscheduledPapers(paperIdToEdit)
  if (!papers || papers.length == 0) {
    const message = "No papers available to schedule."
    throw new Error(message)
  }
  const paperOptions = document.querySelector("#paperOptions")
  paperOptions.innerHTML = ""
  const option = document.createElement("option")
  option.value = ""
  paperOptions.appendChild(option)
  papers.forEach(({ id, title, presenter }) => {
    const option = document.createElement("option")
    option.value = id
    option.text = title
    option.dataset.presenter = presenter
    paperOptions.appendChild(option)
  })
}

async function getSchedule() {
  const res = await fetch("/api/schedule")
  return await res.json()
}

async function getConfDates() {
  const res = await fetch("/api/confdates")
  return await res.json()
}

async function getLocations() {
  const response = await fetch("api/locations")
  return await response.json()
}

async function loadLocationOptions() {
  // Fill the locations dropdown
  const locations = await getLocations()
  const locationOptions = document.querySelector("#locationOptions")
  const option = document.createElement("option")
  option.value = ""
  locationOptions.appendChild(option)
  locations.forEach((loc) => {
    const option = document.createElement("option")
    option.value = loc
    option.text = loc
    locationOptions.appendChild(option)
  })
}

async function loadDateOptions() {
  //Populate conf dates dropdown
  const confDates = await getConfDates()
  const confDateOptions = document.querySelector("#dateOptions")
  const option = document.createElement("option")
  option.value = ""
  confDateOptions.appendChild(option)
  confDates.forEach((date) => {
    const option = document.createElement("option")
    option.value = date
    option.text = date
    confDateOptions.appendChild(option)
  })
}
