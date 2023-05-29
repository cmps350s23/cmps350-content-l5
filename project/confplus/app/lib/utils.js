import path from "path"
import { promises as fs } from "fs"

export async function readJSON(dataFilePath) {
  const dataPath = path.join(process.cwd(), dataFilePath)
  const fileContent = await fs.readFile(dataPath, "utf8")
  return JSON.parse(fileContent)
}

export async function writeJSON(dataFilePath, data) {
  const dataPath = path.join(process.cwd(), dataFilePath)
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
}
