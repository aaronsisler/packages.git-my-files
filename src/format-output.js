const grabLooseFiles = require("./grab-loose-files");

const formatOutput = files => {
  let formattedOutput = [];

  files.forEach(element => {
    // Regex takes finds X number of spaces
    const [status, filename] = element
      .split(/(\s+)/)
      .filter(value => value.trim());

    if (status === "??" && filename.slice(-1) !== "/") {
      formattedOutput.push({ filename, status: "A" });
    } else if (status === "??") {
      const looseFiles = grabLooseFiles(filename);

      formattedOutput = formattedOutput.concat(...looseFiles);
    } else {
      formattedOutput.push({ filename, status });
    }
  });

  return formattedOutput;
};

module.exports = formatOutput;
