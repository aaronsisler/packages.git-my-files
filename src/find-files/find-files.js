const { spawnSync } = require("child_process");
const throwError = require("../utils/throw-error");

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

module.exports = findFiles;
