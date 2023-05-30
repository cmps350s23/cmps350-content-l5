import { upsertCat } from "@/app/cats/cat-repo"
import { redirect } from "next/navigation"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request) {
  try {
    const formData = await request.formData()
    //console.log("/cats POST - formData:", formData)

    const file = formData.get("fileToUpload")
    const imageUrl = await saveFile(file)

    const { id, name, breed } = Object.fromEntries(formData.entries())
    const cat = { id, name, breed, imageUrl }
    console.log("/cats POST - cat:", cat)
    upsertCat(cat)
    // Redirect to list of cats
    // There's a Next.js bug in the redirect function
    // just refresh the page to see the new cat
    redirect("/cats")
  } catch (error) {
    console.error("Error saving cat:", error)
    throw error
  }
}

async function saveFile(file) {
  try {
    const uploadFileName = `${Date.now()}_${file.name.replaceAll(" ", "_")}`
    const uploadDir = path.join(
      process.cwd(),
      "/public/uploads",
      uploadFileName
    )
    const fileContent = Buffer.from(await file.arrayBuffer())
    await writeFile(uploadDir, fileContent)
    return `/uploads/${uploadFileName}`
  } catch (error) {
    console.error("Error saving file:", error)
  }
}
