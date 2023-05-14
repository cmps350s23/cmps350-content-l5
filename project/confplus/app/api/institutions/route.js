import fs from "fs-extra";
import path from "path";

export async function GET(request) {
  const pathh = path.join(process.cwd(), "/data/institutions.json");
  const institutions = await fs.readJSON(pathh);
  return Response.json(institutions);
}
