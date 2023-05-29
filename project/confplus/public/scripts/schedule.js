document.addEventListener("DOMContentLoaded", async () => {
  await loadDateOptions()
  const schedule = await getSchedule()
  //console.dir(schedule);
  displaySchedule(schedule)
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

async function getConfDates() {
  const res = await fetch("/api/confdates")
  return await res.json()
}

async function getSchedule(date) {
  const queryString = date ? `?date=${date}` : ""
  const res = await fetch(`/api/schedule${queryString}`)
  return await res.json()
}

async function loadDateOptions() {
  //Populate conf dates dropdown
  const confDateOptions = document.querySelector("#confDateOptions")
  const confDates = await getConfDates()
  confDates.forEach((date) => {
    const option = document.createElement("option")
    option.value = date
    option.text = date
    confDateOptions.appendChild(option)
  })
}

async function onDateChange(date) {
  const schedule = await getSchedule(date)
  console.dir(schedule)
  displaySchedule(schedule)
}

function displaySchedule(schedule) {
  const sessionsDiv = document.querySelector("#sessionsList")
  if (schedule.length == 0) {
    sessionsDiv.innerHTML = '<p class="unavailable">No Sessions found.</p>'
    return
  }
  sessionsDiv.innerHTML = scheduleToHTML(schedule)
}

function scheduleToHTML(schedule) {
  return schedule
    .map(
      (session) => `<div class="session-card">
            <div class="session-header">
                <h3>Session ${session.id}:  ${session.title}</h3>
                <div class="date-location">
                    <p><i class="fa fa-calendar"></i> ${session.date} </p>
                    <p><i class="fa fa-map-marker"></i> ${session.location}</p>
                </div>
            </div>
            <div> 
                ${presentationToHTML(session.presentations)}
            </div>
        </div>`
    )
    .join("<hr>")
}
function presentationToHTML(presentations) {
  if (!presentations || presentations.length == 0) {
    return '<p class="unavailable">No Presentations found.</p>'
  }
  return presentations
    .map(
      (p) =>
        `<div class="presentation-card card">
            <div class="title-button">
                <h4>${p.title}</h4>
            </div>
            <p>
              Presenter: ${p.presenter}
              <i class="fa fa-clock-o"></i> 
              ${p.startTime} - ${p.endTime}
            </p>
        </div>`
    )
    .join("")
}
