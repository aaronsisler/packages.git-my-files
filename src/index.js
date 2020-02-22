import fetchFiles from "./fetch-files";

const rootMethod = (folderPath = "") => fetchFiles(folderPath);

module.exports = rootMethod;
