const fetchGitFiles = require("./fetch-git-files");

const baseMethod = (folderPath = "") => fetchGitFiles(folderPath);

module.exports = baseMethod;
