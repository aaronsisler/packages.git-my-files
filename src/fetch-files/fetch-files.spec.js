import revertStaging from "../utils/revert-staging";
import findFiles from "../find-files";
import formatOutput from "../format-output";
import fetchFiles from "./fetch-files";

jest.mock("../utils/revert-staging");
jest.mock("../find-files");
jest.mock("../format-output");

describe("fetchFiles()", () => {
  let returnedFiles;

  beforeEach(() => {
    revertStaging.default = jest.fn();
    findFiles.default.mockReturnValue([
      "A mock-folder-path/file1.ext",
      "M mock-folder-path/file2.ext"
    ]);
    formatOutput.default.mockReturnValue([
      { status: "A", filename: "mock-folder-path/file1.ext" },
      { status: "M", filename: "mock-folder-path/file2.ext" }
    ]);
  });

  xit("should have a return type of Promise", () => {
    returnedFiles = fetchFiles("mock-folder-path");

    console.log(returnedFiles);

    expect(typeof returnedFiles).toEqual("promise");
  });
});
