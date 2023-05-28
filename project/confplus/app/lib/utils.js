import path from "path"
import { promises as fs } from "fs"

export async function readJSON(filePath) {
  const dataPath = path.join(process.cwd(), filePath)
  const fileContent = await fs.readFile(dataPath, "utf8")
  return JSON.parse(fileContent)
}

export async function writeJSON(filePath, data) {
  const dataPath = path.join(process.cwd(), filePath)
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
}
