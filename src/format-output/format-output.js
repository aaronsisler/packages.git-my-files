import grabLooseFiles from "../grab-loose-files";

const formatOutput = files => {
  let formattedOutput = [];

  try {
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
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return formattedOutput;
  }

  return formattedOutput;
};

export default formatOutput;
