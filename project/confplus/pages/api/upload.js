import formidable from "formidable";
import fs from "fs/promises";
import path from "path";

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.error("Error", err);
        throw err;
      }
      const paperURL = await saveFile(files.file[0]);
      return res.status(201).json({ paperURL });
    });
  }
};

const saveFile = async (file) => {
  //console.dir(file)
  const { filepath, originalFilename } = file;
  console.log("File path", filepath);
  console.log("Original Filename", originalFilename);
  const uploadToFileName = `${Date.now()}_${originalFilename.replaceAll(
    " ",
    "_"
  )}`;
  const uploadToPath = path.join(
    process.cwd(),
    "resources",
    "pdfs",
    uploadToFileName
  );
  console.log("Save path", uploadToPath);
  const fileContent = await fs.readFile(filepath);
  await fs.writeFile(uploadToPath, fileContent);
  // Remove the source file after saving it
  await fs.unlink(filepath);
  return `/papers/${uploadToFileName}`;
};
