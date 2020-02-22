import fetchFiles from "./fetch-files";

const rootMethod = (folderPath = "") => fetchFiles(folderPath);

export default rootMethod;
