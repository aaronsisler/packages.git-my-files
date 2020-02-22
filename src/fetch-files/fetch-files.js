import revertStaging from "../utils/revert-staging";
import findFiles from "../find-files";
import formatOutput from "../format-output";

const fetchFiles = folderPath =>
  new Promise((resolve, reject) => {
    try {
      console.log(revertStaging);
      revertStaging();

      let files = findFiles(folderPath);
      files = formatOutput(files);
      resolve(files);
    } catch (err) {
      reject(err);
    }
  });

export default fetchFiles;
