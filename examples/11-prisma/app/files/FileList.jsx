"use client";
import { useState } from "react";

export default function NameField({ onGetFilesHandler }) {
  const [files, setFiles] = useState([]);

  const onGetFiles = async (path) => {
    const filesList = await onGetFilesHandler(path);
    setFiles(filesList);
  };

  return (
    <div>
      <button onClick={() => onGetFiles(".")}>Current Directory</button>
      <button onClick={() => onGetFiles("./public")}>Public Directory</button>

      {files.map((file) => (
        <div key={file}>{file}</div>
      ))}
    </div>
  );
}
