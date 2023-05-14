import { schedRepo } from "../../repos/SchedRepo";

export async function GET(request, { params }) {
  //get session by id
  const { sessionId } = params;
  const sess = await schedRepo.getSession(sessionId);
  return Response.json(sess);
}

export async function DELETE(request, { params }) {
  //delete session with a specific id
  const { sessionId } = params;
  const sess = await schedRepo.deleteSession(sessionId);
  return Response.json(sess);
}

export async function PUT(request) {
  //redudant way to update session
  const updatedSession = await request.json();
  const sess = await schedRepo.updateSession(updatedSession);
  return Response.json(sess);
}
