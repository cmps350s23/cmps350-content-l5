import path from "path";
import { promises as fs } from "fs";

export async function readJSON(filePath) {
  const dataPath = path.join(process.cwd(), filePath);
  const fileContent = await fs.readFile(dataPath, "utf8");
  return JSON.parse(fileContent);
}
