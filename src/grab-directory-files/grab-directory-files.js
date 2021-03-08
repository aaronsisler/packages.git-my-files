import fs from "fs";
import isDirectory from "../utils/is-directory";

const grabDirectoryFiles = folderPath => {
  let looseFiles = [];
  let files;
  try {
    const trimFolderPath = folderPath.replace(/\/$/, "");
    files = fs.readdirSync(trimFolderPath);
    files.forEach(file => {
      const filePath = `${trimFolderPath}/${file}`;
      if (isDirectory(filePath)) {
        looseFiles = looseFiles.concat(grabDirectoryFiles(filePath));
      } else {
        looseFiles.push({
          filename: `${trimFolderPath}/${file}`,
          status: "A"
        });
      }
    });
  } catch (error) {
    return looseFiles;
  }

  return looseFiles;
};

export default grabDirectoryFiles;
