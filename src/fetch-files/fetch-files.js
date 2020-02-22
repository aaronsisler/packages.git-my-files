import revertStaging from "../utils/revert-staging";
import findFiles from "../find-files";
import formatOutput from "../format-output";

const fetchFiles = folderPath => {
  try {
    revertStaging();
    let files = findFiles(folderPath);
    files = formatOutput(files);

    return files;
  } catch (error) {
    console.log(error.message); // eslint-disable-line no-console
    return [];
  }
};

export default fetchFiles;
