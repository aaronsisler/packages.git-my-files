const { spawnSync } = require("child_process");
const formatOutput = require("../format-output");

const revertStaging = () => {
  const revertStagingCommand = "git restore --staged .";
  const [bin, ...args] = revertStagingCommand.split(" ");

  spawnSync(bin, args);
};

const findError = error => {
  const errorMessage = error.toString();

  if (errorMessage.includes("Not a git repository")) {
    return "Not a git repository";
  }

  return errorMessage;
};

const findFiles = folderPath => {
  const baseCmd = `git status --short --column ${folderPath}`;
  const [bin, ...args] = baseCmd.split(" ");
  const changedFiles = spawnSync(bin, args);
  let error = "";

  if (changedFiles.status) {
    error = findError(changedFiles.stderr);
    return process.emit("onError", error);
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
