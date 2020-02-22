const { spawnSync } = require("child_process");
const formatOutput = require("../format-output");
const throwError = require("../throw-error");

const revertStaging = () => {
  const revertStagingCommand = "git restore --staged .";
  const [bin, ...args] = revertStagingCommand.split(" ");

  spawnSync(bin, args);
};

const findFiles = folderPath => {
  const baseCmd = `git status --short --column ${folderPath}`;
  const [bin, ...args] = baseCmd.split(" ");
  const changedFiles = spawnSync(bin, args);

  if (changedFiles.status) {
    return throwError(changedFiles.stderr);
  }

  let files = changedFiles.stdout.toString().split("\n");
  // While splitting there is an empty string at last position.
  files = files.filter(value => value.trim());

  return files;
};

const fetchGitFiles = folderPath =>
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

module.exports = fetchGitFiles;
