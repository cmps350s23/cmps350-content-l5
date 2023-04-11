import formidable from "formidable"
import fs from "fs/promises"
import path from 'path'

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false
  }
}

const saveFile = async (file) => {
  //console.dir(file)
  const { filepath, originalFilename } = file
  console.log('File path', filepath) 
  console.log('Original Filename', originalFilename)
  const uploadToFileName = `${Date.now()}_${originalFilename}`
  const uploadToPath = path.join(process.cwd(), 'public', 'docs', uploadToFileName)
  console.log('Save path', uploadToPath) 
  const fileContent = await fs.readFile(filepath)
  await fs.writeFile(uploadToPath, fileContent)
  // Remove the source file after saving it
  await fs.unlink(filepath)
  return `/docs/${uploadToFileName}`
}

export default (req, res) => {
  if (req.method === "POST") {
    const form = formidable({ multiples: false })
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.error("Error", err)
        throw err
      }
      const name = fields.name[0]
      const position = fields.position[0]
      console.log(name, position)
      //Save the first file
      const cvUrl = await saveFile(files.file[0])
      return res.status(201).json({ name, position, cvUrl })
    })
  }
}