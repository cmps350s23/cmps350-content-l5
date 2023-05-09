import fs from "fs/promises";
import FileList from "./FileList";

export default function Home() {
  const getFiles = async (path) => {
    "use server";
    return fs.readdir(path);
  };

  return (
    <main>
      <FileList onGetFilesHandler={getFiles} />
    </main>
  );
}
