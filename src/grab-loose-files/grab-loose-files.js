const fs = require("fs");

const grabLooseFiles = folderPath => {
  const looseFiles = [];
  let files;
  try {
    const trimFolderPath = folderPath.replace(/\/$/, "");
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
