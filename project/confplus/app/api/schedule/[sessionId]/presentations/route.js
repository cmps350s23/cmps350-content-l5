import { schedRepo } from "../../../repos/SchedRepo";

export async function GET(request, { params }) {
  //get all presentations in session
  const { sessionId } = params;
  const press = await schedRepo.getPresentations(sessionId);
  return Response.json(press);
}

export async function POST(request, { params }) {
  //add new presentation to session
  const { sessionId } = params;
  const newPressentation = await request.json();
  const press = await schedRepo.addPresentation(sessionId, newPressentation);
  return Response.json(press);
}

export async function PUT(request, { params }) {
  //update presentation in session
  const { sessionId } = params;
  const updatedPresentation = await request.json();
  const press = await schedRepo.updatePresentation(
    sessionId,
    updatedPresentation
  );
  return Response.json(press);
}
