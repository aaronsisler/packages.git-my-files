const fs = require("fs");

const grabLooseFiles = folderPath => {
  const looseFiles = [];
  let files;
  const trimFolderPath = folderPath.replace(/\/$/, "");
  try {
    files = fs.readdirSync(trimFolderPath);
    files.forEach(file => {
      looseFiles.push({
        filename: `${trimFolderPath}/${file}`,
        status: "A"
      });
    });
  } catch (error) {
    return looseFiles;
  }

  return looseFiles;
};

module.exports = grabLooseFiles;
