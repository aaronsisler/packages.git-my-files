const fetchFiles = require("./fetch-files");

const rootMethod = (folderPath = "") => fetchFiles(folderPath);

module.exports = rootMethod;
