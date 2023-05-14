import { schedRepo } from "../../../../repos/schedule-repo";

export async function GET(request, { params }) {
  //get presentation by id
  const { sessionId, presId } = params;
  const press = await schedRepo.getPresentation(sessionId, presId);
  return Response.json(press);
}

export async function DELETE(request, { params }) {
  //delete presentation with a specific id
  const { sessionId, presId } = params;
  const press = await schedRepo.deletePresentation(sessionId, presId);
  return Response.json(press);
}

export async function PUT(request, { params }) {
  //redudant way to update presentation
  const { sessionId } = params;
  const updatedPresentation = await request.json();
  const press = await schedRepo.updatePresentation(
    sessionId,
    updatedPresentation
  );
  return Response.json(press);
}
