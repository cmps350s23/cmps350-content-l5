import { getConfDates } from "./conf-dates-repo.js";

export async function GET(request) {
  return Response.json(await getConfDates());
}
