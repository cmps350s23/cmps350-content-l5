import { getPaperById } from "@/app/api/papers/papers-repo"

import { readJSON, writeJSON } from "@/app/lib/utils"

const filePath = "data/schedule.json"

export async function getSchedule(date) {
  let schedule = await readJSON(filePath)

  if (date) {
    schedule = schedule.filter((s) => s.date == date)
  }

  // Get the paper for each presentation in the schedule
  const scheduleWithPaperDetails = []
  for await (const session of schedule) {
    //for (let i = 0; i < schedule.size; i++) {
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

class SchedRepo {
  constructor() {
    this.filePath = "data/schedule.json"
  }

  async getSchedule() {
    const sched = await readJSON(this.filePath)
    return sched
  }

  async getSession(id) {
    const sched = await this.getSchedule()
    return sched.find((a) => a.id == id)
  }

  async getSessByDate(date) {
    const sched = await this.getSchedule()
    date = date.replaceAll("+", " ")
    return sched.filter((a) => a.date == date)
  }

  async getPresentations(sessID) {
    const sess = await this.getSession(sessID)
    return sess.presentations
  }

  async getPresentation(sessID, presId) {
    const press = await this.getPresentations(sessID)
    return press.find((a) => a.id == presId)
  }

  async addSession(session) {
    const sched = await this.getSchedule()
    session.id =
      sched.length > 0 ? Math.max(...sched.map((sess) => sess.id)) + 1 : 1
    sched.push(session)
    await writeJSON(this.filePath, sched)
    return session
  }

  async addPresentation(sessID, presentation) {
    const sess = await this.getSession(sessID)
    presentation.id =
      sess.presentations.length > 0
        ? Math.max(...sess.presentations.map((press) => press.id)) + 1
        : 1
    sess.presentations.push(presentation)
    this.updateSession(sess)
    //await papersRepo.togglePresented(presentation.paperId)
    return presentation
  }

  async updateSession(updatedSession) {
    const id = updatedSession.id
    let sched = await this.getSchedule()
    let index = sched.findIndex((sess) => sess.id == id)
    if (index == -1)
      return {
        error: `Unable to update as there is No Session with id : ${id}`,
      }
    sched[index] = updatedSession
    await writeJSON(this.filePath, sched)
    return {
      message: `Session with id : ${id} is updated`,
      changed: sched[index],
    }
  }

  async updatePresentation(sessID, updatedPresentation) {
    const id = updatedPresentation.id
    let sess = await this.getSession(sessID)
    let index = sess.presentations.findIndex((press) => press.id == id)
    if (index == -1)
      return {
        error: `Unable to update as there is No Presentation with id : ${id}`,
      }
    sess.presentations[index] = updatedPresentation
    this.updateSession(sess)
    return {
      message: `Presentation with id : ${id} is updated`,
      changed: sess.presentations[index],
    }
  }

  async deleteSession(id) {
    let sched = await this.getSchedule()
    sched = sched.filter((sess) => sess.id != id)
    await writeJSON(this.filePath, sched)
    /*     for (let press of await this.getPresentations(id)) {
      await papersRepo.togglePresented(press.paperId)
    } */
    return { message: `Session with id : ${id} deleted` }
  }

  async deletePresentation(sessID, presId) {
    let sess = await this.getSession(sessID)
    const press = await this.getPresentation(sessID, presId)
    sess.presentations = sess.presentations.filter(
      (press) => press.id != presId
    )
    this.updateSession(sess)
    //await papersRepo.togglePresented(press.paperId)
    return { message: `Presentation with id : ${presId} deleted` }
  }

  async deleteSchedule() {
    await writeJSON(this.filePath, [])
    return { message: `All Sessions deleted` }
  }
}

export const schedRepo = new SchedRepo()
