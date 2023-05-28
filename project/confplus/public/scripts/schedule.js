await fillAffiliationDD()
const schedule = await getSchedule()
//console.dir(schedule);
displaySchedule(schedule)

async function getInstitutions() {
  const res = await fetch("/api/confdates")
  return await res.json()
}

async function getSchedule(date) {
  const queryString = date ? `?date=${date}` : ""
  const res = await fetch(`/api/schedule${queryString}`)
  return await res.json()
}

async function fillAffiliationDD() {
  //Populate date filter dropdown
  const confDatesDD = document.querySelector("#confDatesDD")
  const confDates = await getInstitutions()
  confDates.forEach((d) => {
    const option = document.createElement("option")
    option.value = d
    option.text = d
    confDatesDD.appendChild(option)
  })

  //Add event listener to dropdown
  confDatesDD.addEventListener("change", (e) => onDateChange(e.target.value))
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
                <h3>${session.title}</h3>
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
  if (presentations.length == 0) {
    return '<p class="unavailable">No Presentations found.</p>'
  }
  return presentations
    .map(
      (p) =>
        `<div class="presentation-card card">
            <div class="title-button">
                <h4>${p.title}</h4>
            </div>
            <p><i class="fa fa-clock-o"></i> ${p.startTime} - ${p.endTime}</p>
            <p class="presenter">Presenter: ${p.presenter}</p>
        </div>`
    )
    .join("")
}
