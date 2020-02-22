const revertStaging = require("../revert-staging");
const findFiles = require("../find-files");
const formatOutput = require("../format-output");

const fetchFiles = folderPath =>
  new Promise((resolve, reject) => {
    try {
      revertStaging();

      let files = findFiles(folderPath);
      files = formatOutput(files);
      resolve(files);
    } catch (err) {
      reject(err);
    }
  });

module.exports = fetchFiles;
