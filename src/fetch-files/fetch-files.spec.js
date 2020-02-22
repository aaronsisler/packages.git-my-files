import revertStaging from "../utils/revert-staging";
import findFiles from "../find-files";
import formatOutput from "../format-output";
import fetchFiles from "./fetch-files";

jest.mock("../utils/revert-staging");
jest.mock("../find-files");
jest.mock("../format-output");

describe("fetchFiles()", () => {
  let returnedFiles;
  const mockFindFiles = [
    "A mock-folder-path/file1.ext",
    "M mock-folder-path/file2.ext"
  ];

  const mockFormatOutput = [
    { status: "A", filename: "mock-folder-path/file1.ext" },
    { status: "M", filename: "mock-folder-path/file2.ext" }
  ];

  beforeEach(() => {
    findFiles.mockReturnValue(mockFindFiles);
    formatOutput.mockReturnValue(mockFormatOutput);
  });

  it("should have a return type of Promise", () => {
    returnedFiles = fetchFiles("mock-folder-path");

    expect(typeof returnedFiles).toEqual("object");
    expect(typeof returnedFiles.then).toEqual("function");
  });

  it("should call revert staging", () => {
    returnedFiles = fetchFiles("mock-folder-path");

    expect(revertStaging).toHaveBeenCalled();
  });

  it("should call find files with the correct folder path", () => {
    returnedFiles = fetchFiles("mock-folder-path");

    expect(findFiles).toHaveBeenCalledWith("mock-folder-path");
  });

  it("should call format output with the correct files", () => {
    returnedFiles = fetchFiles("mock-folder-path");

    expect(formatOutput).toHaveBeenCalledWith(mockFindFiles);
  });

  describe("when NO error is thrown", () => {
    it("should resolve the promise correctly", () => {});
  });

  describe("when error is thrown", () => {
    it("should reject the promise correctly", () => {});
  });
});
