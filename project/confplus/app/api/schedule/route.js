import { getSchedule, upsertSchedule } from "./schedule-repo"

export async function GET(request) {
  try {
    //get all sessions or get sessions by date
    const { searchParams } = new URL(request.url)
    const date = searchParams?.get("date")
    console.log('searchParams.get("date") : ', date)
    const schedule = await getSchedule(date)
    console.log(schedule)
    return Response.json(schedule)
  } catch (e) {
    console.log(e)
    return Response.json({ error: e.error || e.toString() }, { status: 500 })
  }
}

export async function POST(request) {
  //add new session to schedule
  let schedule = await request.json()
  schedule = await upsertSchedule(schedule)
  return Response.json(schedule)
}
