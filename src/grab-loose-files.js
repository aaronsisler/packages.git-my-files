const fs = require("fs");

const grabLooseFiles = folderPath => {
  const looseFiles = [];
  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
    looseFiles.push({
      filename: `${folderPath}${file}`,
      status: "A"
    });
  });

  return looseFiles;
};

module.exports = grabLooseFiles;
