import { getPaperById } from "@/app/api/papers/papers-repo"

import { readJSON, writeJSON } from "@/app/lib/utils"
const dataFilePath = "data/schedule.json"

export async function getSchedule(date) {
  let schedule = await readJSON(dataFilePath)

  if (date) {
    schedule = schedule.filter((s) => s.date == date)
  }

  // Get the paper for each presentation in the schedule
  const scheduleWithPaperDetails = []
  for await (const session of schedule) {
    if (!session.presentations) {
      scheduleWithPaperDetails.push(session)
      continue
    }

    const presentations = []
    for await (const presentation of session.presentations) {
      const paper = await getPaperById(presentation.paperId)
      //const { title, authors } = await getPaperById(presentation.paperId);
      presentation.title = paper.title
      const presenter = paper.authors.find((a) => a.isPresenter)
      presentation.presenter = `${presenter.firstName}  ${presenter.lastName}`
      presentation.authors = paper.authors
      presentations.push(presentation)
    }
    session.presentations = presentations
    scheduleWithPaperDetails.push(session)
  }
  return scheduleWithPaperDetails
}

export async function upsertSchedule(schedule) {
  // Remove paper details (e.g., title, presenter)
  // from the schedule before saving to avoid data duplication
  schedule = schedule.map((s) => {
    if (!s.presentations) return s
    s.presentations = s.presentations.map((p) => {
      return {
        id: p.id,
        paperId: p.paperId,
        startTime: p.startTime,
        endTime: p.endTime,
      }
    })
    return s
  })

  //console.log("upsertSchedule - schedule: ", schedule)
  await writeJSON(dataFilePath, schedule)
  return schedule
}
