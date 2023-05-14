import { getSchedule, schedRepo } from "../repos/schedule-repo";

export async function GET(request) {
  try {
    //get all sessions or get sessions by date
    const { searchParams } = new URL(request.url);
    const date = searchParams?.get("date");
    console.log('searchParams.get("date")', date);
    const schedule = await getSchedule(date);
    //console.log(schedule);
    return Response.json(schedule);
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "There was an internal error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  //add new session to schedule
  const newSession = await request.json();
  const sess = await schedRepo.addSession(newSession);
  return Response.json(sess);
}

export async function PUT(request) {
  //update session in schedule
  const updatedSession = await request.json();
  const sess = await schedRepo.updateSession(updatedSession);
  return Response.json(sess);
}

export async function DELETE(request) {
  //delete entire schedule
  return Response.json(schedRepo.deleteSchedule());
}
